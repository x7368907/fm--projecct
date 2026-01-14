import type { ReactNode } from 'react'
import { Button, Input, Select, Tag } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

// --- 共用小元件 ---
const AddButton = () => (
  <Button
    icon={<PlusOutlined className="text-base font-bold" />}
    className="flex h-8 w-8 items-center justify-center border-none bg-gray-800 p-0 text-white hover:!bg-gray-700"
  />
)

const SubmitButton = ({ showStatus }: { showStatus: boolean }) =>
  showStatus ? (
    <Tag color="success">啟用</Tag>
  ) : (
    <Button size="small" disabled className="w-full text-gray-300">
      提交
    </Button>
  )

const ViewButton = ({ showStatus }: { showStatus: boolean }) =>
  showStatus ? (
    <Button
      size="small"
      className="w-full border-none bg-green-500 text-white hover:!bg-green-400"
    >
      檢視
    </Button>
  ) : (
    <Button
      size="small"
      className="w-full border-green-500 bg-white text-green-500"
    >
      上傳
    </Button>
  )

// --- 基礎佈局容器 ---
const BaseSection = ({
  title,
  minWidth,
  header,
  row,
}: {
  title: string
  minWidth: string
  header: ReactNode
  row: ReactNode
}) => (
  <div className="mb-6">
    <div className="mb-2 border-l-4 border-gray-600 pl-2 text-sm font-bold">
      {title}
    </div>
    <div className="overflow-x-auto border border-b-0 border-r-0 border-gray-300">
      <div style={{ minWidth }}>
        {/* Header Row */}
        <div className="flex border-b border-gray-300 bg-gray-300 text-center text-xs font-bold text-gray-800 [&>div]:flex [&>div]:min-h-[48px] [&>div]:items-center [&>div]:justify-center [&>div]:border-r [&>div]:border-gray-300 [&>div]:p-2">
          {header}
        </div>
        {/* Input Row */}
        <div className="flex border-b border-gray-300 bg-white [&>div]:flex [&>div]:min-h-[48px] [&>div]:items-center [&>div]:justify-center [&>div]:border-r [&>div]:border-gray-300 [&>div]:p-2">
          {row}
        </div>
      </div>
    </div>
  </div>
)

// --- 1. 銀行/信用卡 Layout ---
export const BankSection = ({
  title,
  isEdit,
}: {
  title: string
  isEdit: boolean
}) => {
  const isCredit = title.includes('信用卡')
  return (
    <BaseSection
      title={title}
      minWidth="800px"
      header={
        <>
          <div className="w-[60px]">新增</div>
          <div className="w-[150px]">{isCredit ? '銀行名稱' : '銀行名稱'}</div>
          <div className="flex-1">{isCredit ? '信用卡號' : '銀行帳號'}</div>
          <div className="w-[100px]">{isCredit ? '卡片照片' : '存摺封面'}</div>
          <div className="w-[80px]">狀態</div>
          <div className="flex-1">備註</div>
        </>
      }
      row={
        <>
          <div className="w-[60px]">
            <AddButton />
          </div>
          <div className="w-[150px]">
            <Select placeholder="請選擇" className="w-full" />
          </div>
          <div className="flex-1">
            <Input placeholder="請輸入" />
          </div>
          <div className="w-[100px]">
            <ViewButton showStatus={isEdit} />
          </div>
          <div className="w-[80px]">
            <SubmitButton showStatus={isEdit} />
          </div>
          <div className="flex-1">
            <Input />
          </div>
        </>
      }
    />
  )
}

// --- 2. 超商 Layout ---
export const StoreSection = ({ isEdit }: { isEdit: boolean }) => (
  <BaseSection
    title="超商資料"
    minWidth="1000px"
    header={
      <>
        <div className="w-[60px]">新增</div>
        <div className="w-[100px]">所在縣市</div>
        <div className="w-[100px]">所在地區</div>
        <div className="w-[100px]">選擇超商</div>
        <div className="w-[200px]">超商代碼與店名</div>
        <div className="w-[80px]">狀態</div>
        <div className="w-[100px]">支付管道</div>
        <div className="flex-1">備註</div>
      </>
    }
    row={
      <>
        <div className="w-[60px]">
          <AddButton />
        </div>
        <div className="w-[100px]">
          <Select placeholder="請選擇" size="small" className="w-full" />
        </div>
        <div className="w-[100px]">
          <Select placeholder="請選擇" size="small" className="w-full" />
        </div>
        <div className="w-[100px]">
          <Select placeholder="請選擇" size="small" className="w-full" />
        </div>
        <div className="w-[200px]">
          <Select placeholder="請選擇" size="small" className="w-full" />
        </div>
        <div className="w-[80px]">
          <SubmitButton showStatus={isEdit} />
        </div>
        <div className="w-[100px]"></div>
        <div className="flex-1">
          <Input size="small" />
        </div>
      </>
    }
  />
)

// --- 3. 電子支付 Layout ---
export const EPaySection = ({ isEdit }: { isEdit: boolean }) => (
  <BaseSection
    title="電子支付資料"
    minWidth="800px"
    header={
      <>
        <div className="w-[60px]">新增</div>
        <div className="w-[150px]">支付名稱</div>
        <div className="flex-1">支付帳號</div>
        <div className="w-[80px]">狀態</div>
        <div className="w-[100px]">支付管道</div>
        <div className="flex-1">備註</div>
      </>
    }
    row={
      <>
        <div className="w-[60px]">
          <AddButton />
        </div>
        <div className="w-[150px]">
          <Select placeholder="請選擇" className="w-full" />
        </div>
        <div className="flex-1">
          <Input placeholder="請輸入" />
        </div>
        <div className="w-[80px]">
          <SubmitButton showStatus={isEdit} />
        </div>
        <div className="w-[100px]"></div>
        <div className="flex-1">
          <Input />
        </div>
      </>
    }
  />
)

// --- 4. USDT Layout ---
export const UsdtSection = ({ isEdit }: { isEdit: boolean }) => (
  <BaseSection
    title="USDT資料"
    minWidth="700px"
    header={
      <>
        <div className="w-[60px]">新增</div>
        <div className="w-[120px]">加密協定</div>
        <div className="flex-1">錢包地址</div>
        <div className="w-[80px]">狀態</div>
        <div className="flex-1">備註</div>
      </>
    }
    row={
      <>
        <div className="w-[60px]">
          <AddButton />
        </div>
        <div className="w-[120px]">
          <Select placeholder="請選擇" className="w-full" />
        </div>
        <div className="flex-1">
          <Input />
        </div>
        <div className="w-[80px]">
          <SubmitButton showStatus={isEdit} />
        </div>
        <div className="flex-1">
          <Input />
        </div>
      </>
    }
  />
)
