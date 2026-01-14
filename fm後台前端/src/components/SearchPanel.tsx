import { useState, type ReactNode } from 'react'
import { Form, Button, Collapse, Row, Col, type ColProps } from 'antd'
import { DownOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons'

const { Panel } = Collapse

export interface SearchField {
  label: ReactNode
  name: string
  render: () => ReactNode
  colProps?: ColProps
}

interface SearchPanelProps {
  title?: string
  fields: SearchField[]
  initialValues?: any
  onSearch?: (values: any) => void
  onCreate?: () => void
  extra?: ReactNode // ★ 新增：通用插槽，讓父層可以塞任意按鈕
}

export default function SearchPanel({
  title = '條件搜尋',
  fields,
  initialValues,
  onSearch,
  onCreate,
  extra,
}: SearchPanelProps) {
  const [form] = Form.useForm()
  const [activeKey, setActiveKey] = useState<string | string[]>([])
  const isActive = Array.isArray(activeKey) && activeKey.includes('1')

  const handleSearch = () => {
    const values = form.getFieldsValue()
    onSearch?.(values)
  }

  const headerNode = (
    <div className="flex select-none items-center gap-2 text-base font-bold text-gray-700">
      {title}
      <DownOutlined
        className={`text-xs text-gray-400 transition-transform duration-300 ${
          isActive ? 'rotate-180' : ''
        }`}
      />
    </div>
  )

  const renderExtra = () => (
    <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
      {/* 1. 新增按鈕 (紫色) */}
      {onCreate && (
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={onCreate}
          className="border-purple-600 bg-purple-600 shadow-sm hover:!bg-purple-500"
        >
          新增
        </Button>
      )}

      {/* 2. ★ 通用插槽：這裡渲染父層傳進來的東西 (例如下載按鈕) */}
      {extra}

      {/* 3. 搜尋按鈕 (Teal色) */}
      <Button
        type="primary"
        icon={<SearchOutlined />}
        onClick={handleSearch}
        className="border-teal-500 bg-teal-500 shadow-sm hover:!bg-teal-400"
      >
        搜尋
      </Button>
    </div>
  )

  return (
    <div className="mb-4">
      <Collapse
        activeKey={activeKey}
        onChange={setActiveKey}
        className="rounded-lg border-none bg-white shadow-sm"
        expandIcon={() => null}
      >
        <Panel
          key="1"
          header={headerNode}
          extra={renderExtra()}
          className="border-none [&_.ant-collapse-header]:items-center [&_.ant-collapse-header]:p-4"
        >
          <Form form={form} layout="vertical" initialValues={initialValues}>
            <Row gutter={[16, 24]}>
              {fields.map((field) => (
                <Col key={field.name} {...field.colProps}>
                  <Form.Item
                    label={field.label}
                    name={field.name}
                    className="mb-0"
                  >
                    {field.render()}
                  </Form.Item>
                </Col>
              ))}
            </Row>
          </Form>
        </Panel>
      </Collapse>
    </div>
  )
}
