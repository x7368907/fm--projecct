import { useState, useMemo } from 'react'
import type { BankCardType } from '../types'
import { INITIAL_DATA } from '../utils/fakeData'

export const useBankCardData = () => {
  const [dataSource, setDataSource] = useState<BankCardType[]>(INITIAL_DATA)
  const [activeTab, setActiveTab] = useState('待審核')

  // 更新備註
  const handleUpdateNote = (key: React.Key, newNote: string) => {
    const newData = dataSource.map((item) => {
      if (item.key === key) return { ...item, remark: newNote }
      return item
    })
    setDataSource(newData)
    console.log(`更新 Key: ${key} 的備註為: ${newNote}`)
  }

  // 資料過濾
  const filteredData = useMemo(() => {
    return dataSource.filter((item) => {
      if (activeTab === '待審核') return item.processStatus === '待審核'
      if (activeTab === '啟用')
        return item.status === '啟用' && item.processStatus === '通過'
      if (activeTab === '停用') return item.status === '停用'
      if (activeTab === '拒絕') return item.processStatus === '拒絕'
      return true
    })
  }, [activeTab, dataSource])

  // 筆數計算
  const counts = useMemo(() => {
    return {
      pending: dataSource.filter((i) => i.processStatus === '待審核').length,
      active: dataSource.filter(
        (i) => i.status === '啟用' && i.processStatus === '通過'
      ).length,
      rejected: dataSource.filter((i) => i.processStatus === '拒絕').length,
      disabled: dataSource.filter((i) => i.status === '停用').length,
    }
  }, [dataSource])

  return {
    dataSource,
    filteredData,
    activeTab,
    setActiveTab,
    handleUpdateNote,
    counts,
  }
}
