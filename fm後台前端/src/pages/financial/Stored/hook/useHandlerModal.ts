// src/pages/Discount/hooks/useHandlerModal.ts
import { useState } from 'react'
// 假設 HandlerLogData 是從共用元件定義的，或是你在 types.ts 定義
import { type HandlerLogData } from '../../../AgentList/components/HandlerModal'
import type { DepositDataType } from '../types'

export function useHandlerModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [logs, setLogs] = useState<HandlerLogData[]>([])

  const openModal = (record: DepositDataType) => {
    console.log('讀取日誌:', record.memberName)

    // 模擬 API 請求延遲
    // 實務上這裡會是 async/await 呼叫 fetchLogsAPI(record.id)
    const mockLogs: HandlerLogData[] = [
      {
        key: 'log-1',
        time: '2025-06-06 16:10:00',
        handler: 'admin',
        status: '審核',
        details: '變更狀態: 待審核 -> 通過',
      },
      {
        key: 'log-2',
        time: '2025-06-06 16:09:15',
        handler: 'system',
        status: '申請',
        details: `會員 ${record.memberName} 提交儲值申請 $${record.amount}`,
      },
    ]

    setLogs(mockLogs)
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
    setLogs([]) // 關閉時清空，避免下次打開閃爍舊資料
  }

  return {
    isOpen,
    logs,
    openModal,
    closeModal,
  }
}
