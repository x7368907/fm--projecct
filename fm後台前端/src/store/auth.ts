import { create } from 'zustand'

export interface AuthUser {
  id: number
  username: string
  role: string
  is_active: boolean
}

interface AuthState {
  isLoggedIn: boolean
  user: AuthUser | null

  setLoginUser: (user: AuthUser) => void
  setLogoutUser: () => void
  initializeAuth: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  user: null,

  setLoginUser: (user) => {
    // token 由 login() 存到 localStorage：access_token
    localStorage.setItem('user', JSON.stringify(user))
    set({ isLoggedIn: true, user })
  },

  setLogoutUser: () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('user')
    set({ isLoggedIn: false, user: null })
  },

  initializeAuth: () => {
    const token = localStorage.getItem('access_token')
    const userStr = localStorage.getItem('user')

    if (!token) {
      set({ isLoggedIn: false, user: null })
      return
    }

    // 有 token 就先視為登入中；user 有就載入
    if (userStr) {
      try {
        const user = JSON.parse(userStr) as AuthUser
        set({ isLoggedIn: true, user })
      } catch {
        set({ isLoggedIn: true, user: null })
      }
    } else {
      set({ isLoggedIn: true, user: null })
    }
  },
}))
