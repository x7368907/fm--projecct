import { useState, useMemo } from 'react'
import type {
  MemberDataType,
  TotalDataType,
  ModalState,
  ModalMode,
} from '../types'
import type { DetailDataType } from '../../../../../../components/DetailModal'
import { MOCK_DATA } from '../utils/fakeData'

export const useMemberTable = () => {
  // 1. 彈窗狀態
  const [modalState, setModalState] = useState<ModalState>({
    open: false,
    title: '',
    subTitle: '',
    data: [],
    mode: 'agent',
  })

  // 2. Helper Functions
  const getRandomTime = () =>
    `2025-07-16 08:${Math.floor(Math.random() * 59)
      .toString()
      .padStart(2, '0')}:23`

  const rand = (max: number) => Math.floor(Math.random() * max)

  // 3. 開啟彈窗邏輯
  const handleOpenDetail = (
    title: string,
    field: keyof MemberDataType,
    record: MemberDataType
  ) => {
    let mode: ModalMode = 'agent'
    let mockDetails: DetailDataType[] = []

    // --- A. 注單相關 ---
    if (
      [
        'betAmount',
        'validBetAmount',
        'winAmount',
        'lossAmount',
        'betCount',
      ].includes(field)
    ) {
      mode = 'member-bet'
      mockDetails = Array.from({ length: 5 }).map((_, i) => ({
        key: `${i}`,
        time: getRandomTime(),
        gameType: ['真人', '電子', '體育', '彩票'][rand(4)],
        vendor: ['DG', 'RSG', 'Super', 'MT'][rand(4)],
        betCount: 1,
        validBetAmount: 100 * (i + 1),
        value: field === 'lossAmount' ? -100 : 100 * (i + 1),
      }))
    }
    // --- B. 返水 ---
    else if (field === 'rebate') {
      mode = 'member-rebate'
      mockDetails = Array.from({ length: 5 }).map((_, i) => ({
        key: `${i}`,
        time: getRandomTime(),
        gameType: ['真人', '電子'][rand(2)],
        vendor: ['DG', 'RSG'][rand(2)],
        validBetAmount: 1000 * (i + 1),
        rate: 0.4,
        value: 4 * (i + 1),
      }))
    }
    // --- C. 優惠 ---
    else if (field === 'discount') {
      mode = 'member-discount'
      mockDetails = [
        { key: '1', time: getRandomTime(), name: 'VIP2儲值回饋', value: 1888 },
        { key: '2', time: getRandomTime(), name: '代理紅包', value: 5000 },
      ]
    }
    // --- D. 營運成本 ---
    else if (field === 'cost') {
      mode = 'member-cost'
      mockDetails = [
        {
          key: '1',
          time: getRandomTime(),
          baseAmount: 10000,
          type: '儲值回饋金',
          rate: 1,
          value: 100,
        },
        {
          key: '2',
          time: getRandomTime(),
          baseAmount: 10000,
          type: '儲值手續費',
          rate: 2,
          value: 200,
        },
      ]
    }
    // --- E. 遊戲上繳 ---
    else if (field === 'gameFee') {
      mode = 'member-gamefee'
      mockDetails = [
        {
          key: '1',
          gameType: '真人',
          vendor: '歐博',
          baseAmount: 500,
          rate: 6,
          value: 30,
        },
        {
          key: '2',
          gameType: '電子',
          vendor: 'RSG',
          baseAmount: 300,
          rate: 10,
          value: 30,
        },
      ]
    }
    // --- F. 儲值/託售 ---
    else if (['deposit', 'withdraw'].includes(field)) {
      mode = 'member-transaction'
      mockDetails = Array.from({ length: 3 }).map((_, i) => ({
        key: `${i}`,
        time: getRandomTime(),
        value: field === 'deposit' ? 20000 : 10000,
      }))
    }

    setModalState({
      open: true,
      title: title,
      subTitle: `1/4 ${record.agentName}`,
      data: mockDetails,
      mode: mode,
    })
  }

  const handleCloseModal = () => {
    setModalState((prev) => ({ ...prev, open: false }))
  }

  // 4. 計算合計 (使用 useMemo)
  const totalData = useMemo(() => {
    return MOCK_DATA.reduce(
      (acc, cur) => ({
        betCount: acc.betCount + cur.betCount,
        betAmount: acc.betAmount + cur.betAmount,
        validBetAmount: acc.validBetAmount + cur.validBetAmount,
        winAmount: acc.winAmount + cur.winAmount,
        lossAmount: acc.lossAmount + cur.lossAmount,
        deposit: acc.deposit + cur.deposit,
        withdraw: acc.withdraw + cur.withdraw,
        rebate: acc.rebate + cur.rebate,
        discount: acc.discount + cur.discount,
        cost: acc.cost + cur.cost,
        gameFee: acc.gameFee + cur.gameFee,
      }),
      {
        betCount: 0,
        betAmount: 0,
        validBetAmount: 0,
        winAmount: 0,
        lossAmount: 0,
        deposit: 0,
        withdraw: 0,
        rebate: 0,
        discount: 0,
        cost: 0,
        gameFee: 0,
      } as TotalDataType
    )
  }, [])

  return {
    dataSource: MOCK_DATA,
    totalData,
    modalState,
    handleOpenDetail,
    handleCloseModal,
  }
}
