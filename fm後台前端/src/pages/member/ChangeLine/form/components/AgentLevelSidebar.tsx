import { MOCK_LEVELS } from '../../utils/fakeData'

export default function AgentLevelSidebar() {
  return (
    <div className="flex h-full flex-col gap-1 overflow-y-auto bg-white p-2">
      {MOCK_LEVELS.map((lvl) => (
        <div
          key={lvl.label}
          className="flex cursor-pointer items-center justify-between rounded border border-transparent px-2 py-2 text-xs text-gray-600 hover:border-orange-300 hover:bg-orange-50"
        >
          <span>{lvl.label}</span>
          <span className="rounded bg-orange-100 px-1 text-xs text-orange-500">
            {lvl.count}
          </span>
        </div>
      ))}
    </div>
  )
}
