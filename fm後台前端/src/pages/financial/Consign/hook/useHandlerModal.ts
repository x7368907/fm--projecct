import { useState } from 'react'
import type { HandlerLogData } from '../../../AgentList/components/HandlerModal' // 假設路徑
import type { ConsignDataType } from '../types' // 引用你的型別定義
// 引用你的型別定義

export function useHandlerModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [logs, setLogs] = useState<HandlerLogData[]>([])

  const openLogs = (record: ConsignDataType) => {
    // 這裡未來可以換成 API 請求
    const mockLogs: HandlerLogData[] = [
      {
        key: 'log-1',
        time: '2025-06-06 16:10:00',
        handler: 'admin',
        status: '審核',
        details: '變更狀態: 待審核 -> 通過',
      },
      {
        key: 'log-2',
        time: '2025-06-06 16:09:15',
        handler: 'system',
        status: '申請',
        details: `會員 ${record.memberName} 提交託售申請 $${record.amount}`,
      },
    ]
    setLogs(mockLogs)
    setIsOpen(true)
  }

  const closeLogs = () => {
    setIsOpen(false)
    setLogs([])
  }

  return {
    isOpen,
    logs,
    openLogs,
    closeLogs,
  }
}
