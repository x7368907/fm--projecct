from pydantic import BaseModel

class CommissionPlanCreate(BaseModel):
    system_type: str
    name: str

    agent_level: str | None = None
    agent_name: str | None = None

    share_ratio: int
    settlement: str

    rebate_live: float
    rebate_elec: float
    rebate_sport: float
    rebate_lottery: float
    rebate_chess: float
    rebate_fish: float
