import { useState } from 'react'
import type { HandlerLogData } from '../../components/HandlerModal'
import type { PointsRecord } from '../types'

export const useHandlerLogs = () => {
  const [open, setOpen] = useState(false)
  const [logs, setLogs] = useState<HandlerLogData[]>([])

  const fetchLogs = (record: PointsRecord) => {
    const count = Math.floor(Math.random() * 4) + 1
    const newLogs = Array.from({ length: count })
      .map((_, i) => ({
        key: `${record.key}-${i}`,
        time: '2025-05-20 14:00:00',
        handler: i % 2 === 0 ? 'admin' : 'system',
        status: i === 0 ? '新增' : '修改',
        details: `針對單號 [${record.key}] 的變更紀錄 - ${i + 1}`,
      }))
      .map((log, i) => ({
        ...log,
        status: i === 0 ? '新增' : ('修改' as '新增' | '修改' | '刪除'),
      }))
    setLogs(newLogs)
    setOpen(true)
  }

  return { logs, open, setOpen, fetchLogs }
}
