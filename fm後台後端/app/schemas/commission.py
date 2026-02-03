from pydantic import BaseModel
from typing import Optional

class CommissionPlanCreate(BaseModel):
    system_type: str
    name: str
    agent_level: Optional[str] = None
    agent_name: Optional[str] = None
    share_ratio: int
    settlement: str
    rebate_live: float
    rebate_elec: float
    rebate_sport: float
    rebate_lottery: float
    rebate_chess: float
    rebate_fish: float

class CommissionPlanUpdate(BaseModel):
    system_type: Optional[str] = None
    name: Optional[str] = None
    agent_level: Optional[str] = None
    agent_name: Optional[str] = None
    share_ratio: Optional[int] = None
    settlement: Optional[str] = None
    rebate_live: Optional[float] = None
    rebate_elec: Optional[float] = None
    rebate_sport: Optional[float] = None
    rebate_lottery: Optional[float] = None
    rebate_chess: Optional[float] = None
    rebate_fish: Optional[float] = None
