import { useEffect } from 'react'
import { Form } from 'antd'
import type { CommissionData } from '../types'
import { commissionCreate, commissionUpdate } from '../../../../api/commission'

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
        system: initialValues.system_type === 'share' ? 'share' : 'rebate',
        name: initialValues.name,
        level: initialValues.agent_level ?? 'all',
        agentName: initialValues.agent_name ?? 'all',
        ratio: initialValues.share_ratio,
        settlement:
          initialValues.settlement === 'weekly' ? 'weekly' : 'monthly',
        // 巢狀資料處理
        rebate: {
          live: initialValues.rebate_live,
          elec: initialValues.rebate_elec,
          sport: initialValues.rebate_sport,
          lottery: initialValues.rebate_lottery,
          chess: initialValues.rebate_chess,
          fish: initialValues.rebate_fish,
        },
      })
    } else {
      // 新增模式
      form.resetFields()
    }
  }, [initialValues, form])

  const handleSubmit = async () => {
    form
      .validateFields()
      .then(async (values) => {
        const payload = {
          system_type: values.system === 'share' ? 'share' : 'rebate',
          name: values.name,
          agent_level: values.level,
          agent_name: values.agentName,
          share_ratio: values.ratio,
          rebate_live: values.rebate?.live ?? 0,
          rebate_elec: values.rebate?.elec ?? 0,
          rebate_sport: values.rebate?.sport ?? 0,
          rebate_lottery: values.rebate?.lottery ?? 0,
          rebate_chess: values.rebate?.chess ?? 0,
          rebate_fish: values.rebate?.fish ?? 0,
          settlement: values.settlement === 'weekly' ? 'weekly' : 'monthly',
        }

        if (initialValues) {
          // ✏️ 修改
          await commissionUpdate(initialValues.id, payload)
        } else {
          // ➕ 新增
          await commissionCreate(payload)
        }
        onSuccess()
      })
      .catch((info) => {
        console.log('Validate Failed:', info)
      })
  }

  return { form, handleSubmit }
}
