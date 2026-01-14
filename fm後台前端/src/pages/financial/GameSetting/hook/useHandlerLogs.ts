import { useState } from 'react'
import type { GameSettingData } from '../types'
import type { HandlerLogData } from '../../../AgentList/components/HandlerModal'

export function useHandlerLogs() {
  const [isOpen, setIsOpen] = useState(false)
  const [logs, setLogs] = useState<HandlerLogData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [targetRecord, setTargetRecord] = useState<GameSettingData | null>(null)

  // 開啟彈窗並讀取日誌
  const openLogs = (record: GameSettingData) => {
    setTargetRecord(record)
    setIsOpen(true)
    setIsLoading(true)
    setLogs([]) // 清空舊資料

    console.log(`正在讀取 [${record.vendorName}] 的經手人日誌...`)

    // 模擬 API 請求延遲
    setTimeout(() => {
      const mockLogs: HandlerLogData[] = [
        {
          key: '1',
          time: '2026-01-05 09:30:00',
          handler: 'Luca',
          status: '修改',
          details: `修改 [${record.vendorName}] 備註內容`,
        },
        {
          key: '2',
          time: '2026-01-04 14:20:00',
          handler: 'System',
          status: '系統自動更新',
          details: '同步彩金貢獻值',
        },
      ]
      setLogs(mockLogs)
      setIsLoading(false)
    }, 500)
  }

  // 關閉彈窗
  const closeLogs = () => {
    setIsOpen(false)
    setLogs([])
    setTargetRecord(null)
  }

  return {
    isOpen,
    logs,
    isLoading,
    targetRecord,
    openLogs,
    closeLogs,
  }
}
