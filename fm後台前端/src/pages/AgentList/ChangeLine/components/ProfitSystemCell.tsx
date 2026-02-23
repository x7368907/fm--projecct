import type { ProfitSystemItem } from '../types'

export default function ProfitSystemCell({
  items,
}: {
  items: ProfitSystemItem[]
}) {
  return (
    <div className="flex flex-col items-center text-sm">
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1

        return (
          <div key={idx} className="flex flex-col items-center">
            <div className="text-center">
              <div className="font-medium text-gray-700">{item.title}</div>
              {item.detail && (
                <div className="text-xs text-gray-400">{item.detail}</div>
              )}
            </div>

            {!isLast && (
              <div className="my-1 leading-none text-gray-300">↓</div>
            )}
          </div>
        )
      })}
    </div>
  )
}
