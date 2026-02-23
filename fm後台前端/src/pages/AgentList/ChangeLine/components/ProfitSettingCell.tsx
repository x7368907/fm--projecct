import type { ProfitItem } from '../types'

export default function ProfitSettingCell({ items }: { items: ProfitItem[] }) {
  return (
    <div className="text-center text-xs">
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1

        return (
          <div key={idx} className="flex flex-col items-center">
            {/* 規則本體 */}
            <div className="mb-1 w-full">
              <div className="font-bold text-gray-700">
                {item.type}{' '}
                <span className="scale-90 text-gray-400">{item.detail}</span>
              </div>
              <div className="text-gray-500">{item.val}</div>
            </div>

            {/* ↓ 箭頭（只有不是最後一筆才顯示） */}
            {!isLast && (
              <div className="my-1 text-sm leading-none text-gray-300">↓</div>
            )}
          </div>
        )
      })}
    </div>
  )
}
