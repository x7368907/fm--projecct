import { useState } from 'react'
import type { HandlerLogData } from '../../components/HandlerModal'
import type { DataType } from '../types'

export const useHandlerLogs = () => {
  const [open, setOpen] = useState(false)
  const [logs, setLogs] = useState<HandlerLogData[]>([])

  const fetchLogs = (record: DataType) => {
    const count = Math.floor(Math.random() * 5) + 1

    const result = Array.from({ length: count })
      .map((_, i) => ({
        key: `${record.key}-${i}`,
        time: '2025-05-20 14:00:00',
        handler: i % 2 === 0 ? 'admin' : 'system',
        status: i === 0 ? '新增' : '修改',
        details: `針對代理 [${record.name}] 的欄位變更紀錄 - ${i + 1}`,
      }))
      .map((item) => ({
        ...item,
        status: item.status as HandlerLogData['status'],
      }))

    setLogs(result)
    setOpen(true)
  }

  return {
    logs,
    open,
    setOpen,
    fetchLogs,
  }
}
