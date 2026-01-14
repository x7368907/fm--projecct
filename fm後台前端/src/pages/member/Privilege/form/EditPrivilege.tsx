import { useEffect } from 'react'
import { Form, Button, Breadcrumb, ConfigProvider, Divider } from 'antd'
import { SaveOutlined, CloseOutlined } from '@ant-design/icons'

// 引入拆分後的元件
import EditMemberInfo from './components/EditMemberInfo'
import EditStatsTable from './components/EditStatsTable'
import EditRebateTable from './components/EditRebateTable'

interface EditPrivilegeProps {
  record: any
  onCancel: () => void
}

const themeConfig = {
  token: { colorPrimary: '#14b8a6' },
}

export default function EditPrivilege({
  record,
  onCancel,
}: EditPrivilegeProps) {
  const [form] = Form.useForm()

  // 資料初始化
  useEffect(() => {
    if (record) {
      const formValues = {
        account: record.account,
        name: record.name,
        vipLevel: 'vip2',

        // 數據欄位
        depositCurrent:
          record.depositProgress?.current?.toLocaleString() || '0',
        depositTarget: record.depositProgress?.target?.toLocaleString() || '0',
        betKeepCurrent:
          record.bettingProgress?.current?.toLocaleString() || '0',
        betKeepTarget: record.bettingProgress?.target?.toLocaleString() || '0',
        betUpgradeCurrent:
          record.updateProgress?.current?.toLocaleString() || '0',
        betUpgradeTarget:
          record.updateProgress?.target?.toLocaleString() || '0',
        upgradeBonus: record.upgradeBonus,
        topUpBonus: record.topUpBonus,
        birthDateBonus: record.birthDateBonus,
        consignmentCurrent: record.consignment,
        consignmentTotal: record.totalConsignment,

        // 返水欄位
        electronic_h: record.rebates?.electronic?.hour,
        electronic_d: record.rebates?.electronic?.day,
        electronic_w: record.rebates?.electronic?.week,

        live_h: record.rebates?.live?.hour,
        live_d: record.rebates?.live?.day,
        live_w: record.rebates?.live?.week,

        chess_h: record.rebates?.chess?.hour,
        chess_d: record.rebates?.chess?.day,
        chess_w: record.rebates?.chess?.week,

        lottery_h: record.rebates?.lottery?.hour,
        lottery_d: record.rebates?.lottery?.day,
        lottery_w: record.rebates?.lottery?.week,

        sports_h: record.rebates?.sports?.hour,
        sports_d: record.rebates?.sports?.day,
        sports_w: record.rebates?.sports?.week,
      }

      form.setFieldsValue(formValues)
    }
  }, [record, form])

  const handleFinish = (values: any) => {
    console.log('Save Values:', values)
    onCancel()
  }

  return (
    <ConfigProvider theme={themeConfig}>
      <div className="min-h-screen w-full bg-gray-50 p-4 pb-20">
        <Breadcrumb separator=">" className="mb-4">
          <Breadcrumb.Item>會員管理</Breadcrumb.Item>
          <Breadcrumb.Item
            onClick={onCancel}
            className="cursor-pointer transition-colors hover:text-teal-600"
          >
            會員特權管理
          </Breadcrumb.Item>
          <Breadcrumb.Item>編輯會員特權</Breadcrumb.Item>
        </Breadcrumb>

        <div className="mb-4 rounded-t-md bg-gray-300 p-2 pl-4 text-sm font-bold text-gray-700">
          編輯會員特權
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          className="rounded-b-md bg-white p-6 shadow-sm"
        >
          {/* 模組化後的元件 */}
          <EditMemberInfo />
          <Divider />
          <EditStatsTable />
          <EditRebateTable />
        </Form>

        {/* 底部按鈕 */}
        <div className="fixed bottom-0 left-0 z-50 flex w-full justify-center gap-4 bg-white py-4 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
          <Button
            size="large"
            icon={<CloseOutlined />}
            className="w-32 border-red-500 text-red-500 hover:bg-red-50"
            onClick={onCancel}
          >
            取消
          </Button>
          <Button
            type="primary"
            size="large"
            icon={<SaveOutlined />}
            className="w-32 border-green-500 bg-green-500 hover:bg-green-600"
            onClick={() => form.submit()}
          >
            儲存
          </Button>
        </div>
      </div>
    </ConfigProvider>
  )
}
