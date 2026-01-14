import { Button, Breadcrumb, ConfigProvider } from 'antd'
import { SaveOutlined, CloseOutlined } from '@ant-design/icons'

import { useLoginCreate } from '../hook/useLoginCreate'
import BlocklistTable from './components/BlocklistTable'

interface MemberLoginCreateProps {
  onCancel: () => void
  mode: 'create' | 'edit'
  initialValues?: any
}

const themeConfig = { token: { colorPrimary: '#13c2c2' } }

export default function MemberLoginCreate({
  onCancel,
  mode,
  initialValues,
}: MemberLoginCreateProps) {
  // 1. 使用 Hook 取得資料與操作函式
  const { ipData, deviceData, handleSave } = useLoginCreate(mode, initialValues)

  const pageTitle = mode === 'edit' ? '編輯黑名單' : '新增黑名單'

  return (
    <ConfigProvider theme={themeConfig}>
      <div className="min-h-screen bg-gray-50 p-4">
        {/* Breadcrumb */}
        <div className="mb-4">
          <Breadcrumb separator=">">
            <Breadcrumb.Item>會員管理</Breadcrumb.Item>
            <Breadcrumb.Item
              onClick={onCancel}
              className="cursor-pointer hover:text-teal-500"
            >
              會員登入管理
            </Breadcrumb.Item>
            <Breadcrumb.Item>{pageTitle}</Breadcrumb.Item>
          </Breadcrumb>
        </div>

        <div className="mb-4 rounded-lg bg-white p-4 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-gray-700">{pageTitle}</h2>

          <div className="mb-6">
            <h3 className="mb-4 font-bold text-gray-600">黑名單設定</h3>

            {/* IP Blocklist Section */}
            {ipData.length > 0 && (
              <>
                <div className="mb-2">
                  <Button
                    type="primary"
                    ghost
                    size="small"
                    className="mb-2 border-purple-300 bg-purple-50 font-bold text-purple-600 hover:bg-purple-100 hover:text-purple-700"
                  >
                    IP重複黑名單 ({ipData.length})
                  </Button>
                </div>
                <BlocklistTable type="ip" dataSource={ipData} />
              </>
            )}

            {/* Device Blocklist Section */}
            {deviceData.length > 0 && (
              <>
                <div className="mb-2">
                  <Button
                    type="primary"
                    ghost
                    size="small"
                    className="mb-2 border-purple-300 bg-purple-50 font-bold text-purple-600 hover:bg-purple-100 hover:text-purple-700"
                  >
                    裝置重複黑名單 ({deviceData.length})
                  </Button>
                </div>
                <BlocklistTable type="device" dataSource={deviceData} />
              </>
            )}
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-center gap-4 border-t pb-2 pt-6">
            <Button
              size="large"
              danger
              icon={<CloseOutlined />}
              onClick={onCancel}
              className="w-32 font-bold"
            >
              取消
            </Button>
            <Button
              type="primary"
              size="large"
              icon={<SaveOutlined />}
              className="w-32 border-none bg-green-500 font-bold hover:bg-green-600"
              onClick={() => {
                handleSave()
                onCancel()
              }}
            >
              儲存
            </Button>
          </div>
        </div>
      </div>
    </ConfigProvider>
  )
}
