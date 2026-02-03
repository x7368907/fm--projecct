import { useState } from 'react'
import { message } from 'antd'
import type { CommissionData } from '../types'
import type { HandlerLogData } from '../../components/HandlerModal'
import { commissionLogs } from '../../../../api/commission'

const ACTION_LABEL: Record<string, string> = {
  create: '新增',
  update: '修改',
  delete: '刪除',
}

const FIELD_LABEL: Record<string, string> = {
  system_type: '代理制度',
  name: '分潤名稱',
  agent_level: '代理層級',
  agent_name: '代理名稱',
  share_ratio: '代理佔成比例(%)',
  settlement: '代理分潤結算',
  rebate_live: '真人返水(%)',
  rebate_elec: '電子返水(%)',
  rebate_sport: '體育返水(%)',
  rebate_lottery: '彩票返水(%)',
  rebate_chess: '棋牌返水(%)',
  rebate_fish: '捕魚返水(%)',
}

const SYSTEM_LABEL: Record<string, string> = {
  share: '佔成制',
  rebate: '返水制',
}

const SETTLEMENT_LABEL: Record<string, string> = {
  daily: '日結',
  weekly: '週結',
  monthly: '月結',
  week: '週結', // 兼容你前端可能送 week/month
  month: '月結',
}

function tryParseJson(s: string): any | null {
  try {
    return JSON.parse(s)
  } catch {
    return null
  }
}

function normalizeValue(field: string, v: any) {
  if (v === null || v === undefined || v === '') return '—'
  if (field === 'system_type') return SYSTEM_LABEL[String(v)] ?? String(v)
  if (field === 'settlement') return SETTLEMENT_LABEL[String(v)] ?? String(v)
  return String(v)
}

function formatDetails(details: string) {
  const obj = tryParseJson(details)

  // 1) update：{ changes: { field: {old,new}, ... } }
  const changes = obj?.changes
  if (changes && typeof changes === 'object') {
    const lines = Object.entries(changes).map(([field, pair]: any) => {
      const label = FIELD_LABEL[field] ?? field
      const oldV = normalizeValue(field, pair?.old)
      const newV = normalizeValue(field, pair?.new)
      return `${label}：${oldV} → ${newV}`
    })
    return lines.join('；')
  }

  // 2) create：{ created: {...} } / delete：{ deleted: {...} }
  if (obj?.created) return '建立分潤設定'
  if (obj?.deleted) return '刪除分潤設定'

  // 3) fallback：不是 JSON 就原樣
  return details
}

function formatTime(iso: string) {
  if (!iso) return ''
  // 2026-02-03T02:54:38 -> 2026-02-03 02:54:38
  return iso.replace('T', ' ').split('.')[0]
}

export function useCommissionLogs() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [logs, setLogs] = useState<HandlerLogData[]>([])
  const [planName, setPlanName] = useState('')

  const fetchLogs = async (record: CommissionData) => {
    if (!record?.id) {
      message.error('找不到方案 id')
      return
    }

    setOpen(true)
    setLoading(true)
    setLogs([])
    setPlanName(record.name ?? '')

    try {
      const res = await commissionLogs(record.id)
      const list = res?.data ?? []

      const mapped: HandlerLogData[] = (Array.isArray(list) ? list : []).map(
        (x: any, idx: number) => ({
          key: String(x.id ?? idx),
          time: formatTime(x.created_at ?? x.time ?? ''),
          handler: x.handler ?? 'system',
          status: ACTION_LABEL[x.action] ?? x.action ?? '修改',
          details: formatDetails(x.details ?? ''),
        })
      )

      setLogs(mapped)
    } catch (e) {
      console.log(e)
      message.error('取得經手人紀錄失敗')
      setLogs([])
    } finally {
      setLoading(false)
    }
  }

  return { open, setOpen, loading, logs, planName, fetchLogs }
}
