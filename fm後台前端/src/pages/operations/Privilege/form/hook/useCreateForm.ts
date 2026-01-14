import { useState, useEffect } from 'react'
import type { DataType } from '../../types'

// 產生空資料的 Helper
const createEmptyRow = (key: string, index: number): DataType => ({
  key,
  no: index + 1,
  type: '',
  depositReq: '0',
  validBet: '0',
  validBetUpgrade: '0',
  upgradeBonus: 0,
  rebateRatio: 0,
  birthdayBonus: 0,
  dailyWithdrawCount: 0,
  dailyWithdrawLimit: '0',
  live_h: 0,
  live_d: 0,
  live_w: 0,
  elec_h: 0,
  elec_d: 0,
  elec_w: 0,
  sport_h: 0,
  sport_d: 0,
  sport_w: 0,
  lottery_h: 0,
  lottery_d: 0,
  lottery_w: 0,
  card_h: 0,
  card_d: 0,
  card_w: 0,
  fish_h: 0,
  fish_d: 0,
  fish_w: 0,
})

// 預設模擬資料
const DEFAULT_MOCK_DATA = [
  { ...createEmptyRow('1', 0), type: 'VIP0-遊客', birthdayBonus: 88 },
  { ...createEmptyRow('2', 1), type: 'VIP1-一般會員', birthdayBonus: 168 },
  { ...createEmptyRow('3', 2), type: 'VIP2-BOK會員', birthdayBonus: 588 },
]

export const useCreateForm = (
  mode: 'create' | 'edit',
  initialRecord?: DataType | null
) => {
  const [dataSource, setDataSource] = useState<DataType[]>([])

  // 初始化
  useEffect(() => {
    if (mode === 'edit' && initialRecord) {
      setDataSource([{ ...initialRecord }])
    } else {
      setDataSource(DEFAULT_MOCK_DATA)
    }
  }, [mode, initialRecord])

  // 處理數值變更
  const handleValueChange = (value: any, key: string, dataIndex: string) => {
    const newData = [...dataSource]
    const targetIndex = newData.findIndex((item) => item.key === key)
    if (targetIndex > -1) {
      newData[targetIndex] = { ...newData[targetIndex], [dataIndex]: value }
      setDataSource(newData)
    }
  }

  // 新增一列
  const handleAddRow = () => {
    const newKey = (dataSource.length + 1).toString()
    const newRow = createEmptyRow(newKey, dataSource.length)
    setDataSource([...dataSource, newRow])
  }

  // 刪除一列
  const handleDeleteRow = (key: string) => {
    const newData = dataSource.filter((item) => item.key !== key)
    setDataSource(newData)
  }

  return {
    dataSource,
    handleAddRow,
    handleDeleteRow,
    handleValueChange,
  }
}
