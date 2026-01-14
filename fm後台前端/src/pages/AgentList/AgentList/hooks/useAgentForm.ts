import { useEffect } from 'react'
import { Form } from 'antd'
import type { DataType } from '../types'

interface UseAgentFormProps {
  initialValues?: DataType | null
  onSuccess: () => void
}

export const useAgentForm = ({
  initialValues,
  onSuccess,
}: UseAgentFormProps) => {
  const [form] = Form.useForm()
  const isEditMode = !!initialValues

  useEffect(() => {
    if (isEditMode && initialValues) {
      form.setFieldsValue({
        agentName: initialValues.name,
        account: initialValues.account,
        realName: initialValues.realName,
        status: initialValues.status === '啟用' ? 'active' : 'disabled',
        parentLevel: '1',
        parentAgent: 'agent1',
        defaultVip: 'vip1',
        returnWater: 'daily',
        cashGroup: 'groupA',
        agentSystem: 'share',
        profitChoice: 'type1',
      })
    } else {
      form.resetFields()
    }
  }, [initialValues, isEditMode, form])

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        console.log('Form Submit:', values)
        // TODO: 呼叫 API
        onSuccess()
      })
      .catch((info) => {
        console.log('Validate Failed:', info)
      })
  }

  return { form, isEditMode, handleSubmit }
}
