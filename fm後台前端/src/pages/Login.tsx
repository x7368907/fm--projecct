import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/auth'
// import { login } from '../api/auth'


export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
//   const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
//   const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const setLoginUser = useAuthStore((state) => state.setLoginUser)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginUser(email, password)
    navigate('/home')
    // const newErrors: typeof errors = {}
  
    // if (!email.trim()) newErrors.email = 'Email 為必填'
    // if (!password.trim()) newErrors.password = '密碼為必填'
  
    // ✅ 如果有錯誤，先設定錯誤並 return
    // if (Object.keys(newErrors).length > 0) {
    //   setErrors(newErrors)
    //   return
    // }
  
    // setErrors({}) // 清除舊錯誤
    // setLoading(true)
  
    // try {
    //    const res = await login(email, password)
    //   if (res.data.success) {
        // login(res.data.username, res.data.password)
        // navigate('/home')
    //   } else {
    //     if (res.data.message.includes('帳號')) {
    //       setErrors({ email: res.data.message })
    //     } else if (res.data.message.includes('密碼')) {
    //       setErrors({ password: res.data.message })
    //     } else {
    //       setErrors({ email: res.data.message })
    //     }
    //   }
    // } catch (err) {
    //   setErrors({ email: '伺服器錯誤，請稍後再試' })
    // }
  
    // setLoading(false)
  }
  
  


  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-700">登入</h2>

      
        <div>
          <label className="block text-gray-600">Email</label>
          <input
            type="email"
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
           {/* {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>} */}
        </div>

        <div>
          <label className="block text-gray-600">密碼</label>
          <input
            type="password"
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
           {/* {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>} */}
        </div>

        <button
          type="submit"
    className={`w-full text-white py-2 rounded ${
         'bg-blue-500 hover:bg-blue-600'
           }`}
        //   disabled={loading}
        >
          {/* {loading ? '登入中...' : '登入'} */}
          登入
        </button>
      </form>
    </div>
  )
}
