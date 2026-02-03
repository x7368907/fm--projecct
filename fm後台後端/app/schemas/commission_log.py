from pydantic import BaseModel

class CommissionPlanLogOut(BaseModel):
    id: int
    plan_id: int
    action: str
    handler: str
    details: str
    created_at: str  # 或 datetime

    class Config:
        from_attributes = True
