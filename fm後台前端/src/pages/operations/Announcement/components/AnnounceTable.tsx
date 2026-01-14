import { useEffect, useRef, useState } from 'react'
import { Table, Button, Dropdown, Tag, Spin } from 'antd'
import { DownOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import type { AnnounceDataType } from '../types'
import type { TabKey } from '../hook/useAnnounce'

interface AnnounceTableProps {
  loading: boolean
  dataSource: AnnounceDataType[]
  activeTab: TabKey
  currentLang: string
  onLangChange: (lang: string) => void
  onEdit: (record: AnnounceDataType) => void
}

const LANGS = ['繁', '簡', '英', '泰', '越']

export default function AnnounceTable({
  loading,
  dataSource,
  activeTab,
  currentLang,
  onLangChange,
  onEdit,
}: AnnounceTableProps) {
  /** ===== 無限滾動狀態 ===== */
  const [list, setList] = useState<AnnounceDataType[]>([])
  const [limit, setLimit] = useState(20)
  const [innerLoading, setInnerLoading] = useState(false)
  const [finished, setFinished] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)

  /** ===== 原本完整 columns（不動） ===== */
  const allColumns: ColumnsType<AnnounceDataType> = [
    { title: '排序', dataIndex: 'key', width: 60, align: 'center' },
    {
      title: '活動類型',
      dataIndex: 'activityType',
      width: 100,
      align: 'center',
    },
    {
      title: '公告類別',
      dataIndex: 'category',
      width: 100,
      align: 'center',
    },
    {
      title: '公告種類',
      dataIndex: 'type',
      width: 100,
      align: 'center',
    },
    {
      title: (
        <div className="flex flex-col gap-2 py-1">
          <span>公告名稱</span>
          <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
            {LANGS.map((lang) => (
              <button
                key={lang}
                onClick={() => onLangChange(lang)}
                className={`flex h-[22px] w-[26px] items-center justify-center rounded-[4px] border text-xs transition-all ${
                  currentLang === lang
                    ? 'border-[#a855f7] bg-[#f3e8ff] font-bold text-[#7e22ce]'
                    : 'border-gray-300 bg-white text-gray-500 hover:border-[#a855f7] hover:text-[#a855f7]'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      ),
      dataIndex: 'name',
      width: 350,
      render: (_, record) => {
        const displayText = record.names?.[currentLang] || record.name
        return (
          <div className="flex flex-col gap-1 py-1">
            <div className="text-[15px] font-medium text-gray-800">
              {displayText}
            </div>
            <div className="text-xs text-gray-400">
              建立者: {record.creator}
            </div>
          </div>
        )
      },
    },
    { title: '公告時間', dataIndex: 'announceTime', width: 170 },
    { title: '開始時間', dataIndex: 'startTime', width: 170 },
    { title: '結束時間', dataIndex: 'endTime', width: 170 },
    {
      title: '公告狀態',
      dataIndex: 'status',
      width: 100,
      align: 'center',
      render: (status) => {
        let color = 'default'
        if (status === '進行中') color = 'success'
        if (status === '準備開始') color = 'warning'
        if (status.includes('強制')) color = 'error'
        return <Tag color={color}>{status}</Tag>
      },
    },
    {
      title: '啟停用',
      dataIndex: 'factoryDisabled',
      width: 80,
      align: 'center',
      render: (disabled) => (
        <span className={disabled ? 'text-red-500' : 'text-gray-500'}>
          {disabled ? '停用' : '啟用'}
        </span>
      ),
    },
    {
      title: '首頁輪播圖\n點擊次數',
      dataIndex: 'pageClicks',
      width: 120,
      align: 'center',
      render: (val) => val?.toLocaleString() || '-',
    },
    {
      title: '活動內頁圖\n點擊次數',
      dataIndex: 'linkClicks',
      width: 120,
      align: 'center',
      render: (val) => val?.toLocaleString() || '-',
    },
    {
      title: '管理',
      key: 'action',
      fixed: 'right',
      width: 90,
      align: 'center',
      render: (_, record) => (
        <Dropdown
          menu={{
            items: [
              {
                key: 'edit',
                label: '編輯',
                icon: <EditOutlined />,
                onClick: () => onEdit(record),
              },
              {
                key: 'delete',
                label: '刪除',
                icon: <DeleteOutlined />,
                danger: true,
              },
            ],
          }}
          trigger={['click']}
        >
          <Button
            size="small"
            className="mx-auto flex items-center justify-center gap-1 text-xs text-gray-600"
          >
            管理 <DownOutlined style={{ fontSize: 10 }} />
          </Button>
        </Dropdown>
      ),
    },
  ]

  /** ===== 原本欄位過濾邏輯（不動） ===== */
  const visibleColumns = allColumns.filter((col: any) => {
    const activityOnlyFields = [
      'category',
      'type',
      'factoryDisabled',
      'pageClicks',
      'linkClicks',
    ]
    if (
      activeTab !== 'activity' &&
      activityOnlyFields.includes(col.dataIndex)
    ) {
      return false
    }
    return true
  })

  const scrollX = activeTab === 'activity' ? 1600 : 1200

  /** ===== 初始化 / dataSource 變動 ===== */
  useEffect(() => {
    setList(dataSource.slice(0, 20))
    setLimit(20)
    setFinished(false)
  }, [dataSource])

  /** ===== 滾動偵測 ===== */
  const handleScroll = () => {
    const el = containerRef.current
    if (!el || innerLoading || finished) return

    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 20) {
      loadMore()
    }
  }

  /** ===== 載入更多 ===== */
  const loadMore = () => {
    setInnerLoading(true)

    setTimeout(() => {
      const newLimit = limit + 20
      const next = dataSource.slice(0, newLimit)

      setList(next)
      setLimit(newLimit)
      setInnerLoading(false)

      if (next.length >= dataSource.length) {
        setFinished(true)
      }
    }, 600)
  }

  return (
    <div className="rounded-lg bg-white shadow-sm">
      <div
        ref={containerRef}
        style={{ maxHeight: 600, overflowY: 'auto' }}
        onScroll={handleScroll}
        className="p-4"
      >
        <Table
          loading={loading}
          columns={visibleColumns}
          dataSource={list}
          scroll={{ x: scrollX }}
          pagination={false}
          rowClassName="align-top"
          // 若之後需要固定表頭
          // sticky
        />

        {innerLoading && (
          <div className="flex justify-center py-3">
            <Spin tip="載入中..." />
          </div>
        )}

        {finished && (
          <div className="py-3 text-center text-sm text-gray-400">
            已無更多資料
          </div>
        )}
      </div>
    </div>
  )
}
