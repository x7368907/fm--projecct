import { Space } from 'antd'
import { PROVIDERS } from '../utils/fakeData'

interface Props {
  selected: string
  onSelect: (code: string) => void
}

export default function ProviderList({ selected, onSelect }: Props) {
  return (
    <div className="mb-2 overflow-x-auto pb-2">
      <Space size={8}>
        {PROVIDERS.map((p) => (
          <div
            key={p.code}
            onClick={() => onSelect(p.code)}
            className={`flex cursor-pointer flex-col items-center justify-center rounded border px-4 py-2 transition-all ${
              selected === p.code
                ? 'border-teal-500 bg-teal-50 text-teal-700 shadow-sm'
                : 'border-gray-200 bg-white text-gray-500 hover:border-teal-300 hover:text-teal-600'
            } `}
            style={{ minWidth: '80px' }}
          >
            <span className="text-xs font-bold">{p.code}</span>
            <span className="text-[10px] text-gray-400">({p.count})</span>
          </div>
        ))}
      </Space>
    </div>
  )
}
