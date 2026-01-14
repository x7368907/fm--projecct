interface StatusTabsProps {
  activeTab: string
  onTabChange: (key: string) => void
  counts: {
    pending: number
    active: number
    rejected: number
    disabled: number
  }
}

export default function StatusTabs({
  activeTab,
  onTabChange,
  counts,
}: StatusTabsProps) {
  const tabOptions = [
    { label: '待審核', key: '待審核', count: counts.pending },
    { label: '啟用', key: '啟用', count: counts.active },
    { label: '拒絕', key: '拒絕', count: counts.rejected },
    { label: '停用', key: '停用', count: counts.disabled },
  ]

  return (
    <div className="mb-4 flex flex-wrap gap-3">
      {tabOptions.map((item) => {
        const isSelected = activeTab === item.key
        return (
          <div
            key={item.key}
            onClick={() => onTabChange(item.key)}
            className={`cursor-pointer rounded border px-6 py-2 text-sm transition-all ${
              isSelected
                ? 'border-teal-500 bg-white font-bold text-teal-600' // 選中樣式
                : 'border-gray-200 bg-white text-gray-500 hover:border-teal-300 hover:text-teal-500' // 未選中樣式
            }`}
          >
            {item.label} ({item.count})
          </div>
        )
      })}
    </div>
  )
}
