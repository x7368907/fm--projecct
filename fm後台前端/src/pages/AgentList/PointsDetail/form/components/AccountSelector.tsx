import { Input, Tag, Checkbox } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import type { LevelData, AccountData } from '../../types'

interface AccountSelectorProps {
  levels: LevelData[]
  issuers: AccountData[]
  receivers: AccountData[]
  selectedLevel: string
  onSelectLevel: (id: string) => void
  selectedIssuer: string | null
  onSelectIssuer: (id: string) => void
  selectedReceivers: string[]
  onReceiverChange: (id: string, checked: boolean) => void
  onSelectAllReceivers: (e: CheckboxChangeEvent) => void
}

export default function AccountSelector({
  levels,
  issuers,
  receivers,
  selectedLevel,
  onSelectLevel,
  selectedIssuer,
  onSelectIssuer,
  selectedReceivers,
  onReceiverChange,
  onSelectAllReceivers,
}: AccountSelectorProps) {
  // 計算全選狀態
  const totalReceivers = receivers.length
  const selectedCount = selectedReceivers.length
  const isAllSelected = totalReceivers > 0 && selectedCount === totalReceivers
  const isIndeterminate = selectedCount > 0 && selectedCount < totalReceivers

  return (
    <div className="flex h-[400px] overflow-hidden rounded border border-gray-300">
      {/* 1. 左側：代理級別 */}
      <div className="flex w-1/4 flex-col border-r border-gray-300 bg-gray-50">
        <div className="border-b border-gray-300 bg-gray-200 p-2 text-center text-xs font-bold text-gray-700">
          代理級別
        </div>
        <div className="flex-1 overflow-y-auto">
          {levels.map((lvl) => (
            <div
              key={lvl.id}
              onClick={() => onSelectLevel(lvl.id)}
              className={`flex cursor-pointer items-center justify-between border-b border-gray-100 px-4 py-3 text-sm transition-colors ${
                selectedLevel === lvl.id
                  ? 'border-l-4 border-l-teal-600 bg-white font-bold text-teal-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span>{lvl.name}</span>
              <Tag color="orange" className="mr-0">
                {lvl.count}
              </Tag>
            </div>
          ))}
        </div>
      </div>

      {/* 2. 中間：發放點數 */}
      <div className="flex w-2/5 flex-col border-r border-gray-300">
        <div className="border-b border-gray-300 bg-gray-200 p-2 text-center text-xs font-bold text-gray-700">
          發放點數
        </div>
        <div className="border-b border-gray-200 p-2">
          <Input
            prefix={<SearchOutlined />}
            placeholder="請輸入代理名稱"
            size="small"
          />
        </div>
        <div className="flex justify-between border-b bg-gray-50 px-3 py-1 text-xs text-gray-500">
          <span>名稱</span>
          <span>帳戶餘額</span>
        </div>
        <div className="flex-1 overflow-y-auto">
          {issuers.map((issuer) => (
            <div
              key={issuer.id}
              onClick={() => onSelectIssuer(issuer.id)}
              className={`flex cursor-pointer items-center justify-between border-b border-gray-100 px-3 py-3 text-sm transition-colors ${
                selectedIssuer === issuer.id
                  ? 'bg-orange-50'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2 truncate pr-2">
                <span
                  className={`truncate ${selectedIssuer === issuer.id ? 'font-bold text-orange-600' : 'text-gray-700'}`}
                >
                  {issuer.name}
                </span>
                <Tag color="orange" className="mr-0 origin-left scale-75">
                  {issuer.count}
                </Tag>
              </div>
              <span className="font-mono text-gray-600">{issuer.balance}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. 右側：接收點數 */}
      <div className="flex w-2/5 flex-col bg-white">
        <div className="border-b border-gray-300 bg-gray-200 p-2 text-center text-xs font-bold text-gray-700">
          接收點數
        </div>
        <div className="space-y-2 border-b border-gray-200 p-2">
          <Input
            prefix={<SearchOutlined />}
            placeholder="請輸入代理名稱"
            size="small"
          />
          <div className="text-xs font-bold text-gray-700">
            1級總代理 &gt; 2級代理(8)
          </div>
        </div>
        <div className="flex items-center justify-between border-b bg-gray-50 px-3 py-2 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <Checkbox
              onChange={onSelectAllReceivers}
              checked={isAllSelected}
              indeterminate={isIndeterminate}
            />
            <span className="font-bold text-gray-600">
              ({selectedCount}/{totalReceivers})
            </span>
            <span className="ml-1 font-bold text-gray-600">名稱</span>
          </div>
          <span className="font-bold text-gray-600">帳戶餘額</span>
        </div>
        <div className="flex-1 overflow-y-auto">
          {receivers.map((receiver) => (
            <div
              key={receiver.id}
              className="flex items-center justify-between border-b border-gray-100 px-3 py-3 text-sm hover:bg-gray-50"
            >
              <div className="flex flex-1 items-center gap-2 truncate pr-2">
                <Checkbox
                  checked={selectedReceivers.includes(receiver.id)}
                  onChange={(e) =>
                    onReceiverChange(receiver.id, e.target.checked)
                  }
                />
                <span className="truncate text-gray-700" title={receiver.name}>
                  {receiver.name}
                </span>
                <Tag color="orange" className="mr-0 origin-left scale-75">
                  {receiver.count}
                </Tag>
              </div>
              <span className="font-mono text-gray-600">
                {receiver.balance}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
