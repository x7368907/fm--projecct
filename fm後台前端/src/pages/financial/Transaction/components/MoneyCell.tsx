interface MoneyCellProps {
  amount: number
  count: number
}

export default function MoneyCell({ amount, count }: MoneyCellProps) {
  return (
    <div className="flex flex-col items-center justify-center py-1">
      <span
        className={`text-[13px] font-medium tracking-wide ${
          amount < 0 ? 'text-red-500' : 'text-gray-700'
        }`}
      >
        {amount.toLocaleString()}
      </span>
      {/* 筆數顯示藍色且較小 */}
      <span className="text-[11px] font-bold text-blue-600">({count}筆)</span>
    </div>
  )
}
