import { useState } from 'react'
import { ConfigProvider, Breadcrumb, Input, Select } from 'antd'

// 1. 引入共用元件
import SearchPanel, { type SearchField } from '../../../components/SearchPanel'
import QuickRangePicker from '../../../components/QuickRangePicker'

import PointsCreate from './form/PointCreat'
import HandlerModal from '../components/HandlerModal'
import PointsTable from './components/PointsTable'

import { MOCK_DATA } from './mock'
import { useHandlerLogs } from './hooks/useHandlerLogs'

const theme = { token: { colorPrimary: '#14b8a6' } }

export default function PointsDetail() {
  const [view, setView] = useState<'list' | 'create' | 'edit'>('list')

  // 使用 Hook 處理 Modal 與 Log 邏輯
  const { logs, open, setOpen, fetchLogs } = useHandlerLogs()

  // 模擬資料更新 (依需求保留)
  const [, setDataSource] = useState(MOCK_DATA)
  const updateNote = (key: string, val: string) => {
    setDataSource((prev) =>
      prev.map((i) => (i.key === key ? { ...i, remarks: val } : i))
    )
  }

  // 2. 定義搜尋欄位 (全部依序排列，不強制換行)
  const searchFields: SearchField[] = [
    {
      label: '獎勵類型',
      name: 'rewardType',
      colProps: { xs: 24, sm: 12, md: 4 },
      render: () => (
        <Select
          placeholder="請選擇"
          allowClear
          options={[
            { label: '全部', value: 'all' },
            { label: '獎勵點數發放', value: 'reward_add' },
            { label: '信用點數上分', value: 'credit_add' },
            { label: '獎勵點數收回', value: 'reward_deduct' },
            { label: '信用點數收回', value: 'credit_deduct' },
          ]}
        />
      ),
    },
    {
      label: '發放代理級別',
      name: 'agentLevel',
      colProps: { xs: 24, sm: 12, md: 4 },
      render: () => (
        <Select
          placeholder="請選擇代理級別"
          allowClear
          options={[
            { label: '全部', value: 'all' },
            { label: '1級總代理', value: 'lvl1' },
            { label: '2級代理', value: 'lvl2' },
            { label: '3級代理', value: 'lvl3' },
            { label: '4級代理', value: 'lvl4' },
            { label: '5級代理', value: 'lvl5' },
            { label: '6級代理', value: 'lvl6' },
            { label: '7級代理', value: 'lvl7' },
          ]}
        />
      ),
    },
    {
      label: '發放代理名稱',
      name: 'agentName',
      colProps: { xs: 24, sm: 12, md: 4 },
      render: () => <Input placeholder="請輸入" />,
    },
    {
      label: '發放代理',
      name: 'agentAccount',
      colProps: { xs: 24, sm: 12, md: 4 },
      render: () => <Input placeholder="請輸入" />,
    },
    {
      label: '發放時間',
      name: 'dateRange',
      colProps: { xs: 24, sm: 24, md: 8 },
      render: () => <QuickRangePicker />,
    },
  ]

  return (
    <ConfigProvider theme={theme}>
      <div className="min-h-screen bg-gray-50 p-4">
        <Breadcrumb separator=">" className="mb-4">
          <Breadcrumb.Item>營運商管理</Breadcrumb.Item>
          {/* 加入 onClick 讓使用者可以點擊回到列表 */}
          <Breadcrumb.Item
            className={
              view !== 'list'
                ? 'cursor-pointer transition-colors hover:text-teal-600'
                : ''
            }
            onClick={() => setView('list')}
          >
            點數加扣點紀錄
          </Breadcrumb.Item>

          {/* 動態顯示第三層 */}
          {view !== 'list' && (
            <Breadcrumb.Item>
              {view === 'edit' ? '編輯加扣點' : '新增加扣點'}
            </Breadcrumb.Item>
          )}
        </Breadcrumb>

        {view !== 'list' ? (
          <PointsCreate
            onCancel={() => setView('list')}
            onSave={() => setView('list')}
          />
        ) : (
          <>
            {/* 3. 使用共用 SearchPanel */}
            <SearchPanel
              fields={searchFields}
              onCreate={() => setView('create')}
              onSearch={fetchLogs}
            />

            <PointsTable onUpdateNote={updateNote} onLogs={fetchLogs} />

            <HandlerModal
              open={open}
              onCancel={() => setOpen(false)}
              logs={logs}
            />
          </>
        )}
      </div>
    </ConfigProvider>
  )
}
