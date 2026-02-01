import os
import argparse
from decimal import Decimal

from sqlalchemy import create_engine, text

def get_db_url() -> str:
    url = os.getenv("DATABASE_URL")
    if not url:
        raise RuntimeError("❌ DATABASE_URL is not set. Put it in .env or export it.")
    return url

SEED_COMMISSION_PLANS = [
    {
        "system_type": "share",
        "name": "合營計劃1",
        "agent_level": "lvl1",
        "agent_name": "總代理A",
        "share_ratio": 30,
        "rebate_live": Decimal("0.50"),
        "rebate_elec": Decimal("0.40"),
        "rebate_sport": Decimal("0.30"),
        "rebate_lottery": Decimal("0.20"),
        "rebate_chess": Decimal("0.20"),
        "rebate_fish": Decimal("0.10"),
        "settlement": "monthly",
    },
    {
        "system_type": "share",
        "name": "合營計劃2",
        "agent_level": "lvl2",
        "agent_name": "代理B",
        "share_ratio": 20,
        "rebate_live": Decimal("0.40"),
        "rebate_elec": Decimal("0.30"),
        "rebate_sport": Decimal("0.20"),
        "rebate_lottery": Decimal("0.10"),
        "rebate_chess": Decimal("0.10"),
        "rebate_fish": Decimal("0.05"),
        "settlement": "weekly",
    },
    {
        "system_type": "rebate",
        "name": "返水計劃1",
        "agent_level": "lvl1",
        "agent_name": "總代理A",
        "share_ratio": 0,
        "rebate_live": Decimal("0.80"),
        "rebate_elec": Decimal("0.60"),
        "rebate_sport": Decimal("0.50"),
        "rebate_lottery": Decimal("0.30"),
        "rebate_chess": Decimal("0.30"),
        "rebate_fish": Decimal("0.20"),
        "settlement": "daily",
    },
]

INSERT_SQL = text("""
INSERT INTO commission_plan
(system_type, name, agent_level, agent_name, share_ratio,
 rebate_live, rebate_elec, rebate_sport, rebate_lottery,
 rebate_chess, rebate_fish, settlement)
VALUES
(:system_type, :name, :agent_level, :agent_name, :share_ratio,
 :rebate_live, :rebate_elec, :rebate_sport, :rebate_lottery,
 :rebate_chess, :rebate_fish, :settlement)
""")

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--reset", action="store_true", help="Clear table then seed")
    parser.add_argument("--append", action="store_true", help="Append seed without clearing")
    args = parser.parse_args()

    if args.reset and args.append:
        raise SystemExit("❌ Choose only one: --reset OR --append")

    # default 行為：reset（比較符合開發）
    do_reset = args.reset or (not args.append)

    engine = create_engine(get_db_url(), future=True)

    with engine.begin() as conn:
        if do_reset:
            # MySQL 有外鍵時建議用這個包一下（你目前沒有也沒差）
            conn.execute(text("SET FOREIGN_KEY_CHECKS=0;"))
            conn.execute(text("TRUNCATE TABLE commission_plan;"))
            conn.execute(text("SET FOREIGN_KEY_CHECKS=1;"))

        for row in SEED_COMMISSION_PLANS:
            conn.execute(INSERT_SQL, row)

    print(f"✅ Seed done. reset={do_reset}, inserted={len(SEED_COMMISSION_PLANS)} rows")

if __name__ == "__main__":
    main()
