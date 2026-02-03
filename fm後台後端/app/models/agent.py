from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.db.database import Base

class Agent(Base):
    __tablename__ = "agents"

    id = Column(Integer, primary_key=True, index=True)
    parent_id = Column(Integer, ForeignKey("agents.id"), nullable=True)

    level = Column(Integer, nullable=False)
    username = Column(String(50), nullable=False)
    account = Column(String(50))
    name = Column(String(50))

    status = Column(String(20))
    payment_group = Column(String(50))

    commission_plan_id = Column(Integer, ForeignKey("commission_plan.id"))

    created_at = Column(DateTime)
    last_login_at = Column(DateTime)

    commission_plan = relationship("CommissionPlan", lazy="joined")
