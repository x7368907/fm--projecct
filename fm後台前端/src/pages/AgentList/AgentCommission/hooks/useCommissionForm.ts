import { useEffect } from 'react'
import { Form } from 'antd'
import type { CommissionData } from '../types'

interface UseCommissionFormProps {
  initialValues?: CommissionData | null
  onSuccess: () => void
}

export const useCommissionForm = ({
  initialValues,
  onSuccess,
}: UseCommissionFormProps) => {
  const [form] = Form.useForm()

  useEffect(() => {
    if (initialValues) {
      // 編輯模式：資料轉換與回填
      form.setFieldsValue({
        system: initialValues.system === '佔成制' ? 'share' : 'rebate',
        name: initialValues.name,
        level: 'all',
        agentName: 'all',
        ratio: initialValues.shareRatio,
        settlement: initialValues.settlement === '週結' ? 'week' : 'month',
        // 巢狀資料處理
        rebate: {
          live: initialValues.rebateLive,
          elec: initialValues.rebateElec,
          sport: initialValues.rebateSport,
          lottery: initialValues.rebateLottery,
          chess: initialValues.rebateChess,
          fish: initialValues.rebateFish,
        },
      })
    } else {
      // 新增模式
      form.resetFields()
    }
  }, [initialValues, form])

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        console.log(initialValues ? 'Updating:' : 'Creating:', values)
        // 這裡可以加入 API 呼叫邏輯
        onSuccess()
      })
      .catch((info) => {
        console.log('Validate Failed:', info)
      })
  }

  return { form, handleSubmit }
}
