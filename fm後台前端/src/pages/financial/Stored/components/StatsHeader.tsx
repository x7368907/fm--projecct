// src/pages/Discount/components/StatsHeader.tsx
import { useMemo } from 'react'
import type { DepositDataType } from '../types' // 記得引用型別
// 記得引用型別

interface StatsHeaderProps {
  dataSource: DepositDataType[]
}

export default function StatsHeader({ dataSource }: StatsHeaderProps) {
  // 使用 useMemo 計算總和，避免每次 render 都重算
  const stats = useMemo(() => {
    return dataSource.reduce(
      (acc, curr) => {
        return {
          totalReturn: acc.totalReturn + (curr.returnAmount || 0),
          totalFee: acc.totalFee + (curr.feeAmount || 0),
          totalPayable: acc.totalPayable + (curr.payable || 0),
        }
      },
      { totalReturn: 0, totalFee: 0, totalPayable: 0 }
    )
  }, [dataSource])

  return (
    <div className="flex flex-col items-end gap-1 pb-1 text-xs text-gray-600 lg:flex-row lg:items-center lg:gap-4 lg:text-sm">
      <div className="flex gap-2">
        <span>儲值回饋總計:</span>
        <span className="font-bold text-gray-800">
          {stats.totalReturn.toLocaleString()}
        </span>
      </div>
      <div className="hidden h-3 w-[1px] bg-gray-300 lg:block"></div>
      <div className="flex gap-2">
        <span>儲值手續費總計:</span>
        <span className="font-bold text-gray-800">
          {stats.totalFee.toLocaleString()}
        </span>
      </div>
      <div className="hidden h-3 w-[1px] bg-gray-300 lg:block"></div>
      <div className="flex gap-2 text-sm lg:text-base">
        <span>應付金額總計:</span>
        <span className="font-bold text-red-500">
          {stats.totalPayable.toLocaleString()}
        </span>
      </div>
    </div>
  )
}
