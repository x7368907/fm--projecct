import { create } from 'zustand'

interface AuthState {
  isLoggedIn: boolean
  username: string
  password: string
  setLoginUser: (username: string, password: string) => void
  setLogoutUser: () => void
  initializeAuth: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  username: '',
  password: '',

  setLoginUser: (username, password) => {
    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('username', username)
    localStorage.setItem('password', password)
    set({ isLoggedIn: true, username, password })
  },

  setLogoutUser: () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('username')
    localStorage.removeItem('password')
    set({ isLoggedIn: false, username: '', password: '' })
  },

  initializeAuth: () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
    const username = localStorage.getItem('username') || ''
    const password = localStorage.getItem('password') || ''
    if (isLoggedIn && username && password) {
      set({ isLoggedIn: true, username, password })
    }
  },
}))
