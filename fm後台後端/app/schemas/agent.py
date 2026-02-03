from pydantic import BaseModel
from typing import Optional

class AgentListItem(BaseModel):
    id: int
    level: int
    level_label: str
    username: str
    member_count: int
    account: Optional[str]
    name: Optional[str]
    status: str
    status_label: str
    payment_group: Optional[str]
    created_at: str
    last_login_at: Optional[str]

    class Config:
        from_attributes = True
