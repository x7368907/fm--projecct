from fastapi import FastAPI
from fastapi import APIRouter,Depends 
from fastapi import Query
from typing import Optional


from sqlalchemy.orm import Session
from app.db.database import SessionLocal
from app.models.commission import CommissionPlan
from app.schemas.commission import CommissionPlanCreate

router = APIRouter(
    prefix="/commission-plans",
    tags=["Commission Plans"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("")
# 查詢列表
def get_commission_plans(system: Optional[str] = Query(None), settlement: Optional[str] = Query(None), ratio: Optional[int] = Query(None), db: Session = Depends(get_db)):
    query = db.query(CommissionPlan)
    if system:
        query = query.filter(CommissionPlan.system_type == system)
    if settlement:
        query = query.filter(CommissionPlan.settlement == settlement)
    if ratio:
        query = query.filter(CommissionPlan.share_ratio == ratio)
    return {"data": query.all()}

@router.post("")
# 新增方案
def create_commission_plan(payload:CommissionPlanCreate, db: Session = Depends(get_db)):
    plan = CommissionPlan(**payload.dict())
    db.add(plan)
    db.commit()
    db.refresh(plan)
    return plan

@router.put("/{plan_id}")
# 編輯方案
def update_commission_plan(plan_id: int, payload:CommissionPlanCreate, db: Session = Depends(get_db)):
    plan = db.query(CommissionPlan).filter(CommissionPlan.id == plan_id).first()
    if not plan:
        return {"error": "Commission plan not found"}
    for key, value in payload.dict().items():
        setattr(plan, key, value)
    db.commit()
    db.refresh(plan)
    return plan    