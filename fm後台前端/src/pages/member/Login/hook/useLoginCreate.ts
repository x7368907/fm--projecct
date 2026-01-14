import { useState, useEffect } from 'react'
import type { BlocklistData } from '../types'

// 預設假資料 (新增模式用)
const mockIpData: BlocklistData[] = [
  {
    key: '1',
    tag: 'IP黑名單',
    agentLevel: '1 / 5',
    agentName: 'FMCA04(主站-總代)',
    account: '0976061431',
    privilege: 'VIP1 一般會員',
    name: '洪偉庭',
    registerTime: '2025/04/05 12:59:49',
    loginTime: '2025/05/28 14:13:14',
    daysOffline: 32,
    country: 'Taiwan',
    city: 'Taichung',
    duplicateValue: '1.170.136.149',
    status: '停用',
    remark: '',
  },
  {
    key: '2',
    tag: 'IP黑名單',
    agentLevel: '1 / 5',
    agentName: 'damn1688',
    account: '0903639752',
    privilege: 'VIP1 一般會員',
    name: '陳韋翔',
    registerTime: '2025/04/05 12:59:46',
    loginTime: '2025/05/29 14:19:55',
    daysOffline: 32,
    country: 'Taiwan',
    city: 'Taichung',
    duplicateValue: '1.170.136.149',
    status: '停用',
    remark: '',
  },
]

const mockDeviceData: BlocklistData[] = [
  {
    key: '3',
    tag: '裝置黑名單',
    agentLevel: '1 / 5',
    agentName: 'FB01',
    account: '0983588457',
    privilege: 'VIP5 黃金會員',
    name: '紀博凱',
    registerTime: '2025/04/05 12:44:15',
    loginTime: '2025/06/04 15:00:28',
    daysOffline: 32,
    country: 'Taiwan',
    city: 'Taichung',
    duplicateValue: '04dd3ca0249138c8ed2bce9217adc9d5',
    status: '停用',
    remark: '',
  },
]

export const useLoginCreate = (
  mode: 'create' | 'edit',
  initialValues?: any
) => {
  const [ipData, setIpData] = useState<BlocklistData[]>([])
  const [deviceData, setDeviceData] = useState<BlocklistData[]>([])

  useEffect(() => {
    if (mode === 'edit' && initialValues) {
      // 編輯模式：將傳入的單筆資料轉換為 Table 格式
      const editItem: BlocklistData = {
        key: initialValues.key,
        tag: initialValues.ip ? 'IP黑名單' : '裝置黑名單',
        agentLevel: initialValues.agentLevel,
        agentName: initialValues.agentName,
        account: initialValues.account,
        privilege: initialValues.privilege || 'VIP1',
        name: initialValues.name,
        registerTime: initialValues.registerTime,
        loginTime: initialValues.loginTime,
        daysOffline: initialValues.daysOffline,
        country: initialValues.country,
        city: initialValues.city,
        duplicateValue: initialValues.ip || initialValues.deviceId || '-',
        status: initialValues.status,
        remark: '編輯模式帶入資料...',
      }

      if (initialValues.ip) {
        setIpData([editItem])
        setDeviceData([])
      } else {
        setIpData([])
        setDeviceData([editItem])
      }
    } else {
      // 新增模式：載入預設假資料
      setIpData(mockIpData)
      setDeviceData(mockDeviceData)
    }
  }, [mode, initialValues])

  const handleSave = () => {
    console.log('Save Data:', { ipData, deviceData })
    // 這裡可以呼叫 API
  }

  return { ipData, deviceData, handleSave }
}
