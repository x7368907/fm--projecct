import instance from './axios'

/**
 * 取得代理列表（一進頁面用）
 */
/**
 * 取得代理列表（支援多重條件搜尋）
 */
export const getAgents = async (params?: {
  level?: number
  name?: string // 代理名稱
  account?: string // 代理帳號
  realName?: string // 代理姓名
  status?: string // 帳號狀態
  cashGroup?: string // 金流群組
  profitSystem?: string // 分潤制度
  regStart?: string // 註冊開始時間
  regEnd?: string // 註冊結束時間
  loginStart?: string // 登入開始時間
  loginEnd?: string // 登入結束時間
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
