interface StatusTabsProps {
  statusFilter: string
  onStatusChange: (status: string) => void
  counts: {
    pending: number
    active: number
    rejected: number
  }
}

export default function StatusTabs({
  statusFilter,
  onStatusChange,
  counts,
}: StatusTabsProps) {
  const StatusButton = ({
    label,
    value,
    count,
  }: {
    label: string
    value: string
    count: number
  }) => {
    const isSelected = statusFilter === value
    return (
      <div
        onClick={() => onStatusChange(value)}
        className={`relative bottom-[-1px] z-[2] mr-1 inline-flex h-10 min-w-[100px] cursor-pointer items-center justify-center rounded-t border bg-white px-3 transition-colors ${
          isSelected
            ? 'border-teal-500 font-bold text-teal-600'
            : 'border-gray-200 text-gray-500 hover:text-gray-700'
        }`}
      >
        {label} <span className="ml-1">({count})</span>
      </div>
    )
  }

  return (
    <div className="mb-4 pl-2">
      <StatusButton label="待審核" value="pending" count={counts.pending} />
      <StatusButton label="已派發" value="active" count={counts.active} />
      <StatusButton label="已拒絕" value="rejected" count={counts.rejected} />
    </div>
  )
}
