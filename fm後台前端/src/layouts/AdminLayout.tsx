import { Layout, Menu, Typography } from 'antd'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { useAuthStore } from '../store/auth'
import { me } from '../api/auth'

const { Header, Sider, Content } = Layout
const { Title } = Typography

const menuItems = [
  {
    key: 'home',
    label: '首頁',
    path: '/home',
  },
  {
    key: 'agent',
    label: '代理管理',
    path: '/home/agent/list',
    children: [
      {
        key: 'agent/commission',
        label: '分潤管理',
        path: '/home/agent/commission',
      },
      { key: 'agent/list', label: '代理資料', path: '/home/agent/list' },
      {
        key: 'agent/point',
        label: '點數加扣點資料',
        path: '/home/agent/point',
      },
      {
        key: 'agent/changeLine',
        label: '代理換線紀錄',
        path: '/home/agent/changeLine',
      },
      {
        key: 'agent/profitManagement',
        label: '代理分潤管理',
        path: '/home/agent/profitManagement',
      },
    ],
  },
  {
    key: 'member',
    label: '會員管理',
    path: '/home/member',
    children: [
      { key: 'member/detail', label: '會員資料', path: '/home/member/detail' },
      {
        key: 'agent/bankCard',
        label: '會員銀行卡',
        path: '/home/member/bankCard',
      },
      {
        key: 'member/discount',
        label: '會員優惠申請',
        path: '/home/member/discount',
      },
      {
        key: 'member/returnWater',
        label: '會員返水申請',
        path: '/home/member/returnWater',
      },
      {
        key: 'member/privilege',
        label: '會員特權管理',
        path: '/home/member/privilege',
      },
      {
        key: 'member/login',
        label: '會員登入管理',
        path: '/home/member/login',
      },
      {
        key: 'member/changeLine',
        label: '會員換線管理',
        path: '/home/member/changeLine',
      },
      {
        key: 'member/changeAgent',
        label: '會員轉代理管理',
        path: '/home/member/changeAgent',
      },
      {
        key: 'member/walletRecord',
        label: '會員錢包紀錄',
        path: '/home/member/walletRecord',
      },
    ],
  },
  {
    key: 'ops',
    label: '營運管理',
    path: '/home/ops',
    children: [
      {
        key: 'ops/privilege',
        label: '特權管理',
        path: '/home/operations/privilege',
      },
      {
        key: 'ops/discount',
        label: '優惠管理',
        path: '/home/operations/discount',
      },
      {
        key: 'ops/announce',
        label: '公告管理',
        path: '/home/operations/announce',
      },
    ],
  },
  {
    key: 'financial',
    label: '財務管理',
    path: '/home/financial',
    children: [
      {
        key: 'financial/integrate',
        label: '整合報表',
        path: '/home/financial/integrate',
      },
      {
        key: 'financial/flow',
        label: '金流串接管理',
        path: '/home/financial/flow',
      },
      {
        key: 'financial/group',
        label: '金流群組管理',
        path: '/home/financial/group',
      },
      {
        key: 'financial/stored',
        label: '儲值申請管理',
        path: '/home/financial/stored',
      },
      {
        key: 'financial/consignment',
        label: '託售申請管理',
        path: '/home/financial/consignment',
      },
      {
        key: 'financial/gameSubmissionSettings',
        label: '遊戲上繳設定',
        path: '/home/financial/gameSubmissionSettings',
      },
      {
        key: 'financial/gameSubmissionManagement',
        label: '遊戲上繳管理',
        path: '/home/financial/gameSubmissionManagement',
      },
      {
        key: 'financial/transactionStatisticsRecord',
        label: '交易統計紀錄',
        path: '/home/financial/transactionStatisticsRecord',
      },
    ],
  },
  {
    key: 'game',
    label: '遊戲商管理',
    path: '/home/game',
    children: [
      {
        key: 'game/gameManagement',
        label: '遊戲管理',
        path: '/home/game/gameManagement',
      },
      {
        key: 'game/gameRedLimitSetting',
        label: '遊戲限紅設定',
        path: '/home/game/gameRedLimitSetting',
      },
      {
        key: 'game/gameVendorRepairManagement',
        label: '遊戲商維修管理',
        path: '/home/game/gameVendorRepairManagement',
      },
      {
        key: 'game/liveBettingReport',
        label: '真人下注報表',
        path: '/home/game/liveBettingReport',
      },
      {
        key: 'game/electronicBettingReport',
        label: '電子下注報表',
        path: '/home/game/electronicBettingReport',
      },
      {
        key: 'game/sportsBettingReport',
        label: '體育下注報表',
        path: '/home/game/sportsBettingReport',
      },
      {
        key: 'game/lotteryBettingReport',
        label: '彩票下注報表',
        path: '/home/game/lotteryBettingReport',
      },
      {
        key: 'game/cardGameBettingReport',
        label: '棋牌下注報表',
        path: '/home/game/cardGameBettingReport',
      },
      {
        key: 'game/fishingBettingReport',
        label: '捕魚下注報表',
        path: '/home/game/fishingBettingReport',
      },
    ],
  },
  {
    key: 'admin',
    label: '後台管理',
    path: '/home/admin',
  },
]

export default function AdminLayout() {
  const navigate = useNavigate()
  const location = useLocation()

  const { user, setLoginUser, setLogoutUser } = useAuthStore()

  const [openKeys, setOpenKeys] = useState<string[]>([])

  // ✅ 扁平化 menu，方便 click 時找路徑
  const flatMenu = useMemo(() => {
    return menuItems.flatMap((item) => item.children || [item])
  }, [])

  const handleLogout = () => {
    setLogoutUser()
    navigate('/', { replace: true })
  }

  const getSelectedKeys = () => {
    const path = location.pathname
    const match = flatMenu.find((sub) => sub.path === path)
    return match ? [match.key] : []
  }

  // ✅ 自動展開目前路徑所屬的父選單
  useEffect(() => {
    const current = menuItems.find((item) => {
      if (!item.children) return false
      return item.children.some((child) =>
        location.pathname.startsWith(child.path)
      )
    })
    if (current) setOpenKeys([current.key])
  }, [location.pathname])

  // ✅ 重新整理後：若有 token 但 store 沒 user → 呼叫 /auth/me 補回
  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (!token) return

    if (!user) {
      me()
        .then((u) => {
          setLoginUser(u)
        })
        .catch(() => {
          // token 失效 / 後端拒絕 → 登出回登入
          setLogoutUser()
          navigate('/', { replace: true })
        })
    }
  }, [user, setLoginUser, setLogoutUser, navigate])

  const handleClick = (e: any) => {
    const target = flatMenu.find((i) => i.key === e.key)

    if (!target) {
      const parent = menuItems.find((item) => item.key === e.key)
      if (parent?.path) navigate(parent.path)
    } else {
      navigate(target.path)
    }
  }

  return (
    <Layout className="min-h-[100vh]">
      <Header className="flex h-[70px] items-center justify-between bg-[#e2e2e2] px-6">
        <Title level={4} className="mt-2">
          FM後台管理系統
        </Title>

        <div className="flex items-center gap-2">
          {['會員驗證通知', '週返水', '日返水', '拋售審核', '儲值審核'].map(
            (label) => (
              <div
                key={label}
                className="border border-[#999] bg-white px-2 py-1 text-center"
              >
                {label}
                <br />
                (0)
              </div>
            )
          )}

          <button className="cursor-pointer border border-[#999] bg-white px-2 py-3 text-center">
            <span>瀏覽前台</span>
          </button>

          <button
            onClick={handleLogout}
            className="cursor-pointer border border-[#999] bg-white px-2 py-3 text-center"
          >
            登出
          </button>

          <strong className="ml-3">
            Hi {user?.username ? user.username : '—'}！
          </strong>
        </div>
      </Header>

      <Layout>
        <Sider width={200} theme="light">
          <Menu
            mode="inline"
            selectedKeys={getSelectedKeys()}
            openKeys={openKeys}
            onOpenChange={(keys) => setOpenKeys(keys)}
            onClick={handleClick}
            className="h-full border-r-0"
          >
            {menuItems.map((item) =>
              item.children ? (
                <Menu.SubMenu key={item.key} title={item.label}>
                  {item.children.map((child) => (
                    <Menu.Item key={child.key}>{child.label}</Menu.Item>
                  ))}
                </Menu.SubMenu>
              ) : (
                <Menu.Item key={item.key}>{item.label}</Menu.Item>
              )
            )}
          </Menu>
        </Sider>

        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
