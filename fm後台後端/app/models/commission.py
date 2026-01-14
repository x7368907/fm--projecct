from sqlalchemy import Column, Integer, String, DECIMAL
from app.db.database import Base

class CommissionPlan(Base):
    __tablename__ = "commission_plan"

    id = Column(Integer, primary_key=True, index=True)
    system_type = Column(String(20), nullable=False)
    name = Column(String(50), nullable=False)
    agent_level = Column(String(50))
    agent_name = Column(String(50))
    share_ratio = Column(Integer, nullable=False)
    rebate_live = Column(DECIMAL(5, 2), nullable=False)
    rebate_elec = Column(DECIMAL(5, 2), nullable=False)
    rebate_sport = Column(DECIMAL(5, 2), nullable=False)
    rebate_lottery = Column(DECIMAL(5, 2), nullable=False)
    rebate_chess = Column(DECIMAL(5, 2), nullable=False)
    rebate_fish = Column(DECIMAL(5, 2), nullable=False)
    settlement = Column(String(20), nullable=False)
