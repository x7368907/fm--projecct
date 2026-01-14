import { useState, useMemo } from 'react'
import type { DataType, TotalDataType } from '../types'
import type { DetailDataType } from '../../../../../../components/DetailModal' // 請根據實際路徑調整
// 請根據實際路徑調整
import { MOCK_DATA } from '../utils/fakeData'

export const useAgentTable = () => {
  const [modalState, setModalState] = useState({
    open: false,
    title: '',
    subTitle: '',
    data: [] as DetailDataType[],
    mode: 'agent' as 'agent' | 'member' | 'member-detail',
  })

  // 隨機產生器 helper
  const rand = (max: number) => Math.floor(Math.random() * max)

  const handleOpenDetail = (
    title: string,
    field: keyof DataType,
    record: DataType
  ) => {
    let mode: 'agent' | 'member' | 'member-detail' = 'agent'
    let mockDetails: DetailDataType[] = []

    if (['winAmount', 'lossAmount'].includes(field)) {
      mode = 'member-detail'
      mockDetails = [
        {
          key: '1',
          label: '馬佩琳',
          value: rand(10000),
          betCount: 6,
          betAmount: 600,
          validBetAmount: 600,
        },
        {
          key: '2',
          label: '林哲賢',
          value: rand(50000),
          betCount: 7,
          betAmount: 1000,
          validBetAmount: 1000,
        },
        {
          key: '3',
          label: '黃廷宇',
          value: rand(2000),
          betCount: 1,
          betAmount: 50,
          validBetAmount: 50,
        },
      ]
    } else if (
      ['deposit', 'withdraw', 'rebate', 'discount', 'cost', 'gameFee'].includes(
        field
      )
    ) {
      mode = 'member'
      mockDetails = [
        { key: '1', label: '馬佩琳', value: rand(20000) },
        { key: '2', label: '林哲賢', value: rand(50000) },
        { key: '3', label: '潘彥宇', value: rand(10000) },
      ]
    } else {
      mode = 'agent'
      mockDetails = [
        { key: '1', label: '1級總代理', value: rand(500) },
        { key: '2', label: '2級代理', value: rand(1000) },
        { key: '3', label: '3級代理', value: rand(200) },
      ]
    }

    setModalState({
      open: true,
      title: title,
      subTitle: record.agentName,
      data: mockDetails,
      mode: mode,
    })
  }

  const handleCloseModal = () => {
    setModalState((prev) => ({ ...prev, open: false }))
  }

  // 使用 useMemo 優化合計計算
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
