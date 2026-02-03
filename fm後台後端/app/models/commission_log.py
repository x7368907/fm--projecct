from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.sql import func
from app.db.database import Base

class CommissionPlanLog(Base):
    __tablename__ = "commission_plan_log"

    id = Column(Integer, primary_key=True, index=True)
    plan_id = Column(Integer, ForeignKey("commission_plan.id"), nullable=False, index=True)

    # create / update / delete
    action = Column(String(20), nullable=False)

    # 經手人：可先用 "system"，之後接登入再改成 username
    handler = Column(String(50), nullable=False, default="system")

    # 存異動內容（建議 JSON string）
    details = Column(Text, nullable=False)

    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
