import { useState } from 'react'
import type { HandlerLogData } from '../../../AgentList/components/HandlerModal'
// ↑ 注意：請確認 HandlerLogData 的引用路徑是否正確

export function useHandlerLogs() {
  const [isOpen, setIsOpen] = useState(false)
  const [logs, setLogs] = useState<HandlerLogData[]>([])

  const openLogs = (gameName: string, rtp: string) => {
    // 這裡放模擬資料邏輯，或串接 API
    const mockLogs: HandlerLogData[] = [
      {
        key: 'log-1',
        time: '2026-01-08 14:20:00',
        handler: 'admin',
        status: '修改',
        details: `修改遊戲RTP: 95% -> ${rtp}`,
      },
      {
        key: 'log-2',
        time: '2026-01-05 10:00:00',
        handler: 'system',
        status: '上架',
        details: `遊戲上架: ${gameName}`,
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
