import { useState } from 'react'
// 請確認路徑是否正確，若無此檔案可暫時用 any
// 請確認路徑是否正確，若無此檔案可暫時用 any
import type { HandlerLogData } from '../../components/HandlerModal'

export function useHandlerLogs() {
  const [isHandlerModalOpen, setIsHandlerModalOpen] = useState(false)
  const [currentLogs, setCurrentLogs] = useState<HandlerLogData[]>([])

  const fetchLogs = (recordKey: string) => {
    // 模擬 API 請求
    const randomCount = Math.floor(Math.random() * 4) + 1
    const newLogs: HandlerLogData[] = Array.from({ length: randomCount }).map(
      (_, i) => ({
        key: `${recordKey}-${i}`,
        time: '2025-05-20 14:00:00',
        handler: i % 2 === 0 ? 'admin' : 'system',
        status: i === 0 ? '新增' : '修改',
        details: `針對單號 [${recordKey}] 的變更紀錄 - ${i + 1}`,
      })
    )
    setCurrentLogs(newLogs)
    setIsHandlerModalOpen(true)
  }

  return {
    isHandlerModalOpen,
    setIsHandlerModalOpen,
    currentLogs,
    fetchLogs,
  }
}
