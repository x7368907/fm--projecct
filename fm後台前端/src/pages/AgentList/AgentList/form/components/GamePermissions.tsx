import { Card, Checkbox } from 'antd'
import { useState } from 'react'

const GAME_PROVIDERS = [
  {
    category: '真人',
    providers: [
      'DG (0%)',
      '歐博 (0%)',
      'MT (0%)',
      'T9 (0%)',
      'DB (0%)',
      'SA (0%)',
      'WM (0%)',
      'RG (0%)',
    ],
  },
  {
    category: '電子',
    providers: [
      'ATG (22%)',
      'QT (0%)',
      'FM (0%)',
      'RSG (0%)',
      'BNG (0%)',
      'BT (0%)',
      'FG (0%)',
      '愛發 (0%)',
      'CG (0%)',
      'GB (0%)',
    ],
  },
  {
    category: '體育',
    providers: ['Super (0%)', 'WG (0%)', 'DB (0%)'],
  },
  {
    category: '彩票',
    providers: ['9K (0%)', 'WG (0%)', 'DB (0%)', 'MT (0%)'],
  },
  {
    category: '棋牌',
    providers: [
      'FM (0%)',
      '好路 (0%)',
      '高登 (0%)',
      'FG (0%)',
      '百勝 (0%)',
      'DB (0%)',
    ],
  },
  {
    category: '捕魚',
    providers: ['BT (0%)', '愛發 (0%)'],
  },
]

export default function GamePermissions() {
  const [checkedMap, setCheckedMap] = useState<Record<string, string[]>>({})

  // 切換子遊戲
  const onProviderChange = (
    category: string,
    provider: string,
    checked: boolean
  ) => {
    setCheckedMap((prev) => {
      const current = prev[category] || []

      return {
        ...prev,
        [category]: checked
          ? [...current, provider]
          : current.filter((p) => p !== provider),
      }
    })
  }

  // 切換該類別全部
  const onCategoryCheck = (
    category: string,
    providers: string[],
    checked: boolean
  ) => {
    setCheckedMap((prev) => ({
      ...prev,
      [category]: checked ? [...providers] : [],
    }))
  }

  return (
    <Card
      title="禁止遊戲"
      className="mb-4 shadow-sm"
      headStyle={{ background: '#fafafa' }}
    >
      <div className="space-y-3">
        {GAME_PROVIDERS.map((group) => {
          const checkedProviders = checkedMap[group.category] || []
          const allChecked = checkedProviders.length === group.providers.length
          const isIndeterminate =
            checkedProviders.length > 0 &&
            checkedProviders.length < group.providers.length

          return (
            <div
              key={group.category}
              className="flex items-start border-b pb-2 last:border-b-0"
            >
              {/* 左側主類別 */}
              <div className="flex w-24 items-start pt-1 font-bold text-gray-700">
                <Checkbox
                  indeterminate={isIndeterminate}
                  checked={allChecked}
                  onChange={(e) =>
                    onCategoryCheck(
                      group.category,
                      group.providers,
                      e.target.checked
                    )
                  }
                />
                <span className="ml-2">{group.category}</span>
              </div>

              {/* 子項目 */}
              <div className="flex flex-1 flex-wrap gap-2">
                {group.providers.map((provider) => (
                  <Checkbox
                    key={provider}
                    className="ml-0 text-xs text-gray-600"
                    checked={checkedProviders.includes(provider)}
                    onChange={(e) =>
                      onProviderChange(
                        group.category,
                        provider,
                        e.target.checked
                      )
                    }
                  >
                    {provider}
                  </Checkbox>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
