import { useState } from 'react'
import type { HandlerLogData } from '../../components/HandlerModal'
import type { CommissionData } from '../types'

export const useCommissionLogs = () => {
  const [logs, setLogs] = useState<HandlerLogData[]>([])
  const [open, setOpen] = useState(false)

  const fetchLogs = (record: CommissionData) => {
    const count = Math.floor(Math.random() * 5) + 1

    const newLogs = Array.from({ length: count }).map((_, i) => ({
      key: `${record.key}-${i}`,
      time: '2025-11-26 10:00:00',
      handler: i % 2 === 0 ? 'admin' : 'system',
      status: i === 0 ? '新增' : '修改',
      details: `針對 [${record.name}] 進行了 ${
        i === 0 ? '建立' : '修改'
      } 操作 - 紀錄 ${i + 1}`,
    })) as HandlerLogData[]

    setLogs(newLogs)
    setOpen(true)
  }

  return { logs, open, setOpen, fetchLogs }
}
