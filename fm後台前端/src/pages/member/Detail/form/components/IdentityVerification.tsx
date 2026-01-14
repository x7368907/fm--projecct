import { Button, Form, Input } from 'antd'

interface Props {
  mode: 'create' | 'edit'
}

export default function IdentityVerification({ mode }: Props) {
  // 共用樣式
  const headerClass =
    'flex items-center justify-center bg-gray-300 p-2 text-center text-xs font-bold text-gray-800 border-r border-gray-400 last:border-0'
  const cellClass = 'p-2 pr-2 text-center'

  return (
    <div className="overflow-hidden rounded-sm border border-gray-300">
      <div className="flex">
        <div className={`${headerClass} flex-[3]`}>身分證號碼</div>
        <div className={`${headerClass} flex-[2]`}>身分證正面</div>
        <div className={`${headerClass} flex-[2]`}>身分證背面</div>
        <div className={`${headerClass} flex-[2]`}>驗證</div>
        <div className={`${headerClass} flex-[3]`}>備註</div>
      </div>

      <div className="flex items-center bg-white px-2 py-3">
        <div className="flex-[3] pr-2">
          <Form.Item name="idNumber" noStyle>
            <Input
              placeholder="請輸入"
              size="small"
              className="text-center"
              defaultValue={mode === 'edit' ? 'L123456789' : ''}
            />
          </Form.Item>
        </div>
        <div className={`${cellClass} flex-[2]`}>
          <ActionButton mode={mode} />
        </div>
        <div className={`${cellClass} flex-[2]`}>
          <ActionButton mode={mode} />
        </div>
        <div className={`${cellClass} flex-[2]`}>
          {mode === 'edit' ? (
            <span className="font-bold text-green-500">啟用</span>
          ) : (
            <Button size="small" disabled className="text-gray-300">
              提交
            </Button>
          )}
        </div>
        <div className="flex-[3]">
          <Form.Item name="idNote" noStyle>
            <Input size="small" />
          </Form.Item>
        </div>
      </div>
    </div>
  )
}

const ActionButton = ({ mode }: { mode: 'create' | 'edit' }) => {
  return mode === 'edit' ? (
    <Button
      size="small"
      className="border-none bg-green-500 text-white hover:!bg-green-400"
    >
      檢視
    </Button>
  ) : (
    <Button size="small" className="border-green-500 bg-white text-green-500">
      上傳
    </Button>
  )
}
