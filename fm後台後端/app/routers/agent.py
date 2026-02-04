from typing import Optional
from datetime import datetime
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

MAX_LEVEL = 7 

@router.get("")
def get_agents(
    # --- 核心參數 ---
    level: int = Query(..., description="代理層級"),
    
    # --- 搜尋欄位 (對應前端 name) ---
    name: Optional[str] = Query(None, description="代理名稱"),
    account: Optional[str] = Query(None, description="代理帳號"),
    realName: Optional[str] = Query(None, description="代理姓名"),
    status: Optional[str] = Query(None, description="帳號狀態 (啟用/停用)"),
    cashGroup: Optional[str] = Query(None, description="金流群組"),
    profitSystem: Optional[str] = Query(None, description="分潤制度 (佔成制/反水制)"),
    
    # --- 日期區間 ---
    regStart: Optional[str] = Query(None, description="註冊起始 YYYY-MM-DD"),
    regEnd: Optional[str] = Query(None, description="註冊結束 YYYY-MM-DD"),
    loginStart: Optional[str] = Query(None, description="登入起始 YYYY-MM-DD"),
    loginEnd: Optional[str] = Query(None, description="登入結束 YYYY-MM-DD"),
    
    db: Session = Depends(get_db),
):
    """
    代理列表：支援多重條件過濾與子項統計
    """

    # 1. 子代理數量統計 Subquery
    child_count_sq = (
        db.query(
            Agent.parent_id.label("pid"),
            func.count(Agent.id).label("child_count"),
        )
        .group_by(Agent.parent_id)
        .subquery()
    )

    # 2. 會員數量統計 Subquery
    member_count_sq = (
        db.query(
            User.agent_id.label("aid"),
            func.count(User.id).label("member_count"),
        )
        .group_by(User.agent_id)
        .subquery()
    )

    # 3. 主查詢與 Join
    query = (
        db.query(
            Agent,
            CommissionPlan,
            func.coalesce(child_count_sq.c.child_count, 0).label("child_count"),
            func.coalesce(member_count_sq.c.member_count, 0).label("member_count"),
        )
        .outerjoin(CommissionPlan, Agent.commission_plan_id == CommissionPlan.id)
        .outerjoin(child_count_sq, child_count_sq.c.pid == Agent.id)
        .outerjoin(member_count_sq, member_count_sq.c.aid == Agent.id)
        .filter(Agent.level == level)
    )

    # 4. 動態過濾邏輯
    if name:
        query = query.filter(Agent.username.ilike(f"%{name}%"))
    if account:
        query = query.filter(Agent.account.ilike(f"%{account}%"))
    if realName:
        query = query.filter(Agent.name.ilike(f"%{realName}%"))
    if status:
        # 前端傳 "啟用"/"停用"，轉換為資料庫存儲的 "enabled"/"disabled"
        db_status = "enabled" if status == "啟用" else "disabled"
        query = query.filter(Agent.status == db_status)
    if cashGroup:
        query = query.filter(Agent.payment_group == cashGroup)
    if profitSystem:
        # 對應 CommissionPlan 的制度
        db_sys = "share" if profitSystem == "佔成制" else "rebate"
        query = query.filter(CommissionPlan.system_type == db_sys)

    # 5. 時間區間過濾 (處理 YYYY-MM-DD 轉 datetime)
    if regStart and regEnd:
        s = datetime.strptime(regStart, "%Y-%m-%d")
        e = datetime.strptime(f"{regEnd} 23:59:59", "%Y-%m-%d %H:%M:%S")
        query = query.filter(Agent.created_at.between(s, e))
        
    if loginStart and loginEnd:
        ls = datetime.strptime(loginStart, "%Y-%m-%d")
        le = datetime.strptime(f"{loginEnd} 23:59:59", "%Y-%m-%d %H:%M:%S")
        query = query.filter(Agent.last_login_at.between(ls, le))

    # 6. 執行並轉換格式
    rows = query.all()
    result = []

    for agent, plan, child_count, member_count in rows:
        result.append({
            "key": str(agent.id),
            "id": agent.id,
            "currentLevel": agent.level,
            "maxLevel": MAX_LEVEL,
            "childCount": child_count,
            "parentKey": str(agent.parent_id) if agent.parent_id else None,
            "name": agent.username,
            "account": agent.account,
            "realName": agent.name,
            "memberCount": member_count,
            "status": "啟用" if agent.status == "enabled" else "停用",
            "cashGroup": agent.payment_group,
            "registerTime": agent.created_at.strftime("%Y-%m-%d %H:%M:%S") if agent.created_at else "",
            "lastLoginTime": agent.last_login_at.strftime("%Y-%m-%d %H:%M:%S") if agent.last_login_at else "",
            "profitSystem": "佔成制" if plan and plan.system_type == "share" else "反水制",
            "profitRate": plan.share_ratio if plan else 0,
            "liveRate": plan.rebate_live if plan else 0,
            "slotRate": plan.rebate_elec if plan else 0,
            "sportRate": plan.rebate_sport if plan else 0,
            "lotteryRate": plan.rebate_lottery if plan else 0,
            "chessRate": plan.rebate_chess if plan else 0,
            "fishRate": plan.rebate_fish if plan else 0,
            "settlement": plan.settlement if plan else "",
        })

    return {"data": result}