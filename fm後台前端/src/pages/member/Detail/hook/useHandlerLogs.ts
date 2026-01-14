import { useState } from 'react'
import type { DataType } from '../types'
import type { HandlerLogData } from '../../../AgentList/components/HandlerModal'

export const useMemberLogs = () => {
  const [currentLogs, setCurrentLogs] = useState<HandlerLogData[]>([])
  const [isHandlerModalOpen, setIsHandlerModalOpen] = useState(false)

  const fetchLogs = (record: DataType) => {
    // 這裡模擬從後端抓回來的資料
    const randomCount = Math.floor(Math.random() * 5) + 1
    const newLogs: HandlerLogData[] = Array.from({ length: randomCount }).map(
      (_, i) => ({
        key: `${record.key}-${i}`,
        time: '2025-05-20 14:00:00', // 假時間
        handler: i % 2 === 0 ? 'admin' : 'system',
        status: i === 0 ? '新增' : '修改', // 第一筆是新增，後面是修改
        details: `針對代理 [${record.memberName}] 的欄位變更紀錄 - ${i + 1}`,
      })
    )

    setCurrentLogs(newLogs)
    setIsHandlerModalOpen(true)
  }

  const closeHandlerModal = () => {
    setIsHandlerModalOpen(false)
  }

  return {
    currentLogs,
    isHandlerModalOpen,
    fetchLogs,
    closeHandlerModal,
  }
}
