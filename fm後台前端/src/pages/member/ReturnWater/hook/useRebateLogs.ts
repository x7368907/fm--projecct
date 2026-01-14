import { useState } from 'react'
import type { RebateDataType } from '../types'
import type { HandlerLogData } from '../../../AgentList/components/HandlerModal'

export const useRebateLogs = () => {
  const [isLogModalOpen, setIsLogModalOpen] = useState(false)
  const [currentLogs, setCurrentLogs] = useState<HandlerLogData[]>([])

  const showLogs = (record: RebateDataType) => {
    // 模擬 API 回傳資料
    const mockLogs: HandlerLogData[] = [
      {
        key: '101',
        time: '2025-06-02 14:00:00',
        handler: 'System',
        status: '新增',
        details: `系統自動生成返水單 - 會員 ${record.memberName}`,
      },
      {
        key: '102',
        time: '2025-06-02 16:30:00',
        handler: 'Admin01',
        status: '修改',
        details: '調整返水比例至 0.4%',
      },
    ]
    setCurrentLogs(mockLogs)
    setIsLogModalOpen(true)
  }

  const closeLogs = () => setIsLogModalOpen(false)

  return { isLogModalOpen, currentLogs, showLogs, closeLogs }
}
