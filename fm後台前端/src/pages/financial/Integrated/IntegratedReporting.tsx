import { useState, useMemo } from 'react'
import {
  Tabs,
  Breadcrumb,
  Form,
  Radio,
  Select,
  Space,
  Input,
  ConfigProvider,
} from 'antd'
import SearchPanel, { type SearchField } from '../../../components/SearchPanel'
import QuickRangePicker from '../../../components/QuickRangePicker'

import CompanyTable from './tabs/Company/CompanyTable'
import AgentTable from './tabs/Agent/AgentTable'
import MemberTable from './tabs/Member/MemberTable'
import BetTypeTable from './tabs/BetType/BetTypeTable'
const themeConfig = { token: { colorPrimary: '#14b8a6' } }
export default function IntegratedReporting() {
  const [activeTab, setActiveTab] = useState('company')
  const [searchParams, setSearchParams] = useState<any>({})

  // 使用 useMemo 來根據 activeTab 動態產生搜尋欄位
  const searchFields = useMemo(() => {
    return [
      {
        label: (
          <div className="flex items-center gap-3">
            <span>代理級別</span>
            <div onClick={(e) => e.stopPropagation()} className="font-normal">
              <Form.Item name="settlementType" initialValue="general" noStyle>
                <Radio.Group>
                  <Radio value="general">總代交收</Radio>
                  <Radio value="individual">個別交收</Radio>
                </Radio.Group>
              </Form.Item>
            </div>
          </div>
        ),
        name: 'agentLevel',
        colProps: { xs: 24, md: 10, lg: 6, xl: 5 },
        render: () => (
          <Space
            direction="vertical"
            size={2}
            className="mt-1 w-full items-start"
          >
            <Select
              placeholder="請選擇"
              options={[
                { label: '總代理', value: 'all' },
                { label: '1級總代理', value: 'level1' },
              ]}
              className="w-full"
            />
          </Space>
        ),
      },
      {
        label: '代理名稱',
        name: 'agentName',
        colProps: { xs: 24, md: 8, lg: 5, xl: 4 },
        render: () => <Input placeholder="請輸入" />,
      },
      // 【修改】當 Tab 是 'member' 或 'betType' 時，都顯示會員姓名
      ...(activeTab === 'member' || activeTab === 'betType'
        ? [
            {
              label: '會員姓名',
              name: 'memberName',
              colProps: { xs: 24, md: 8, lg: 5, xl: 4 },
              render: () => <Input placeholder="請輸入" />,
            } as SearchField,
          ]
        : []),
      {
        label: '報表時間',
        name: 'dateRange',
        colProps: { xs: 24, md: 24, lg: 10, xl: 10 },
        render: () => <QuickRangePicker />,
      },
      {
        label: '每頁顯示',
        name: 'pageSize',
        colProps: { xs: 12, md: 4, lg: 3, xl: 2 },
        render: () => (
          <Select
            options={[
              { value: 20, label: '20' },
              { value: 50, label: '50' },
            ]}
          />
        ),
      },
    ]
  }, [activeTab]) // 依賴 activeTab 變化

  const handleSearch = (values: any) => {
    setSearchParams(values)
  }

  const tabItems = [
    { key: 'company', label: '公司' },
    { key: 'agent', label: '代理' },
    { key: 'member', label: '會員' },
    { key: 'betType', label: '下注類別' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <ConfigProvider theme={themeConfig}>
        <div className="mb-2 flex items-center justify-between">
          <Breadcrumb separator=">" className="mb-4 text-gray-500">
            <Breadcrumb.Item>財務管理</Breadcrumb.Item>
            <Breadcrumb.Item>整合報表</Breadcrumb.Item>
          </Breadcrumb>
        </div>

        <SearchPanel
          title="條件搜尋"
          fields={searchFields}
          onSearch={handleSearch}
          initialValues={{
            settlementType: 'general',
            agentLevel: 'level1',
            pageSize: 20,
          }}
        />

        <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={tabItems}
            type="card"
            className="mb-4"
          />

          {activeTab === 'company' && (
            <CompanyTable searchParams={searchParams} />
          )}
          {activeTab === 'agent' && <AgentTable searchParams={searchParams} />}
          {activeTab === 'member' && (
            <MemberTable searchParams={searchParams} />
          )}

          {/* 【新增】顯示下注類別表格 */}
          {activeTab === 'betType' && (
            <BetTypeTable searchParams={searchParams} />
          )}
        </div>
      </ConfigProvider>
    </div>
  )
}
