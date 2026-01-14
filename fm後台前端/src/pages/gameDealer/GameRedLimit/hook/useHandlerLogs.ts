// hooks/useHandlerLogs.ts
import { useState, useCallback } from 'react'
import type { HandlerLogData } from '../../../AgentList/components/HandlerModal'

export function useHandlerLogs() {
  const [isOpen, setIsOpen] = useState(false)
  const [logs, setLogs] = useState<HandlerLogData[]>([])

  // 這裡假設傳入名稱或是 ID 用來撈資料
  const openLogs = useCallback((recordName: string) => {
    // 模擬 API
    console.log('Fetching logs for:', recordName)
    const mockLogs: HandlerLogData[] = [
      {
        key: 'log-1',
        time: '2026-01-09 12:00:00',
        handler: 'admin',
        status: '修改',
        details: `修改 ${recordName} 設定`,
      },
    ]
    setLogs(mockLogs)
    setIsOpen(true)
  }, [])

  const closeLogs = useCallback(() => {
    setIsOpen(false)
    setLogs([])
  }, [])

  return { isOpen, logs, openLogs, closeLogs }
}
