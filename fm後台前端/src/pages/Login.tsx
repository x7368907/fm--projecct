import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/auth'
import { login, register, me } from '../api/auth'

type Mode = 'login' | 'register'

export default function Login() {
  const [mode, setMode] = useState<Mode>('login')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const setLoginUser = useAuthStore((state) => state.setLoginUser)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    const u = username.trim()
    const p = password

    if (!u) return setError('Username 為必填')
    if (!p.trim()) return setError('密碼為必填')

    setLoading(true)
    try {
      if (mode === 'register') {
        // ✅ 1) 先註冊
        await register(u, p)

        // ✅ 2) 註冊成功：回到登入（不自動登入、不進首頁）
        setSuccess('註冊成功！請回到登入。')
        setMode('login')

        // 可選：清掉密碼，避免註冊完還留著
        setPassword('')
        return
      }

      // ✅ 登入流程：登入成功才進首頁
      await login(u, p)

      // ✅ 拿 user（建議）
      const user = await me()
      setLoginUser(user)

      navigate('/home', { replace: true })
    } catch (err: any) {
      const msg =
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        err?.message ||
        '操作失敗，請稍後再試'
      setError(String(msg))
    } finally {
      setLoading(false)
    }
  }

  const toggleMode = () => {
    setMode((prev) => (prev === 'login' ? 'register' : 'login'))
    setError('')
    setSuccess('')
    // 可選：切換時清密碼比較合理
    setPassword('')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 rounded bg-white p-8 shadow-md"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-700">
            {mode === 'login' ? '登入' : '註冊'}
          </h2>

          <button
            type="button"
            onClick={toggleMode}
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            {mode === 'login' ? '沒有帳號？去註冊' : '已有帳號？去登入'}
          </button>
        </div>

        <div>
          <label className="block text-gray-600">Username</label>
          <input
            type="text"
            className="mt-1 w-full rounded border border-gray-300 p-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
        </div>

        <div>
          <label className="block text-gray-600">密碼</label>
          <input
            type="password"
            className="mt-1 w-full rounded border border-gray-300 p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={
              mode === 'login' ? 'current-password' : 'new-password'
            }
          />
        </div>

        {success && <p className="text-sm text-green-600">{success}</p>}
        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          className={`w-full rounded py-2 text-white ${
            loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
          }`}
          disabled={loading}
        >
          {loading
            ? mode === 'login'
              ? '登入中...'
              : '註冊中...'
            : mode === 'login'
              ? '登入'
              : '註冊'}
        </button>
      </form>
    </div>
  )
}
