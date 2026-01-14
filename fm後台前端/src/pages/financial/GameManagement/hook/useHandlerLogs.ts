// src/pages/GameRevenue/hooks/useHandlerLogs.ts
import { useState } from 'react'
import type { GameSettlementType } from '../types'
// 這裡引用你原本定義 HandlerLogData 的地方，假設是在 AgentList
import type { HandlerLogData } from '../../../AgentList/components/HandlerModal'

export function useHandlerLogs() {
  const [isOpen, setIsOpen] = useState(false)
  const [logs, setLogs] = useState<HandlerLogData[]>([])

  // 如果未來接 API，這裡可以加 isLoading

  // 開啟彈窗並讀取資料
  const openLogs = (record: GameSettlementType) => {
    // 這裡模擬 API 請求
    console.log('Fetching logs for:', record.key)

    const mockLogs: HandlerLogData[] = [
      {
        key: 'log-1',
        time: '2025-07-31 10:00:00',
        handler: 'admin',
        status: '修改',
        details: `變更狀態為: ${record.status}`,
      },
    ]

    setLogs(mockLogs)
    setIsOpen(true)
  }

  // 關閉彈窗
  const closeLogs = () => {
    setIsOpen(false)
    setLogs([]) // 關閉時清空資料是一個好習慣
  }

  return {
    isOpen,
    logs,
    openLogs,
    closeLogs,
  }
}
