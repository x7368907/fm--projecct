import type { ColumnsType } from 'antd/es/table'
import { Tag } from 'antd'
import ActionDropdown from './components/ActionDropdown'
import type { DataType } from './types'

export const getColumns = (opts: {
  onEdit: (record: DataType) => void
  onLogs: (record: DataType) => void
  onViewFrontend: (record: DataType) => void
  onPoints: (record: DataType) => void
  onLevelClick: (record: DataType) => void
}): ColumnsType<DataType> => [
  /* ================= 代理級別（重點欄位） ================= */
  {
    title: '代理級別',
    width: 110,
    render: (_, record) => {
      const { currentLevel, maxLevel, childCount } = record

      const isMaxLevel = currentLevel >= maxLevel
      const canGoNext = !isMaxLevel && childCount > 0

      const text =
        childCount > 0
          ? `${currentLevel}/${maxLevel}(${childCount})`
          : `${currentLevel}/${maxLevel}`

      return (
        <span
          onClick={() => canGoNext && opts.onLevelClick(record)}
          className={
            canGoNext
              ? 'cursor-pointer text-blue-600 underline'
              : 'cursor-default text-black'
          }
        >
          {text}
        </span>
      )
    },
  },

  /* ================= 基本資料 ================= */
  { title: '代理名稱', dataIndex: 'name', width: 140, align: 'center' },

  {
    title: '會員數量',
    dataIndex: 'memberCount',
    width: 90,
    align: 'center',
  },

  { title: '代理帳號', dataIndex: 'account', width: 130, align: 'center' },
  { title: '代理姓名', dataIndex: 'realName', width: 100, align: 'center' },

  {
    title: '帳號狀態',
    dataIndex: 'status',
    width: 100,
    align: 'center',
    render: (text) => (
      <Tag color={text === '啟用' ? 'green' : 'red'}>{text}</Tag>
    ),
  },

  { title: '金流群組', dataIndex: 'cashGroup', width: 120, align: 'center' },

  {
    title: '註冊 / 登入時間',
    dataIndex: 'registerTime',
    width: 180,
    align: 'center',
    render: (_, record) => (
      <div className="text-xs leading-5">
        <div>{record.registerTime}</div>
        <div className="text-gray-400">{record.lastLoginTime}</div>
      </div>
    ),
  },

  /* ================= 分潤 ================= */
  { title: '分潤制度', dataIndex: 'profitSystem', width: 100, align: 'center' },
  {
    title: '分潤比例 (%)',
    dataIndex: 'profitRate',
    width: 110,
    align: 'center',
  },

  { title: '真人 (%)', dataIndex: 'liveRate', width: 90, align: 'center' },
  { title: '電子 (%)', dataIndex: 'slotRate', width: 90, align: 'center' },
  { title: '體育 (%)', dataIndex: 'sportRate', width: 90, align: 'center' },
  { title: '彩票 (%)', dataIndex: 'lotteryRate', width: 90, align: 'center' },
  { title: '棋牌 (%)', dataIndex: 'chessRate', width: 90, align: 'center' },
  { title: '漁機 (%)', dataIndex: 'fishRate', width: 90, align: 'center' },

  /* ================= 結算 ================= */
  {
    title: '代理分潤結算',
    dataIndex: 'settlement',
    width: 160,
    align: 'center',
    render: (text) => (
      <div className="text-xs leading-5">
        <div>{text}</div>
        <div className="text-gray-400">(每週日 23:59:59)</div>
      </div>
    ),
  },

  /* ================= 操作 ================= */
  {
    title: '管理',
    fixed: 'right',
    width: 100,
    render: (_, record) => (
      <ActionDropdown
        record={record}
        onEdit={opts.onEdit}
        onLogs={opts.onLogs}
        onViewFrontend={opts.onViewFrontend}
        onPoints={opts.onPoints}
      />
    ),
  },
]
