import { useState } from 'react'
import { Modal } from 'antd'

interface BatchModalState {
  open: boolean
  type: 'issue' | 'reject'
  count: number
  totalAmount: number
}

export const useRebateModal = () => {
  const [batchModal, setBatchModal] = useState<BatchModalState>({
    open: false,
    type: 'issue',
    count: 0,
    totalAmount: 0,
  })

  const openBatchModal = (type: 'issue' | 'reject') => {
    // 模擬計算
    const mockCount = 125
    const mockAmount = 999999999
    setBatchModal({
      open: true,
      type,
      count: mockCount,
      totalAmount: mockAmount,
    })
  }

  const closeBatchModal = () =>
    setBatchModal((prev) => ({ ...prev, open: false }))

  const confirmBatch = () => {
    console.log(`確認執行一鍵${batchModal.type === 'issue' ? '發放' : '拒絕'}`)
    closeBatchModal()
  }

  // 將 Modal 的渲染邏輯也包在這裡
  const BatchModal = () => (
    <Modal
      open={batchModal.open}
      title={<div className="pt-6 text-center text-xl font-bold">提醒</div>}
      footer={null}
      onCancel={closeBatchModal}
      width={420}
      centered
      closable={false}
      styles={{
        content: { padding: 0, borderRadius: '8px', overflow: 'hidden' },
      }}
    >
      <div className="px-6 py-8 text-center">
        <p className="mb-4 text-base font-medium text-gray-800">
          請確定是否要
          <span
            className={
              batchModal.type === 'issue' ? 'text-teal-600' : 'text-red-500'
            }
            style={{ margin: '0 4px' }}
          >
            {batchModal.type === 'issue' ? '一鍵發放' : '一鍵拒絕'}
          </span>
          以下返水獎勵：
        </p>
        <div className="space-y-1 text-base text-gray-600">
          <p>
            返水人數：
            <span className="font-bold text-black">{batchModal.count}</span>
          </p>
          <p>
            總計返水獎金：
            <span className="font-bold text-black">
              {batchModal.totalAmount.toLocaleString()}
            </span>
          </p>
        </div>
      </div>

      <div className="flex w-full border-t border-gray-200 bg-gray-50">
        <button
          onClick={closeBatchModal}
          className="flex-1 border-r border-gray-200 py-4 text-base font-bold text-red-500 transition-colors hover:bg-red-50 active:bg-red-100"
          style={{ cursor: 'pointer' }}
        >
          取消
        </button>
        <button
          onClick={confirmBatch}
          className="flex-1 py-4 text-base font-bold text-teal-600 transition-colors hover:bg-teal-50 active:bg-teal-100"
          style={{ cursor: 'pointer' }}
        >
          確定
        </button>
      </div>
    </Modal>
  )

  return { openBatchModal, BatchModal }
}