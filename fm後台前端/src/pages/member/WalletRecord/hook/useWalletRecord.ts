import { useState } from 'react'
import { message } from 'antd'
import type { WalletData } from '../types'
import type { HandlerLogData } from '../../../AgentList/components/HandlerModal'
import { INITIAL_DATA } from '../utils/fakeData'

export const useWalletRecord = () => {
  const [dataSource, setDataSource] = useState<WalletData[]>(INITIAL_DATA)
  const [isHandlerModalOpen, setIsHandlerModalOpen] = useState(false)
  const [currentLogs, setCurrentLogs] = useState<HandlerLogData[]>([])

  // 更新備註
  const handleUpdateNote = (key: string, newNote: string) => {
    const newData = dataSource.map((item) => {
      if (item.key === key) return { ...item, remark: newNote }
      return item
    })
    setDataSource(newData)
    message.success('備註更新成功')
  }

  // 獲取 Log
  const fetchLogs = (record: WalletData) => {
    const mockLogs: HandlerLogData[] = [
      {
        key: '1',
        time: '2025-12-02 10:00:00',
        handler: 'admin',
        status: '新增',
        details: `建立錢包紀錄：${record.type}`,
      },
      // ... 其他 Mock 邏輯
    ]
    setCurrentLogs(mockLogs)
    setIsHandlerModalOpen(true)
  }

  // 搜尋
  const handleSearch = (values: any) => {
    console.log('執行搜尋:', values)
    message.loading('搜尋中...', 0.5)
  }

  return {
    dataSource,
    handleUpdateNote,
    handleSearch,
    logState: {
      open: isHandlerModalOpen,
      setOpen: setIsHandlerModalOpen,
      logs: currentLogs,
      fetchLogs,
    },
  }
}
