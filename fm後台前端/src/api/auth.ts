import instance from './axios'

export const login = async (email: string, password: string) => {
  const response = await instance.post('/login', { email, password })

  const { token, user } = response.data

  // ✅ 儲存到 localStorage，確保重新整理後不會丟失登入狀態
  localStorage.setItem('token', token)
  localStorage.setItem('user', JSON.stringify(user))

  return response.data
}

export const logout = async () => {
  const response = await instance.post('/logout')

  // ✅ 清除 localStorage 的登入資訊
  localStorage.removeItem('token')
  localStorage.removeItem('user')

  return response.data
}
