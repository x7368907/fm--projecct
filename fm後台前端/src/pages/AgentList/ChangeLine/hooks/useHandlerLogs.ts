import { useState } from 'react'
import type { HandlerLogData } from '../../components/HandlerModal'
import type { ChangeLineDataType } from '../types'

export const useHandlerLogs = () => {
  const [open, setOpen] = useState(false)
  const [logs, setLogs] = useState<HandlerLogData[]>([])

  const fetchLogs = (record: ChangeLineDataType) => {
    const count = Math.floor(Math.random() * 4) + 1

    const newLogs = Array.from({ length: count }).map(
      (_, i) =>
        ({
          key: `${record.key}-${i}`,
          time: '2025-05-20 14:00:00',
          handler: i % 2 === 0 ? 'admin' : 'system',
          status: i === 0 ? '新增' : '修改',
          details: `變更紀錄 - ${i + 1}`,
        }) as HandlerLogData
    )

    setLogs(newLogs)
    setOpen(true)
  }

  return {
    logs,
    open,
    setOpen,
    fetchLogs,
  }
}
