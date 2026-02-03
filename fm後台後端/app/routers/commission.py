import json
from typing import Optional
from decimal import Decimal, InvalidOperation, ROUND_HALF_UP

from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session

from app.db.database import SessionLocal
from app.models.commission import CommissionPlan
from app.models.commission_log import CommissionPlanLog
from app.schemas.commission import CommissionPlanCreate

from app.deps.auth import get_current_user
from app.models.user import User


router = APIRouter(
    prefix="/commission-plans",
    tags=["Commission Plans"],
)

DECIMAL_FIELDS = {
    "rebate_live",
    "rebate_elec",
    "rebate_sport",
    "rebate_lottery",
    "rebate_chess",
    "rebate_fish",
}


# ----------------------------
# DB Dependency
# ----------------------------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ----------------------------
# Helpers
# ----------------------------
def safe_str(v):
    """給 delete snapshot 用，避免 Decimal/None"""
    if v is None:
        return ""
    return str(v)


def norm_decimal(v) -> str:
    """
    把 0, 0.0, 0.00, Decimal('0.00') 全部統一成 2 位小數字串
    """
    if v is None or v == "":
        d = Decimal("0")
    else:
        try:
            d = Decimal(str(v))
        except (InvalidOperation, ValueError):
            return str(v)

    d = d.quantize(Decimal("0.00"), rounding=ROUND_HALF_UP)
    return format(d, "f")  # e.g. '0.00'


def norm_value(field: str, v):
    if field in DECIMAL_FIELDS:
        return norm_decimal(v)
    return str(v) if v is not None else ""


def build_diff(before: CommissionPlan, payload_dict: dict):
    """
    比較更新前後差異，回傳 { field: {old:..., new:...}, ... }
    並且針對 Decimal 欄位用 2 位小數正規化，避免 0.00 vs 0.0
    """
    changes = {}
    for k, new_v in payload_dict.items():
        old_v = getattr(before, k, None)
        old_n = norm_value(k, old_v)
        new_n = norm_value(k, new_v)

        if old_n != new_n:
            changes[k] = {"old": old_n, "new": new_n}
    return changes


def write_log(db: Session, plan_id: int, action: str, handler: str, details_obj: dict):
    """
    details 存 JSON 字串，前端再 parse 成可讀文字
    """
    log = CommissionPlanLog(
        plan_id=plan_id,
        action=action,          # create/update/delete
        handler=handler,
        details=json.dumps(details_obj, ensure_ascii=False),
    )
    db.add(log)
    db.commit()


# ----------------------------
# APIs
# ----------------------------
@router.get("")
def get_commission_plans(
    system: Optional[str] = Query(None),
    settlement: Optional[str] = Query(None),
    ratio: Optional[int] = Query(None),
    db: Session = Depends(get_db),
):
    query = db.query(CommissionPlan)
    if system:
        query = query.filter(CommissionPlan.system_type == system)
    if settlement:
        query = query.filter(CommissionPlan.settlement == settlement)
    if ratio is not None:
        query = query.filter(CommissionPlan.share_ratio == ratio)

    return {"data": query.all()}


@router.get("/{plan_id}/logs")
def get_commission_plan_logs(plan_id: int, db: Session = Depends(get_db)):
    logs = (
        db.query(CommissionPlanLog)
        .filter(CommissionPlanLog.plan_id == plan_id)
        .order_by(CommissionPlanLog.id.desc())
        .all()
    )

    return {
        "data": [
            {
                "id": x.id,
                "plan_id": x.plan_id,
                "action": x.action,
                "handler": x.handler,
                "details": x.details,
                "created_at": x.created_at.isoformat() if x.created_at else "",
            }
            for x in logs
        ]
    }


@router.post("")
def create_commission_plan(
    payload: CommissionPlanCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    plan = CommissionPlan(**payload.dict())
    db.add(plan)
    db.commit()
    db.refresh(plan)

    write_log(
        db=db,
        plan_id=plan.id,
        action="create",
        handler=current_user.username,
        details_obj={"created": payload.dict()},
    )

    return plan


@router.put("/{plan_id}")
def update_commission_plan(
    plan_id: int,
    payload: CommissionPlanCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    plan = db.query(CommissionPlan).filter(CommissionPlan.id == plan_id).first()
    if not plan:
        raise HTTPException(status_code=404, detail="Commission plan not found")

    payload_dict = payload.dict()

    # ✅ 先算 diff（正規化後）
    diff = build_diff(plan, payload_dict)

    # ✅ 只更新「真的有差異」的欄位，避免雜訊/避免覆蓋同值不同格式
    for key in diff.keys():
        setattr(plan, key, payload_dict[key])

    db.commit()
    db.refresh(plan)

    # ✅ 有變更才寫 log
    if diff:
        write_log(
            db=db,
            plan_id=plan.id,
            action="update",
            handler=current_user.username,
            details_obj={"changes": diff},
        )

    return plan


@router.delete("/{plan_id}")
def delete_commission_plan(
    plan_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    plan = db.query(CommissionPlan).filter(CommissionPlan.id == plan_id).first()
    if not plan:
        raise HTTPException(status_code=404, detail="Commission plan not found")

    snapshot = {
        "system_type": plan.system_type,
        "name": plan.name,
        "agent_level": plan.agent_level,
        "agent_name": plan.agent_name,
        "share_ratio": plan.share_ratio,
        "rebate_live": safe_str(plan.rebate_live),
        "rebate_elec": safe_str(plan.rebate_elec),
        "rebate_sport": safe_str(plan.rebate_sport),
        "rebate_lottery": safe_str(plan.rebate_lottery),
        "rebate_chess": safe_str(plan.rebate_chess),
        "rebate_fish": safe_str(plan.rebate_fish),
        "settlement": plan.settlement,
    }

    db.delete(plan)
    db.commit()

    write_log(
        db=db,
        plan_id=plan_id,
        action="delete",
        handler=current_user.username,
        details_obj={"deleted": snapshot},
    )

    return {"ok": True}
