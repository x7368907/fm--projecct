import { useState } from 'react'
import type { BankCardType } from '../types'
import type { HandlerLogData } from '../../../AgentList/components/HandlerModal'

export const useBankCardLogs = () => {
  const [isHandlerModalOpen, setIsHandlerModalOpen] = useState(false)
  const [currentLogs, setCurrentLogs] = useState<HandlerLogData[]>([])

  const fetchLogs = (record: BankCardType) => {
    const randomCount = Math.floor(Math.random() * 5) + 1
    const statusOptions: HandlerLogData['status'][] = ['新增', '修改', '刪除']
    const newLogs: HandlerLogData[] = Array.from({ length: randomCount }).map(
      (_, i) => ({
        key: `${record.key}-${i}`,
        time: '2025-06-02 14:00:00',
        handler: i % 2 === 0 ? 'admin' : 'system',
        status: statusOptions[i % 3],
        details: `針對會員 [${record.name}] 的變更紀錄 - ${i + 1}`,
      })
    )
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
