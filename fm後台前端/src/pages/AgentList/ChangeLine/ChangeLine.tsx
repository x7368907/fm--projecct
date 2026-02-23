import { useState } from 'react'
import { Breadcrumb, ConfigProvider, Card, Input, Select } from 'antd'

// 1. 引入共用元件
import SearchPanel, { type SearchField } from '../../../components/SearchPanel'
import QuickRangePicker from '../../../components/QuickRangePicker'

import ChangeLineCreate from './form/ChangeLineCreate'
import HandlerModal from '../components/HandlerModal'
import ChangeLineTable from './components/ChangeLineTable'

import { useHandlerLogs } from './hooks/useHandlerLogs'

const theme = { token: { colorPrimary: '#14b8a6' } }

export default function ChangeLine() {
  const [view, setView] = useState<'list' | 'create'>('list')
  const { logs, open, setOpen, fetchLogs } = useHandlerLogs()

  // 搜尋欄位
  const searchFields: SearchField[] = [
    {
      label: '原代理級別',
      name: 'sourceLevel',
      colProps: { xs: 24, sm: 12, md: 5 },
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
      label: '原代理名稱',
      name: 'sourceAgentName',
      colProps: { xs: 24, sm: 12, md: 5 },
      render: () => <Input placeholder="請輸入" />,
    },
    {
      label: '換線日期',
      name: 'changeDate',
      colProps: { xs: 24, sm: 24, md: 8 },
      render: () => <QuickRangePicker />,
    },
  ]

  // 設定預設值 (例如每頁筆數預設 20)
  const initialValues = {}

  return (
    <ConfigProvider theme={theme}>
      <div className="min-h-screen bg-gray-50 p-4">
        <Breadcrumb separator=">" className="mb-4">
          <Breadcrumb.Item>營運商管理</Breadcrumb.Item>
          <Breadcrumb.Item
            className={
              view === 'create'
                ? 'cursor-pointer transition-colors hover:text-teal-600'
                : ''
            }
            onClick={() => setView('list')}
          >
            代理換線紀錄
          </Breadcrumb.Item>
          {view === 'create' && <Breadcrumb.Item>新增換線</Breadcrumb.Item>}
        </Breadcrumb>

        {view === 'create' ? (
          <ChangeLineCreate
            onCancel={() => setView('list')}
            onSave={() => setView('list')}
          />
        ) : (
          <>
            {/* 3. 使用共用 SearchPanel */}
            <SearchPanel
              fields={searchFields}
              initialValues={initialValues}
              onCreate={() => setView('create')} // 顯示新增按鈕
              onSearch={fetchLogs} // 顯示搜尋按鈕並綁定事件
            />

            <Card className="shadow-sm">
              <ChangeLineTable onLogs={fetchLogs} />
            </Card>

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
