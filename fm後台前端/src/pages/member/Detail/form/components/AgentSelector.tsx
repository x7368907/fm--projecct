import { Input } from 'antd'

export default function AgentSelector() {
  const levels = [
    { name: '1級總代理', count: 38 },
    { name: '2級代理', count: 63, active: true },
    { name: '3級代理', count: 88 },
    { name: '4級代理', count: 104 },
    { name: '5級代理', count: 2352 },
    { name: '6級代理', count: 11258 },
    { name: '7級代理', count: 596251 },
  ]
  const agents = [
    { name: 'FMCA04 (主站-代理)', count: 12, active: true },
    { name: 'test123456 (測試-doin人員)', count: 7 },
    { name: 'FB01 (金流/成數代理-廣告線)Fb01', count: 5 },
    { name: 'fb02 (金流/成數代理-廣告線)Fb02', count: 6 },
    { name: 'testfmcs 測試-客服', count: 4 },
  ]

  return (
    <div className="flex h-[250px] rounded-sm border border-gray-300 text-xs">
      {/* 左側：代理級別 */}
      <div className="flex w-[130px] flex-col border-r border-gray-300">
        <div className="bg-gray-300 p-2 text-center font-bold text-gray-800">
          代理級別
        </div>
        <div className="flex-1 overflow-y-auto bg-white">
          {levels.map((lvl) => (
            <div
              key={lvl.name}
              className={`flex cursor-pointer items-center justify-between border-b border-gray-100 p-2 px-3 ${
                lvl.active ? 'bg-gray-100' : 'bg-white'
              }`}
            >
              <span>{lvl.name}</span>
              <span className="rounded bg-orange-400 px-1.5 text-[10px] font-bold text-white">
                {lvl.count}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* 右側：代理名稱 */}
      <div className="flex flex-1 flex-col">
        <div className="bg-gray-300 p-2 text-center font-bold text-gray-800">
          代理名稱
        </div>
        <div className="border-b border-gray-100 p-2">
          <Input placeholder="請輸入代理名稱" size="small" />
        </div>
        <div className="flex-1 overflow-y-auto">
          {agents.map((agent) => (
            <div
              key={agent.name}
              className={`flex cursor-pointer items-center justify-between border-b border-gray-100 p-2 px-3 ${
                agent.active ? 'bg-gray-100' : 'bg-white'
              }`}
            >
              <span>{agent.name}</span>
              {agent.count > 0 && (
                <span className="rounded-[10px] bg-orange-400 px-1.5 text-[10px] text-white">
                  {agent.count}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
