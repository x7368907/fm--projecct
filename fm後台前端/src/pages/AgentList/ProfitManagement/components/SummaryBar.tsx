// SummaryBar.tsx

// 先定義一個 Tab 型別
export type TabValue = 'pending' | 'approved' | 'rejected'

interface Props {
  activeTab: TabValue
  onTabChange: (val: TabValue) => void
  totalAmount: number
  counts: {
    pending: number
    approved: number
    rejected: number
  }
}

export default function SummaryBar({
  activeTab,
  onTabChange,
  totalAmount,
  counts,
}: Props) {
  const tabs: { label: string; value: TabValue; count: number }[] = [
    { label: '待審核', value: 'pending', count: counts.pending },
    { label: '已發放', value: 'approved', count: counts.approved },
    { label: '已拒絕', value: 'rejected', count: counts.rejected },
  ]

  // 下面邏輯維持不變
  return (
    <div className="flex items-center justify-between border-b bg-white p-4">
      <div className="flex flex-wrap gap-3">
        {tabs.map((tab) => {
          const isSelected = activeTab === tab.value
          return (
            <div
              key={tab.value}
              onClick={() => onTabChange(tab.value)}
              className={`cursor-pointer rounded border px-6 py-2 text-sm transition-all ${
                isSelected
                  ? 'border-teal-500 bg-white font-bold text-teal-600'
                  : 'border-gray-200 bg-white text-gray-500 hover:border-teal-300 hover:text-teal-500'
              }`}
            >
              {tab.label} ({tab.count})
            </div>
          )
        })}
      </div>

      <div className="font-bold text-gray-700">
        待審核總計：{' '}
        <span className="text-black">{totalAmount.toLocaleString()}</span>
      </div>
    </div>
  )
}
