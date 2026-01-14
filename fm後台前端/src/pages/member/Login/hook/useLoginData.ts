import { useState } from 'react'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import type { MemberLoginType } from '../types'
import { MOCK_DATA } from '../utils/fakeData'

export const useLoginData = () => {
  const [dataSource, setDataSource] = useState<MemberLoginType[]>(MOCK_DATA)

  // 取得所有 Key，用於全選
  const allKeys = dataSource.map((item) => item.key)

  // --- IP 勾選邏輯 ---
  const [selectedIpKeys, setSelectedIpKeys] = useState<React.Key[]>([])

  const isAllIpSelected =
    selectedIpKeys.length === allKeys.length && allKeys.length > 0
  const isIpIndeterminate =
    selectedIpKeys.length > 0 && selectedIpKeys.length < allKeys.length

  const handleSelectAllIp = (e: CheckboxChangeEvent) => {
    setSelectedIpKeys(e.target.checked ? allKeys : [])
  }

  const handleSelectIp = (key: string, checked: boolean) => {
    if (checked) {
      setSelectedIpKeys((prev) => [...prev, key])
    } else {
      setSelectedIpKeys((prev) => prev.filter((k) => k !== key))
    }
  }

  // --- Device 勾選邏輯 ---
  const [selectedDeviceKeys, setSelectedDeviceKeys] = useState<React.Key[]>([])

  const isAllDeviceSelected =
    selectedDeviceKeys.length === allKeys.length && allKeys.length > 0
  const isDeviceIndeterminate =
    selectedDeviceKeys.length > 0 && selectedDeviceKeys.length < allKeys.length

  const handleSelectAllDevice = (e: CheckboxChangeEvent) => {
    setSelectedDeviceKeys(e.target.checked ? allKeys : [])
  }

  const handleSelectDevice = (key: string, checked: boolean) => {
    if (checked) {
      setSelectedDeviceKeys((prev) => [...prev, key])
    } else {
      setSelectedDeviceKeys((prev) => prev.filter((k) => k !== key))
    }
  }

  const handleSearch = (values: any) => {
    console.log('Search:', values)
    console.log(setDataSource)
    // 實作搜尋邏輯...
  }

  return {
    dataSource,
    handleSearch,
    // IP 相關狀態與函式
    ipState: {
      selectedKeys: selectedIpKeys,
      isAllSelected: isAllIpSelected,
      isIndeterminate: isIpIndeterminate,
      onSelectAll: handleSelectAllIp,
      onSelect: handleSelectIp,
    },
    // Device 相關狀態與函式
    deviceState: {
      selectedKeys: selectedDeviceKeys,
      isAllSelected: isAllDeviceSelected,
      isIndeterminate: isDeviceIndeterminate,
      onSelectAll: handleSelectAllDevice,
      onSelect: handleSelectDevice,
    },
  }
}
