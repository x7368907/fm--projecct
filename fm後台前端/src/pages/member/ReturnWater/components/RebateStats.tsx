import { Button, Typography } from 'antd'
import { ReloadOutlined } from '@ant-design/icons'

const { Text } = Typography

interface RebateStatsProps {
  activeProvider: string
  setActiveProvider: (key: string) => void
  activeTimeProvider: string
  setTimeProvider: (key: string) => void
  onBatchIssue: () => void
  onBatchReject: () => void
  totalAmount: number
}

export default function RebateStats({
  activeProvider,
  setActiveProvider,
  activeTimeProvider,
  setTimeProvider,
  onBatchIssue,
  onBatchReject,
  totalAmount,
}: RebateStatsProps) {
  const providerStats = [
    { label: '全部', key: '全部', count: 100 },
    { label: 'ATG', key: 'ATG', count: 50 },
    { label: 'QT', key: 'QT', count: 0 },
    { label: 'FM', key: 'FM', count: 30 },
    { label: 'RSG', key: 'RSG', count: 20 },
    { label: 'BNG', key: 'BNG', count: 0 },
    { label: 'BT', key: 'BT', count: 20 },
    { label: 'FG', key: 'FG', count: 0 },
    { label: '愛發', key: '愛發', count: 20 },
    { label: 'CG', key: 'CG', count: 0 },
    { label: 'GB', key: 'CB', count: 0 },
  ]

  const timeStats = [
    { label: '時', key: '時' },
    { label: '週', key: '週' },
    { label: '日', key: '日' },
  ]

  return (
    <div className="mb-4 flex flex-wrap items-start justify-between">
      <div>
        {/* 遊戲商篩選 */}
        <div className="flex flex-wrap gap-2 pb-2">
          {providerStats.map((item) => (
            <Button
              key={item.key}
              type={activeProvider === item.key ? 'primary' : 'default'}
              onClick={() => setActiveProvider(item.key)}
              className="h-auto px-2 py-3 text-center"
            >
              <div className="text-sm">{item.label}</div>
              <div className="text-xs opacity-80">({item.count})</div>
            </Button>
          ))}
        </div>
        {/* 時間維度篩選 */}
        <div className="flex gap-2">
          {timeStats.map((item) => (
            <Button
              key={item.key}
              type={activeTimeProvider === item.key ? 'primary' : 'default'}
              onClick={() => setTimeProvider(item.key)}
              className="h-auto px-2 py-3 text-center"
            >
              <div className="text-sm">{item.label}</div>
            </Button>
          ))}
        </div>
      </div>

      <div className="text-right">
        <div className="mb-2">
          <Text strong>返水獎金總計：</Text>
          <Text className="text-xl font-bold text-red-600">
            {totalAmount.toLocaleString()}
          </Text>
        </div>
        <div className="flex justify-end gap-2">
          <Button onClick={onBatchIssue}>一鍵發放</Button>
          <Button danger onClick={onBatchReject}>
            一鍵拒絕
          </Button>
          <Button icon={<ReloadOutlined />}>重新整理</Button>
        </div>
      </div>
    </div>
  )
}
