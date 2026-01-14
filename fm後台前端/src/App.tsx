// App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import { useAuthStore } from './store/auth'
import { useEffect } from 'react'
import AdminLayout from './layouts/AdminLayout'
import Home from './pages/Home'
// 代理管理-start
import AgentList from './pages/AgentList/AgentList/AgentList'
import AgentCommission from './pages/AgentList/AgentCommission/AgentCommission'
import PointsDetail from './pages/AgentList/PointsDetail/PointsDetail'
import ChangeLine from './pages/AgentList/ChangeLine/ChangeLine'
import ProfitManagement from './pages/AgentList/ProfitManagement/ProfitManagement'
// 代理管理-end
// 會員管理-start
import MemberDetail from './pages/member/Detail/Detail'
import MemberBankCard from './pages/member/BankCard/BankCard'
import MemberDiscount from './pages/member/Discount/Discount'
import MemberReturnWater from './pages/member/ReturnWater/ReturnWater'
import MemberPrivilege from './pages/member/Privilege/Privilege'
import MemberLogin from './pages/member/Login/Login'
import MemberChangeLine from './pages/member/ChangeLine/ChangeLine'
import MemberChangeAgent from './pages/member/ChangeAgent'
import MemberWalletRecord from './pages/member/WalletRecord/WalletRecord'
// 會員管理-end
// 特權管理-start
import DiscountManagement from './pages/operations/Discount/DiscountManagement'
import PrivilegeManagement from './pages/operations/Privilege/PrivilegeManagement'
import AnnouncementManagement from './pages/operations/Announcement/AnnouncementManagement'
// 特權管理-end
// 財務管理-start
import ConsignmentManagement from './pages/financial/Consign/ConsignmentManagement'
import GameSubmissionManagement from './pages/financial/GameManagement/GameSubmissionManagement'
import GameSubmissionSettings from './pages/financial/GameSetting/GameSubmissionSettings'
import IntegratedReporting from './pages/financial/Integrated/IntegratedReporting'
import FlowManagement from './pages/financial/PayMentFlow/PaymentFlowManagement'
import GroupManagement from './pages/financial/PayMentGroup/PaymentGroupManagement'
import StoredManagement from './pages/financial/Stored/StoredManagement'
import TransactionStatisticsRecord from './pages/financial/Transaction/TransactionStatisticsRecord'
// 財務管理-end
// 遊戲商管理-start
import GameManagement from './pages/gameDealer/GameManagement/GameManagement'
import GameRedLimitSetting from './pages/gameDealer/GameRedLimit/GameRedLimitSetting'
import GameVendorRepairManagement from './pages/gameDealer/GameVendorRepairManagement'
import LiveBettingReport from './pages/gameDealer/LiveBettingReport'
import ElectronicBettingReport from './pages/gameDealer/ElectronicBettingReport'
import SportsBettingReport from './pages/gameDealer/SportsBettingReport'
import LotteryBettingReport from './pages/gameDealer/LotteryBettingReport'
import CardGameBettingReport from './pages/gameDealer/CardGameBettingReport'
import FishingBettingReport from './pages/gameDealer/FishingBettingReport'
// 遊戲商管理-end
export default function App() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
  const initializeAuth = useAuthStore((state) => state.initializeAuth)

  useEffect(() => {
    initializeAuth()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/home" /> : <Login />}
        />

        {isLoggedIn && (
          <Route path="/home" element={<AdminLayout />}>
            <Route index element={<Home />} />
            <Route path="agent">
              <Route path="commission" element={<AgentCommission />} />
              <Route path="list" element={<AgentList />} />
              <Route path="point" element={<PointsDetail />} />
              <Route path="changeLine" element={<ChangeLine />} />
              <Route path="profitManagement" element={<ProfitManagement />} />
            </Route>
            <Route path="member">
              <Route path="detail" element={<MemberDetail />} />
              <Route path="bankCard" element={<MemberBankCard />} />
              <Route path="discount" element={<MemberDiscount />} />
              <Route path="returnWater" element={<MemberReturnWater />} />
              <Route path="privilege" element={<MemberPrivilege />} />
              <Route path="login" element={<MemberLogin />} />
              <Route path="changeLine" element={<MemberChangeLine />} />
              <Route path="changeAgent" element={<MemberChangeAgent />} />
              <Route path="walletRecord" element={<MemberWalletRecord />} />
            </Route>
            <Route path="operations">
              <Route path="discount" element={<DiscountManagement />} />
              <Route path="privilege" element={<PrivilegeManagement />} />
              <Route path="announce" element={<AnnouncementManagement />} />
            </Route>
            <Route path="financial">
              <Route path="integrate" element={<IntegratedReporting />} />
              <Route path="consignment" element={<ConsignmentManagement />} />
              <Route
                path="gameSubmissionManagement"
                element={<GameSubmissionManagement />}
              />
              <Route
                path="gameSubmissionSettings"
                element={<GameSubmissionSettings />}
              />
              <Route path="flow" element={<FlowManagement />} />
              <Route path="group" element={<GroupManagement />} />
              <Route path="stored" element={<StoredManagement />} />
              <Route
                path="transactionStatisticsRecord"
                element={<TransactionStatisticsRecord />}
              />
            </Route>
            <Route path="game">
              <Route path="gameManagement" element={<GameManagement />} />
              <Route
                path="gameRedLimitSetting"
                element={<GameRedLimitSetting />}
              />
              <Route
                path="gameVendorRepairManagement"
                element={<GameVendorRepairManagement />}
              />
              <Route path="liveBettingReport" element={<LiveBettingReport />} />
              <Route
                path="electronicBettingReport"
                element={<ElectronicBettingReport />}
              />
              <Route
                path="sportsBettingReport"
                element={<SportsBettingReport />}
              />
              <Route
                path="lotteryBettingReport"
                element={<LotteryBettingReport />}
              />
              <Route
                path="cardGameBettingReport"
                element={<CardGameBettingReport />}
              />
              <Route
                path="fishingBettingReport"
                element={<FishingBettingReport />}
              />
            </Route>
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  )
}
