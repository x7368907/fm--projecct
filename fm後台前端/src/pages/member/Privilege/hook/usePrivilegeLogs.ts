import { useState } from 'react'
import type { PrivilegeDataType } from '../types'
import type { HandlerLogData } from '../../../AgentList/components/HandlerModal'

export const usePrivilegeLogs = () => {
  const [isHandlerModalOpen, setIsHandlerModalOpen] = useState(false)
  const [currentLogs, setCurrentLogs] = useState<HandlerLogData[]>([])

  const fetchLogs = (record: PrivilegeDataType) => {
    const randomCount = Math.floor(Math.random() * 5) + 1
    const statusOptions: HandlerLogData['status'][] = ['新增', '修改', '刪除']

    const newLogs: HandlerLogData[] = Array.from({ length: randomCount }).map(
      (_, i) => ({
        key: `${record.key}-${i}`,
        time: '2025-12-01 15:30:00',
        handler: i % 2 === 0 ? 'admin' : 'system',
        status: statusOptions[i % 3],
        details: `針對會員 [${record.account}] ${record.name} 的特權資料變更 - ${i + 1}`,
      })
    )

    setCurrentLogs(newLogs)
    setIsHandlerModalOpen(true)
  }

  const closeLogs = () => setIsHandlerModalOpen(false)

  return { isHandlerModalOpen, currentLogs, fetchLogs, closeLogs }
}
