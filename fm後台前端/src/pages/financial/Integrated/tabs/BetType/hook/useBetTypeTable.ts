import { useState, useMemo } from 'react'
import type { BetTypeDataType, TotalDataType } from '../types'
import { MOCK_DATA } from '../utils/fakeData'
// 請確認這個路徑指向你的 DetailModal 檔案位置
import type { DetailDataType } from '../../../../../../components/DetailModal'

export const useBetTypeTable = () => {
  // 1. 【新增】彈窗狀態管理
  const [modalState, setModalState] = useState({
    open: false,
    title: '',
    subTitle: '',
    data: [] as DetailDataType[],
    mode: 'bettype-detail' as any, // 設定為下注類別專用模式
  })

  // 2. 【更新】點擊事件處理 (產生假資料並開啟彈窗)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleLinkClick = (title: string, record: BetTypeDataType) => {
    // 簡單判斷點擊的是哪個遊戲類別
    let gameType = '電子'
    if (title.includes('真人')) gameType = '真人'
    if (title.includes('體育')) gameType = '體育'
    if (title.includes('彩票')) gameType = '彩票'
    if (title.includes('棋牌')) gameType = '棋牌'
    if (title.includes('捕魚')) gameType = '捕魚'

    // 隨機產生時間 helper
    const rand = (max: number) => Math.floor(Math.random() * max)
    const getRandomTime = () =>
      `2025-06-01 08:${rand(60).toString().padStart(2, '0')}:23`

    // 產生模擬的詳細注單資料
    const mockDetails: DetailDataType[] = Array.from({ length: 5 }).map(
      (_, i) => ({
        key: `${i}`,
        time: getRandomTime(),
        gameType: gameType,
        vendor: ['ATG', 'DG', 'RSG', 'OB'][rand(4)], // 隨機廠商
        betCount: 1,
        betAmount: 100 * (i + 1),
        validBetAmount: 100 * (i + 1),
        value: 0, // bettype-detail 模式主要看上面三個欄位
      })
    )

    // 更新狀態，開啟彈窗
    setModalState({
      open: true,
      title: '下注紀錄', // 彈窗標題
      subTitle: '', // 副標題 (可選)
      data: mockDetails,
      mode: 'bettype-detail',
    })
  }

  // 3. 【新增】關閉彈窗函式
  const handleCloseModal = () => {
    setModalState((prev) => ({ ...prev, open: false }))
  }

  // 4. 計算合計 (保持原本邏輯)
  const totalData = useMemo(() => {
    return MOCK_DATA.reduce(
      (acc, cur) => ({
        betCount: acc.betCount + cur.betCount,

        liveBetCount: acc.liveBetCount + cur.liveBetCount,
        slotBetCount: acc.slotBetCount + cur.slotBetCount,
        sportBetCount: acc.sportBetCount + cur.sportBetCount,
        lotteryBetCount: acc.lotteryBetCount + cur.lotteryBetCount,
        chessBetCount: acc.chessBetCount + cur.chessBetCount,
        fishBetCount: acc.fishBetCount + cur.fishBetCount,

        liveValidBet: acc.liveValidBet + cur.liveValidBet,
        slotValidBet: acc.slotValidBet + cur.slotValidBet,
        sportValidBet: acc.sportValidBet + cur.sportValidBet,
        lotteryValidBet: acc.lotteryValidBet + cur.lotteryValidBet,
        chessValidBet: acc.chessValidBet + cur.chessValidBet,
        fishValidBet: acc.fishValidBet + cur.fishValidBet,
        totalValidBet: acc.totalValidBet + cur.totalValidBet,

        winAmount: acc.winAmount + cur.winAmount,
        lossAmount: acc.lossAmount + cur.lossAmount,
        accountBalance: acc.accountBalance + cur.accountBalance,
        gameBalance: acc.gameBalance + cur.gameBalance,
      }),
      {
        betCount: 0,
        liveBetCount: 0,
        slotBetCount: 0,
        sportBetCount: 0,
        lotteryBetCount: 0,
        chessBetCount: 0,
        fishBetCount: 0,
        liveValidBet: 0,
        slotValidBet: 0,
        sportValidBet: 0,
        lotteryValidBet: 0,
        chessValidBet: 0,
        fishValidBet: 0,
        totalValidBet: 0,
        winAmount: 0,
        lossAmount: 0,
        accountBalance: 0,
        gameBalance: 0,
      } as TotalDataType
    )
  }, [])

  // 5. 【修正】回傳所有需要的變數
  return {
    dataSource: MOCK_DATA,
    totalData,
    handleLinkClick,
    modalState, // <--- 這裡要傳出去
    handleCloseModal, // <--- 這裡要傳出去
  }
}
