from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.db.database import get_db
from app.models.agent import Agent
from app.models.commission import CommissionPlan
from app.models.user import User

router = APIRouter(
    prefix="/agents",
    tags=["Agents"],
)

MAX_LEVEL = 7  # 系統最大代理層級

@router.get("")
def get_agents(
    level: int = Query(...),
    db: Session = Depends(get_db),
):
    """
    代理列表（對齊前端 DataType）
    """

    # ===== 子代理數量 subquery =====
    child_count_sq = (
        db.query(
            Agent.parent_id.label("pid"),
            func.count(Agent.id).label("child_count"),
        )
        .group_by(Agent.parent_id)
        .subquery()
    )

    # ===== 會員數量 subquery =====
    member_count_sq = (
        db.query(
            User.agent_id.label("aid"),
            func.count(User.id).label("member_count"),
        )
        .group_by(User.agent_id)
        .subquery()
    )

    # ===== 主查詢 =====
    rows = (
        db.query(
            Agent,
            CommissionPlan,
            func.coalesce(child_count_sq.c.child_count, 0),
            func.coalesce(member_count_sq.c.member_count, 0),
        )
        .outerjoin(CommissionPlan, Agent.commission_plan_id == CommissionPlan.id)
        .outerjoin(child_count_sq, child_count_sq.c.pid == Agent.id)
        .outerjoin(member_count_sq, member_count_sq.c.aid == Agent.id)
        .filter(Agent.level == level)
        .all()
    )

    result = []

    for agent, plan, child_count, member_count in rows:
        result.append({
            "key": str(agent.id),
            "id": agent.id,

            # ===== 層級 =====
            "currentLevel": agent.level,
            "maxLevel": MAX_LEVEL,
            "childCount": child_count,
            "parentKey": str(agent.parent_id) if agent.parent_id else None,

            # ===== 基本資料 =====
            "name": agent.username,
            "account": agent.account,
            "realName": agent.name,
            "memberCount": member_count,

            "status": "啟用" if agent.status == "enabled" else "停用",
            "cashGroup": agent.payment_group,

            # ===== 時間 =====
            "registerTime": agent.created_at.strftime("%Y-%m-%d %H:%M:%S"),
            "lastLoginTime": agent.last_login_at.strftime("%Y-%m-%d %H:%M:%S")
            if agent.last_login_at else "",

            # ===== 分潤（來自 commission_plan） =====
            "profitSystem": "佔成制" if plan and plan.system_type == "share" else "反水制",
            "profitRate": plan.share_ratio if plan else 0,

            "liveRate": plan.rebate_live if plan else 0,
            "slotRate": plan.rebate_elec if plan else 0,
            "sportRate": plan.rebate_sport if plan else 0,
            "lotteryRate": plan.rebate_lottery if plan else 0,
            "chessRate": plan.rebate_chess if plan else 0,
            "fishRate": plan.rebate_fish if plan else 0,

            # ===== 結算 =====
            "settlement": plan.settlement if plan else "",
        })

    return {
        "data": result
    }
