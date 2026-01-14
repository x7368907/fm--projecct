import { useState } from 'react'
import type { PrivilegeDataType } from '../types'
import { MOCK_DATA } from '../utils/fakeData'

export const usePrivilegeData = () => {
  const [dataSource, setDataSource] = useState<PrivilegeDataType[]>(MOCK_DATA)

  // 這裡可以加入搜尋、過濾等邏輯
  const handleSearch = (values: any) => {
    console.log('搜尋條件:', values)
    console.log(setDataSource)
    // 實作搜尋邏輯...
  }

  return { dataSource, handleSearch }
}
