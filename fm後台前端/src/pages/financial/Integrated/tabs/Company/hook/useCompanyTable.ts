import { useState, useMemo } from 'react'
import type { DataType, TotalDataType } from '../types'
import type { DetailDataType } from '../../../../../../components/DetailModal' // 請確認路徑
// 請確認路徑
import { MOCK_DATA } from '../utils/fakeData'

export const useCompanyTable = () => {
  // 1. 彈窗狀態
  const [modalState, setModalState] = useState({
    open: false,
    title: '',
    subTitle: '',
    data: [] as DetailDataType[],
    mode: 'agent' as 'agent' | 'category',
  })

  // 2. 開啟彈窗邏輯 (包含假資料生成)
  const handleOpenDetail = (
    title: string,
    field: keyof DataType,
    record: DataType
  ) => {
    let mockDetails: DetailDataType[] = []
    let mode: 'agent' | 'category' = 'agent'

    if (field === 'netProfit') {
      mode = 'category'
      mockDetails = [
        { key: '1', label: '會員輸贏', value: 13380 },
        { key: '2', label: '遊戲上繳金額', value: -1605.6 },
        { key: '3', label: '會員返水', value: -40.52 },
        { key: '4', label: '會員優惠', value: -2226 },
        { key: '5', label: '營運成本', value: 150 },
        { key: '6', label: '代理分潤', value: -11773 },
      ]
    } else {
      const isMoneyField =
        field.toString().toLowerCase().includes('amount') ||
        ['rebate', 'discount', 'cost', 'commission', 'gameFee'].includes(field)

      const generateValue = () =>
        isMoneyField
          ? Math.floor(Math.random() * 1000000)
          : Math.floor(Math.random() * 500)

      mockDetails = [
        { key: '1', label: '1級總代理', value: generateValue() },
        { key: '2', label: '2級代理', value: generateValue() },
        { key: '3', label: '3級代理', value: generateValue() },
        { key: '4', label: '4級代理', value: generateValue() },
      ]
    }

    setModalState({
      open: true,
      title,
      subTitle: record.agentName,
      data: mockDetails,
      mode,
    })
  }

  const handleCloseModal = () => {
    setModalState((prev) => ({ ...prev, open: false }))
  }

  // 3. 計算合計 (使用 useMemo 優化效能)
  const totalData = useMemo(() => {
    return MOCK_DATA.reduce(
      (acc, cur) => ({
        memberCount: acc.memberCount + cur.memberCount,
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
        commission: acc.commission + cur.commission,
        gameFee: acc.gameFee + cur.gameFee,
        netProfit: acc.netProfit + cur.netProfit,
      }),
      {
        memberCount: 0,
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
        commission: 0,
        gameFee: 0,
        netProfit: 0,
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
