import { useState } from 'react'
import { message } from 'antd'

export const useChangeLineForm = (onCancel: () => void) => {
  const [sourceAgent, setSourceAgent] = useState('')
  const [targetAgent, setTargetAgent] = useState('')
  const [selectedMemberKeys, setSelectedMemberKeys] = useState<React.Key[]>([])

  const handleSave = () => {
    // 這裡可以加入驗證邏輯
    message.success('新增換線成功！')
    onCancel()
  }

  return {
    sourceAgent,
    setSourceAgent,
    targetAgent,
    setTargetAgent,
    selectedMemberKeys,
    setSelectedMemberKeys,
    handleSave,
  }
}
