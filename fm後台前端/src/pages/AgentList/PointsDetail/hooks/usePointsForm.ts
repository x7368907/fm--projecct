import { useState, useEffect } from 'react'
import { Form } from 'antd'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import type { PointsFormData } from '../types'
import { MOCK_RECEIVERS } from '../mock'

interface UsePointsFormProps {
  initialValues?: PointsFormData | null
  onSave: (values: any) => void
}

export const usePointsForm = ({
  initialValues,
  onSave,
}: UsePointsFormProps) => {
  const [form] = Form.useForm()

  // 選擇器狀態
  const [selectedLevel, setSelectedLevel] = useState('1')
  const [selectedIssuer, setSelectedIssuer] = useState<string | null>(null)
  const [selectedReceivers, setSelectedReceivers] = useState<string[]>([])

  // 資料回填
  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues)
      if (initialValues.issuerId) setSelectedIssuer(initialValues.issuerId)
      if (initialValues.receiverIds)
        setSelectedReceivers(initialValues.receiverIds)
    } else {
      form.resetFields()
      setSelectedIssuer(null)
      setSelectedReceivers([])
    }
  }, [initialValues, form])

  const handleFinish = (values: any) => {
    const submitData = {
      ...values,
      issuerId: selectedIssuer,
      receiverIds: selectedReceivers,
    }
    onSave(submitData)
  }

  // 接收者選擇邏輯
  const handleReceiverChange = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedReceivers((prev) => [...prev, id])
    } else {
      setSelectedReceivers((prev) => prev.filter((r) => r !== id))
    }
  }

  const handleSelectAllReceivers = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      const allIds = MOCK_RECEIVERS.map((r) => r.id)
      setSelectedReceivers(allIds)
    } else {
      setSelectedReceivers([])
    }
  }

  return {
    form,
    handleFinish,
    selectorState: {
      selectedLevel,
      setSelectedLevel,
      selectedIssuer,
      setSelectedIssuer,
      selectedReceivers,
      handleReceiverChange,
      handleSelectAllReceivers,
    },
  }
}
