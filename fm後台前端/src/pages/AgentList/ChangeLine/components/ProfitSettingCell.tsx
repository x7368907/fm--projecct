import type { ProfitItem } from '../types'

export default function ProfitSettingCell({ items }: { items: ProfitItem[] }) {
  return (
    <div className="text-xs">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="mb-2 border-b border-gray-100 pb-1 last:border-0"
        >
          <div className="font-bold text-gray-700">
            {item.type}{' '}
            <span className="scale-90 text-gray-400">{item.detail}</span>
          </div>
          <div className="text-gray-500">{item.val}</div>
        </div>
      ))}
    </div>
  )
}
