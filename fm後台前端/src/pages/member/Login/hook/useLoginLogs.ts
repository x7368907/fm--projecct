import { useState } from 'react'
import type { MemberLoginType } from '../types'
import type { HandlerLogData } from '../../../AgentList/components/HandlerModal'

export const useLoginLogs = () => {
  const [isHandlerModalOpen, setIsHandlerModalOpen] = useState(false)
  const [currentLogs, setCurrentLogs] = useState<HandlerLogData[]>([])

  const fetchLogs = (record: MemberLoginType) => {
    const mockLogs: HandlerLogData[] = [
      {
        key: 'log-1',
        time: '2025-05-30 14:00:00',
        handler: 'admin',
        status: '修改',
        details: `修改會員 [${record.name}] 的狀態為 ${record.status}`,
      },
      {
        key: 'log-2',
        time: '2025-05-29 10:00:00',
        handler: 'system',
        status: '新增',
        details: '系統自動建立帳號',
      },
    ]
    setCurrentLogs(mockLogs)
    setIsHandlerModalOpen(true)
  }

  const closeLogs = () => setIsHandlerModalOpen(false)

  return { isHandlerModalOpen, currentLogs, fetchLogs, closeLogs }
}
