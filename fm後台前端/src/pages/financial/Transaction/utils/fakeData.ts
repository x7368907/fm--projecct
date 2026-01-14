import type { TransactionData } from '../types'

// 1. 準備隨機名稱庫 (動漫角色風格)
const AGENT_NAMES = [
  '魯夫',
  '悟空',
  '漩渦鳴人',
  '索隆',
  '香吉士',
  '貝吉塔',
  '佐助',
  '櫻木花道',
  '流川楓',
  '炭治郎',
  '禰豆子',
  '善逸',
  '伊之助',
  '艾倫',
  '米卡莎',
  '里維兵長',
  '埼玉',
  '傑諾斯',
  '夜神月',
  'L',
  '愛德華',
  '阿爾馮斯',
  '五條悟',
  '虎杖悠仁',
  '伏黑惠',
]

// 2. 輔助函式：產生範圍內的隨機整數
const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// 3. 輔助函式：產生金額物件 (包含金額與筆數)
// isNegative: 是否為負數 (用於提領)
// probability: 該欄位有資料的機率 (0~1)，預設 0.7 (70% 機率有值)
const generateMoneyData = (
  minAmount: number,
  maxAmount: number,
  isNegative = false,
  probability = 0.7
) => {
  // 有一定機率回傳 0 (模擬有些欄位沒數據)
  if (Math.random() > probability) {
    return { amount: 0, count: 0 }
  }

  const rawAmount = getRandomInt(minAmount, maxAmount)
  // 讓金額看起來像真實交易 (去掉尾數，變成 100 的倍數)
  const amount = Math.floor(rawAmount / 100) * 100 * (isNegative ? -1 : 1)
  const count = getRandomInt(1, 100) // 隨機筆數

  return { amount, count }
}

// 4. 生成 25 筆資料的主邏輯
const generateMockData = (count: number): TransactionData[] => {
  return Array.from({ length: count }).map((_, index) => {
    // --- A. 生成各項儲值數據 ---
    const manualDeposit = generateMoneyData(1000, 50000, false, 0.2) // 人工上分較少見
    const atmDeposit = generateMoneyData(100000, 5000000, false, 0.9) // ATM 很常用
    const creditDeposit = generateMoneyData(10000, 200000, false, 0.4)
    const epayDeposit = generateMoneyData(5000, 100000, false, 0.3)
    const usdtDeposit = generateMoneyData(50000, 1000000, false, 0.6)
    const cvsDeposit = generateMoneyData(50000, 800000, false, 0.8) // 超商很常用

    // 計算儲值小計
    const depositSubtotal =
      manualDeposit.amount +
      atmDeposit.amount +
      creditDeposit.amount +
      epayDeposit.amount +
      usdtDeposit.amount +
      cvsDeposit.amount

    // --- B. 生成各項託售數據 (負數) ---
    const bankWithdraw = generateMoneyData(100000, 3000000, true, 0.8)
    const usdtWithdraw = generateMoneyData(50000, 1000000, true, 0.5)

    // 計算託售小計
    const withdrawSubtotal = bankWithdraw.amount + usdtWithdraw.amount

    // --- C. 生成加扣點數據 ---
    const addPoints = generateMoneyData(1000, 500000, false, 0.5)
    const deductPoints = generateMoneyData(1000, 100000, false, 0.1) // 扣點較少

    // 計算加扣點小計 (注意：這通常是 加點 - 扣點，或者是單純加總，視您的業務邏輯而定)
    // 這裡假設是單純數值加總 (如果 deductPoints 生成出來是正數，這裡要減去；如果生成是負數，則加上)
    // 為了簡單起見，我們讓 deductPoints 為 0 或正數，計算時減去它，或者顯示時為負
    // 依照您原本的 Mock Data，扣點是 0，這裡我們簡單做加總即可
    const pointsSubtotal = addPoints.amount - deductPoints.amount

    return {
      key: (index + 1).toString(),
      agentLevel: `1/${getRandomInt(2, 9)} (${getRandomInt(10, 99)})`,
      agentName: AGENT_NAMES[index % AGENT_NAMES.length], // 循環使用名字
      memberName: `(${getRandomInt(0, 5)}筆)`, // 模擬會員搜尋結果

      // 儲值區塊
      manualDeposit,
      atmDeposit,
      creditDeposit,
      epayDeposit,
      usdtDeposit,
      cvsDeposit,
      depositSubtotal,

      // 託售區塊
      bankWithdraw,
      usdtWithdraw,
      withdrawSubtotal,

      // 加扣點區塊
      addPoints,
      deductPoints: {
        amount: deductPoints.amount * -1, // 轉成負數顯示
        count: deductPoints.count,
      },
      pointsSubtotal,
    }
  })
}

// 5. 匯出靜態資料 (生成 25 筆)
export const MOCK_DATA: TransactionData[] = generateMockData(25)
