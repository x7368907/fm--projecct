import { useState } from 'react'
import type { ChangeLineDataType } from '../types'
import type { HandlerLogData } from '../../../AgentList/components/HandlerModal'
import { MOCK_DATA } from '../utils/fakeData'

export const useChangeLine = () => {
  const [viewMode, setViewMode] = useState<'list' | 'create'>('list')
  const [isHandlerModalOpen, setIsHandlerModalOpen] = useState(false)
  const [currentLogs, setCurrentLogs] = useState<HandlerLogData[]>([])
  const [dataSource] = useState<ChangeLineDataType[]>(MOCK_DATA)

  const fetchLogs = (record: ChangeLineDataType) => {
    const mockLogs: HandlerLogData[] = [
      {
        key: '1',
        time: '2025-12-01 10:00:00',
        handler: 'Admin',
        status: '新增',
        details: `建立換線申請：會員 ${record.memberName}`,
      },
      // ... 其他模擬邏輯
    ]
    setCurrentLogs(mockLogs)
    setIsHandlerModalOpen(true)
  }

  return {
    viewMode,
    setViewMode,
    dataSource,
    logState: {
      open: isHandlerModalOpen,
      setOpen: setIsHandlerModalOpen,
      logs: currentLogs,
      fetchLogs,
    },
  }
}
