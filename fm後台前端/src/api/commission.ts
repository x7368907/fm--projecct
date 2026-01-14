import instance from './axios'

export const commission = async (params?: {
  system?: string
  settlement?: string
  ratio?: number
}) => {
  const response = await instance.get('/commission-plans', { params })
  return response.data
}

export const commissionCreate = async (payload: any) => {
  const response = await instance.post('/commission-plans', payload)
  return response.data
}

export const commissionUpdate = async (id: number, payload: any) => {
  const response = await instance.put(`/commission-plans/${id}`, payload)
  return response.data
}
