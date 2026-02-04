import instance from './axios'

export interface LoginResponse {
  access_token: string
  token_type: 'bearer'
}

export interface MeResponse {
  id: number
  username: string
  role: string
  is_active: boolean
}

export interface RegisterResponse {
  id: number
  username: string
  role: string
  is_active: boolean
}

// ✅ 登入
export const login = async (username: string, password: string) => {
  const res = await instance.post<LoginResponse>('/auth/login', {
    username,
    password,
  })

  localStorage.setItem('access_token', res.data.access_token)
  return res.data
}

// ✅ 註冊
export const register = async (username: string, password: string) => {
  const res = await instance.post<RegisterResponse>('/auth/register', {
    username,
    password,
  })
  return res.data
}

// ✅ 取得目前登入者
export const me = async () => {
  const res = await instance.get<MeResponse>('/auth/me')
  localStorage.setItem('user', JSON.stringify(res.data))
  return res.data
}

export const logout = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('user')
}
