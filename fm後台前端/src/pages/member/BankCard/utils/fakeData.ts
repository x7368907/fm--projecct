// MemberBankCard/utils/fakeData.ts
import type { BankCardType } from '../types'

// 設定生成總筆數
const COUNT = 50

// 1. 定義隨機資料庫
const NAMES = [
  '林森森',
  '張阿軒',
  '王小明',
  '劉鳳蘭',
  '陳幣圈',
  '李發發',
  '趙超商',
  '陳志豪',
  '林雅婷',
  '黃美玲',
  '張建國',
  '吳淑芬',
  '蔡志明',
  '楊小華',
  '鄭雅雯',
]
const ACCOUNTS = [
  'High',
  'love',
  'newbie',
  'liu',
  'crypto',
  'vip',
  'store',
  'win',
  'lucky',
  'rich',
  'money',
  'happy',
]
const BANKS = [
  { code: '812', name: '台新銀行', type: '銀行卡' },
  { code: '822', name: '中國信託', type: '銀行卡' },
  { code: '013', name: '國泰世華', type: '銀行卡' },
  { code: '012', name: '台北富邦', type: '銀行卡' },
  { code: '004', name: '台灣銀行', type: '銀行卡' },
  { code: 'TRC20', name: 'TRC20', type: 'USDT' },
  { code: 'ERC20', name: 'ERC20', type: 'USDT' },
  { code: 'CVS', name: '7-11', type: '超商' },
  { code: 'CVS', name: '全家', type: '超商' },
]

// 2. 隨機生成 50 筆資料
export const INITIAL_DATA: BankCardType[] = Array.from({ length: COUNT }).map(
  (_, index) => {
    // --- A. 決定審核狀態 (確保每個區塊都有資料) ---
    // 前 15 筆：待審核
    // 中間 30 筆：通過
    // 最後 5 筆：拒絕
    let processStatus = '待審核'
    if (index >= 15 && index < 45) processStatus = '通過'
    if (index >= 45) processStatus = '拒絕'

    // --- B. 決定標籤與帳號狀態 (隨機) ---
    const isBlacklist = Math.random() > 0.85 // 15% 機率黑名單
    let tag = '一般會員'
    let tagType = 'default'
    let status = '啟用'

    if (isBlacklist) {
      const blackTypes = ['IP黑名單', '裝置黑名單', '金流黑名單']
      tag = blackTypes[Math.floor(Math.random() * blackTypes.length)]
      tagType = 'danger'
      status = '停用'
    } else if (Math.random() > 0.7) {
      tag = '新會員(註冊未滿30天)'
      tagType = 'warning' // 假設新會員用黃色
    }

    // --- C. 隨機挑選銀行與支付方式 ---
    const bankInfo = BANKS[Math.floor(Math.random() * BANKS.length)]
    let paymentType = bankInfo.type
    const bankName =
      bankInfo.code === 'CVS' || bankInfo.type === 'USDT'
        ? bankInfo.name
        : `${bankInfo.code}-${bankInfo.name}`

    // 根據支付方式微調顯示文字
    let cardNumber = ''
    if (bankInfo.type === 'USDT') {
      cardNumber = 'T' + Math.random().toString(36).substring(2, 15) + '...'
      paymentType = 'USDT'
    } else if (bankInfo.type === '超商') {
      cardNumber = Math.floor(Math.random() * 1000000000).toString()
      paymentType = '超商代碼'
    } else {
      // 銀行卡隨機 10~16 碼
      cardNumber = Math.floor(Math.random() * 10000000000000000).toString()
      // 隨機加上備註 (確認存摺封面等)
      if (Math.random() > 0.5) paymentType += ' (確認存摺封面)'
    }

    // --- D. 生成時間 (最近 30 天內) ---
    const date = new Date()
    date.setDate(date.getDate() - Math.floor(Math.random() * 30))
    const timeStr =
      date.toISOString().split('T')[0] +
      ' ' +
      `${Math.floor(Math.random() * 24)
        .toString()
        .padStart(2, '0')}:${Math.floor(Math.random() * 60)
        .toString()
        .padStart(2, '0')}:${Math.floor(Math.random() * 60)
        .toString()
        .padStart(2, '0')}`

    // --- E. 隨機生成備註 ---
    let remark = ''
    if (processStatus === '拒絕') remark = '資料模糊不清，請重新上傳'
    else if (isBlacklist) remark = '系統自動偵測異常'
    else if (Math.random() > 0.8) remark = 'VIP 客戶申請'

    return {
      key: (index + 1).toString(),
      tag,
      tagType, // 注意：需確認您的 types.ts 有定義 string 或特定字串
      account: `${ACCOUNTS[Math.floor(Math.random() * ACCOUNTS.length)]}${Math.floor(Math.random() * 1000)}`,
      name: NAMES[Math.floor(Math.random() * NAMES.length)],
      submitTime: timeStr,
      status, // 啟用 or 停用
      paymentType,
      bankName,
      cardNumber,
      hasImage1: Math.random() > 0.2, // 80% 有圖
      hasImage2: Math.random() > 0.5, // 50% 有第二張圖
      processStatus,
      remark,
    }
  }
)
