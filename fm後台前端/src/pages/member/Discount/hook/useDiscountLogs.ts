import { useState } from 'react'
import type { DiscountDataType } from '../types'
import type { HandlerLogData } from '../../../AgentList/components/HandlerModal'

export const useDiscountLogs = () => {
  const [isHandlerModalOpen, setIsHandlerModalOpen] = useState(false)
  const [currentLogs, setCurrentLogs] = useState<HandlerLogData[]>([])

  const fetchLogs = (record: DiscountDataType) => {
    console.log('查看紀錄:', record)
    // 模擬產生 Log
    const newLogs: HandlerLogData[] = [
      {
        key: '1',
        time: '2025-07-12 10:00:00',
        handler: 'admin',
        status: '修改',
        details: '修改備註',
      },
    ]
    setCurrentLogs(newLogs)
    setIsHandlerModalOpen(true)
  }

  const closeLogs = () => setIsHandlerModalOpen(false)

  return {
    isHandlerModalOpen,
    currentLogs,
    fetchLogs,
    closeLogs,
  }
}
