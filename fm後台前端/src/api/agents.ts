import instance from './axios'

/**
 * 取得代理列表（一進頁面用）
 */
export const getAgents = async (params?: {
  level?: number
  status?: 'enabled' | 'disabled'
  keyword?: string
  page?: number
  page_size?: number
}) => {
  const response = await instance.get('/agents', { params })
  return response.data
}

/**
 * 新增代理
 */
export const createAgent = async (payload: any) => {
  const response = await instance.post('/agents', payload)
  return response.data
}

/**
 * 更新代理（啟用 / 停用 / 編輯）
 */
export const updateAgent = async (id: number, payload: any) => {
  const response = await instance.put(`/agents/${id}`, payload)
  return response.data
}

/**
 * 取得下層代理（點 1/5(3) 用）
 */
export const getSubAgents = async (
  parentId: number,
  params?: { page?: number; page_size?: number }
) => {
  const response = await instance.get(`/agents/${parentId}/children`, {
    params,
  })
  return response.data
}
