import React from 'react'
import { Modal, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'

// 1. 完整擴充資料型別，支援所有報表模式需要的欄位
export interface DetailDataType {
  key: string
  label?: string // 通用顯示名稱 (代理名稱 / 會員姓名 / 類別名稱)
  value: number // 主要金額/數值 (通常是最後一欄的金額)

  // --- 時間相關 ---
  time?: string // 下注時間 / 派發時間

  // --- 遊戲/廠商相關 ---
  gameType?: string // 遊戲類型 (真人、電子...)
  vendor?: string // 遊戲廠商 (DG, RSG...)

  // --- 注單數據相關 ---
  betCount?: number // 下注筆數
  betAmount?: number // 下注金額
  validBetAmount?: number // 有效投注金額

  // --- 費率/比例相關 ---
  rate?: number // 比例 (返水% / 服務費% / 上繳%)

  // --- 其他 ---
  name?: string // 名稱 (優惠名稱)
  baseAmount?: number // 基礎金額 (儲值金額 / 會員虧損金額，用於計算成本或上繳)
  type?: string // 類別 (營運成本的費用類別)
}

interface DetailModalProps {
  open: boolean
  onCancel: () => void
  title: string
  subTitle: string
  data: DetailDataType[]
  // 定義所有支援的模式
  mode?:
    | 'agent' // [預設] 代理列表 (顯示: 代理級別 + 數值)
    | 'category' // 公司獲利 (顯示: 類別 + 金額)
    | 'member' // 會員簡易列表 (顯示: 會員姓名 + 金額)
    | 'member-detail' // 會員輸贏/中獎詳細 (顯示: 姓名 + 筆數 + 下注 + 有效 + 金額)
    | 'member-bet' // 會員注單明細 (時間 + 遊戲 + 廠商 + 筆數 + 有效 + 輸贏金額)
    | 'member-rebate' // 會員返水明細
    | 'member-discount' // 會員優惠明細
    | 'member-cost' // 會員營運成本
    | 'member-gamefee' // 會員遊戲上繳
    | 'member-transaction' // 會員儲值/託售
    | 'bettype-detail' // [新增] 下注類別詳細 (時間 + 遊戲 + 廠商 + 筆數 + 下注 + 有效)
}

const DetailModal: React.FC<DetailModalProps> = ({
  open,
  onCancel,
  title,
  subTitle,
  data,
  mode = 'agent',
}) => {
  // 2. 動態定義表格欄位
  const getColumns = (): ColumnsType<DetailDataType> => {
    // ----------------------------------------------------------------
    // Mode: bettype-detail (下注類別詳細) - 參考截圖 10.10.42
    // ----------------------------------------------------------------
    if (mode === 'bettype-detail') {
      return [
        {
          title: '下注時間',
          dataIndex: 'time',
          key: 'time',
          width: 160,
          align: 'center',
        },
        {
          title: '遊戲類型',
          dataIndex: 'gameType',
          key: 'gameType',
          width: 100,
          align: 'center',
        },
        {
          title: '遊戲廠商',
          dataIndex: 'vendor',
          key: 'vendor',
          width: 100,
          align: 'center',
        },
        {
          title: '下注筆數',
          dataIndex: 'betCount',
          key: 'betCount',
          align: 'center',
          render: (val) => val?.toLocaleString(),
        },
        {
          title: '下注金額',
          dataIndex: 'betAmount',
          key: 'betAmount',
          align: 'right',
          render: (val) => val?.toLocaleString(),
        },
        {
          title: '有效投注金額',
          dataIndex: 'validBetAmount',
          key: 'validBetAmount',
          align: 'right',
          render: (val) => val?.toLocaleString(),
        },
      ]
    }

    // ----------------------------------------------------------------
    // Mode: member-bet (會員注單 - 用於中獎/虧損彈窗)
    // ----------------------------------------------------------------
    if (mode === 'member-bet') {
      return [
        {
          title: '下注時間',
          dataIndex: 'time',
          key: 'time',
          width: 160,
          align: 'center',
        },
        {
          title: '遊戲類型',
          dataIndex: 'gameType',
          key: 'gameType',
          width: 100,
          align: 'center',
        },
        {
          title: '遊戲廠商',
          dataIndex: 'vendor',
          key: 'vendor',
          width: 100,
          align: 'center',
        },
        {
          title: '下注筆數',
          dataIndex: 'betCount',
          key: 'betCount',
          align: 'center',
          render: (val) => val?.toLocaleString(),
        },
        {
          title: '有效投注金額',
          dataIndex: 'validBetAmount',
          key: 'validBetAmount',
          align: 'right',
          render: (val) => val?.toLocaleString(),
        },
        {
          title: title, // 動態標題 (中獎金額 / 虧損金額)
          dataIndex: 'value',
          key: 'value',
          align: 'right',
          render: (val) => (
            <span className={val < 0 ? 'font-bold text-red-500' : 'font-bold'}>
              {val?.toLocaleString()}
            </span>
          ),
        },
      ]
    }

    // ----------------------------------------------------------------
    // Mode: member-rebate (會員返水)
    // ----------------------------------------------------------------
    if (mode === 'member-rebate') {
      return [
        {
          title: '派發時間',
          dataIndex: 'time',
          key: 'time',
          width: 160,
          align: 'center',
        },
        {
          title: '遊戲類型',
          dataIndex: 'gameType',
          key: 'gameType',
          width: 100,
          align: 'center',
        },
        {
          title: '遊戲廠商',
          dataIndex: 'vendor',
          key: 'vendor',
          width: 100,
          align: 'center',
        },
        {
          title: '有效投注金額',
          dataIndex: 'validBetAmount',
          key: 'validBetAmount',
          align: 'right',
          render: (val) => val?.toLocaleString(),
        },
        {
          title: '返水比例(%)',
          dataIndex: 'rate',
          key: 'rate',
          align: 'center',
        },
        {
          title: '返水金額',
          dataIndex: 'value',
          key: 'value',
          align: 'right',
          render: (val) => val?.toLocaleString(),
        },
      ]
    }

    // ----------------------------------------------------------------
    // Mode: member-discount (會員優惠)
    // ----------------------------------------------------------------
    if (mode === 'member-discount') {
      return [
        {
          title: '派發時間',
          dataIndex: 'time',
          key: 'time',
          width: 180,
          align: 'center',
        },
        { title: '優惠名稱', dataIndex: 'name', key: 'name', align: 'center' },
        {
          title: '優惠金額',
          dataIndex: 'value',
          key: 'value',
          align: 'right',
          render: (val) => val?.toLocaleString(),
        },
      ]
    }

    // ----------------------------------------------------------------
    // Mode: member-cost (營運成本)
    // ----------------------------------------------------------------
    if (mode === 'member-cost') {
      return [
        {
          title: '派發時間',
          dataIndex: 'time',
          key: 'time',
          width: 180,
          align: 'center',
        },
        {
          title: '儲值金額',
          dataIndex: 'baseAmount',
          key: 'baseAmount',
          align: 'right',
          render: (val) => val?.toLocaleString(),
        },
        { title: '類別', dataIndex: 'type', key: 'type', align: 'center' },
        {
          title: '服務費比例(%)',
          dataIndex: 'rate',
          key: 'rate',
          align: 'center',
        },
        {
          title: '金額',
          dataIndex: 'value',
          key: 'value',
          align: 'right',
          render: (val) => val?.toLocaleString(),
        },
      ]
    }

    // ----------------------------------------------------------------
    // Mode: member-gamefee (遊戲上繳)
    // ----------------------------------------------------------------
    if (mode === 'member-gamefee') {
      return [
        {
          title: '遊戲類型',
          dataIndex: 'gameType',
          key: 'gameType',
          align: 'center',
        },
        {
          title: '遊戲廠商',
          dataIndex: 'vendor',
          key: 'vendor',
          align: 'center',
        },
        {
          title: '會員虧損金額',
          dataIndex: 'baseAmount',
          key: 'baseAmount',
          align: 'right',
          render: (val) => val?.toLocaleString(),
        },
        { title: '上繳%', dataIndex: 'rate', key: 'rate', align: 'center' },
        {
          title: '遊戲上繳金額',
          dataIndex: 'value',
          key: 'value',
          align: 'right',
          render: (val) => val?.toLocaleString(),
        },
      ]
    }

    // ----------------------------------------------------------------
    // Mode: member-transaction (儲值/託售)
    // ----------------------------------------------------------------
    if (mode === 'member-transaction') {
      return [
        {
          title: '派發時間',
          dataIndex: 'time',
          key: 'time',
          width: 200,
          align: 'center',
        },
        {
          title: title,
          dataIndex: 'value',
          key: 'value',
          align: 'center',
          render: (val) => val?.toLocaleString(),
        },
      ]
    }

    // ----------------------------------------------------------------
    // Mode: member-detail (會員輸贏詳細 - 5欄位)
    // ----------------------------------------------------------------
    if (mode === 'member-detail') {
      return [
        {
          title: '會員姓名',
          dataIndex: 'label',
          key: 'label',
          align: 'center',
        },
        {
          title: '下注筆數',
          dataIndex: 'betCount',
          key: 'betCount',
          align: 'center',
          render: (val) => val?.toLocaleString(),
        },
        {
          title: '下注金額',
          dataIndex: 'betAmount',
          key: 'betAmount',
          align: 'center',
          render: (val) => val?.toLocaleString(),
        },
        {
          title: '有效投注金額',
          dataIndex: 'validBetAmount',
          key: 'validBetAmount',
          align: 'center',
          render: (val) => val?.toLocaleString(),
        },
        {
          title: title,
          dataIndex: 'value',
          key: 'value',
          align: 'center',
          render: (val) => (
            <span className={val < 0 ? 'font-bold text-red-500' : 'font-bold'}>
              {val?.toLocaleString()}
            </span>
          ),
        },
      ]
    }

    // ----------------------------------------------------------------
    // Default Mode: agent / category / member (簡單列表模式)
    // ----------------------------------------------------------------
    let firstColTitle = '代理級別'
    if (mode === 'category') firstColTitle = '類別'
    if (mode === 'member') firstColTitle = '會員姓名'

    return [
      {
        title: firstColTitle,
        dataIndex: 'label',
        key: 'label',
        align: 'center',
        render: (text) => <span className="text-gray-600">{text}</span>,
      },
      {
        title: mode === 'category' ? '金額' : title,
        dataIndex: 'value',
        key: 'value',
        align: 'center',
        render: (val) => (
          <span
            className={
              val < 0 ? 'font-bold text-red-500' : 'font-bold text-gray-800'
            }
          >
            {val.toLocaleString()}
          </span>
        ),
      },
    ]
  }

  // 3. 自定義標頭樣式
  const customHeader = (
    <div className="flex items-center gap-3 pr-8">
      <div className="rounded border border-gray-400 px-3 py-1 text-sm font-medium text-gray-700">
        {title}
      </div>
      <div className="text-sm text-gray-500">{subTitle}</div>
    </div>
  )

  // 4. 計算並渲染總計列
  const renderFooter = () => {
    if (mode === 'category') return null // 公司獲利公式通常不顯示加總

    // 計算基礎 value 的總合
    const totalValue = data.reduce((acc, curr) => acc + curr.value, 0)

    // --- 特殊模式：下注類別詳細 (需要加總多個欄位) ---
    if (mode === 'bettype-detail') {
      return (
        <div className="mt-2 grid grid-cols-6 gap-4 border-b border-gray-100 bg-gray-50 px-4 py-3 text-sm font-bold">
          {/* 佔用前 3 格 (時間, 遊戲, 廠商) */}
          <span className="col-span-5 pr-4 text-gray-500">總計</span>
          {/* 有效投注 */}
          <span className="text-right">
            {data
              .reduce((acc, c) => acc + (c.validBetAmount || 0), 0)
              .toLocaleString()}
          </span>
        </div>
      )
    }

    // --- 特殊模式：會員輸贏詳細 (需要加總多個欄位) ---
    if (mode === 'member-detail') {
      return (
        <div className="mt-2 grid grid-cols-5 gap-4 border-b border-gray-100 bg-gray-50 px-4 py-3 text-center text-sm font-bold">
          <span className="col-span-1 text-gray-500">總計</span>
          <span>
            {data
              .reduce((acc, c) => acc + (c.betCount || 0), 0)
              .toLocaleString()}
          </span>
          <span>
            {data
              .reduce((acc, c) => acc + (c.betAmount || 0), 0)
              .toLocaleString()}
          </span>
          <span>
            {data
              .reduce((acc, c) => acc + (c.validBetAmount || 0), 0)
              .toLocaleString()}
          </span>
          <span className={totalValue < 0 ? 'text-red-500' : ''}>
            {totalValue.toLocaleString()}
          </span>
        </div>
      )
    }

    // --- 預設模式：僅加總最後一欄 Value ---
    return (
      <div className="mt-2 flex justify-between border-b border-gray-100 bg-gray-50 px-4 py-3">
        <span className="text-gray-500">總計</span>
        <span
          className={`text-lg font-bold ${totalValue < 0 ? 'text-red-500' : ''}`}
        >
          {totalValue.toLocaleString()}
        </span>
      </div>
    )
  }

  // 決定 Modal 寬度：詳細報表給寬一點
  const getModalWidth = () => {
    if (
      [
        'member-detail',
        'member-bet',
        'member-rebate',
        'member-discount',
        'member-cost',
        'member-gamefee',
        'bettype-detail',
      ].includes(mode)
    ) {
      return 900
    }
    return 600
  }

  return (
    <Modal
      title={customHeader}
      open={open}
      onCancel={onCancel}
      footer={null}
      width={getModalWidth()}
      centered
      destroyOnClose
    >
      <div className="mt-4">
        <Table
          columns={getColumns()}
          dataSource={data}
          pagination={false}
          size="middle"
          bordered={false}
          className="border-t border-gray-200"
          scroll={{ y: 500 }} // 支援垂直捲動
        />
        {renderFooter()}
      </div>
    </Modal>
  )
}

export default DetailModal
