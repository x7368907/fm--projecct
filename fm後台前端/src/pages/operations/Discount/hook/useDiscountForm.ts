import { useState, useEffect } from 'react'
import { Form } from 'antd'
import dayjs from 'dayjs'
import type { DiscountDataType } from '../types'

export const useDiscountForm = (initialValues?: DiscountDataType) => {
  const [form] = Form.useForm()

  // 狀態管理
  const [discountType, setDiscountType] = useState('privilege')
  const [isCheckAmountUnlimited, setIsCheckAmountUnlimited] = useState(false)
  const [isLimitCountUnlimited, setIsLimitCountUnlimited] = useState(false)
  const [showFixedAmount, setShowFixedAmount] = useState(false)

  // 初始化資料回填邏輯
  useEffect(() => {
    if (initialValues) {
      // 1. 類型對應
      let typeKey = 'privilege'
      if (initialValues.category === '優惠') typeKey = 'discount'
      if (initialValues.category === '紅包') typeKey = 'redenv'
      setDiscountType(typeKey)

      // 2. 結算時機對應
      let timingKey = 'month'
      if (initialValues.timing === '即時') timingKey = 'instant'

      // 3. 公式拆解
      let formulaLeft = '儲值最大值'
      if (initialValues.formula && initialValues.formula.includes('儲值金額')) {
        formulaLeft = '儲值金額'
      }

      // 4. 定額顯示判斷
      const isFixed =
        typeKey === 'redenv' || (initialValues.fixedAmount || 0) > 0
      setShowFixedAmount(isFixed)

      // 5. Checkbox 狀態
      // 假設 initialValues 裡沒有 boolean，需自行判斷
      const checkAmountUnlimited = false // 需依實際資料判斷
      const limitUnlimited = (initialValues.limitPerUser || 0) > 999

      setIsCheckAmountUnlimited(checkAmountUnlimited)
      setIsLimitCountUnlimited(limitUnlimited)

      // 6. 填入表單
      form.setFieldsValue({
        ...initialValues,
        timing: timingKey,
        amountType: isFixed ? 'points' : 'formula',
        formulaLeft,
        distributeMethod: initialValues.wallet || '站內償',
        applyMethod: 'manual', // 預設值
        period: initialValues.periodStart
          ? [dayjs(initialValues.periodStart), dayjs(initialValues.periodEnd)]
          : undefined,
        checkAmounts: [1000], // 預設值
        isCheckAmountUnlimited: checkAmountUnlimited,
        isUnlimited: limitUnlimited,
      })
    }
  }, [initialValues, form])

  // 處理類型切換
  const handleTypeChange = (type: string) => {
    setDiscountType(type)

    if (type === 'privilege') {
      form.setFieldsValue({
        formulaLeft: '儲值最大值',
        timing: 'month',
        name: 'VIP2 儲值回饋',
        distributeMethod: '站內償',
        amountType: 'formula',
        applyMethod: 'manual',
      })
      setShowFixedAmount(false)
    } else if (type === 'discount') {
      form.setFieldsValue({
        formulaLeft: '儲值金額',
        depositCondition: 'first',
        timing: 'instant',
        name: '首儲送10%',
        checkAmounts: [1000],
        isCheckAmountUnlimited: false,
        distributeMethod: '站內償',
        amountType: 'formula',
        applyMethod: 'auto',
      })
      setIsCheckAmountUnlimited(false)
      setShowFixedAmount(false)
    } else if (type === 'redenv') {
      form.setFieldsValue({
        name: '代理紅包',
        timing: 'instant',
        amountType: 'points',
        fixedAmount: 5000,
        turnover: 0,
        applyMethod: 'agent_manual',
        distributeMethod: '會員錢包',
        note: '(後台專用) 線下代理私派，代理100%承擔',
      })
      setShowFixedAmount(true)
    }
  }

  // 監聽表單值變化
  const handleValuesChange = (changedValues: any) => {
    if (changedValues.isCheckAmountUnlimited !== undefined) {
      setIsCheckAmountUnlimited(changedValues.isCheckAmountUnlimited)
    }
    if (changedValues.isUnlimited !== undefined) {
      setIsLimitCountUnlimited(changedValues.isUnlimited)
    }
    if (changedValues.amountType !== undefined) {
      const type = changedValues.amountType
      setShowFixedAmount(type === 'fixed' || type === 'points')
    }
  }

  return {
    form,
    discountType,
    isCheckAmountUnlimited,
    isLimitCountUnlimited,
    showFixedAmount,
    handleTypeChange,
    handleValuesChange,
  }
}
