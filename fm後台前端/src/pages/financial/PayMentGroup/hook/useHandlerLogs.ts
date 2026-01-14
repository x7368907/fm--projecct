import { useState } from 'react'
import type { GroupDataType } from '../types'
// 引用共用元件的型別
import type { HandlerLogData } from '../../../AgentList/components/HandlerModal'

export function useHandlerLogs() {
  const [isOpen, setIsOpen] = useState(false)
  const [logs, setLogs] = useState<HandlerLogData[]>([])

  const fetchLogs = (record: GroupDataType) => {
    console.log('正在讀取日誌:', record.name)
    // 模擬 API 回傳
    const mockLogs: HandlerLogData[] = [
      {
        key: 'log-1',
        time: '2025-12-30 14:20:00',
        handler: 'admin',
        status: '修改',
        details: '修改手續費設定: 3% -> 4%',
      },
      {
        key: 'log-2',
        time: '2025-12-29 10:00:00',
        handler: 'system',
        status: '新增',
        details: `建立金流群組: ${record.name}`,
      },
    ]
    setLogs(mockLogs)
    setIsOpen(true)
  }

  const closeLogs = () => setIsOpen(false)

  return {
    isOpen,
    logs,
    fetchLogs,
    closeLogs,
  }
}
