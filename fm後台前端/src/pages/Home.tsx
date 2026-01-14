// import { useAuthStore } from '../store/auth'
// import { useNavigate } from 'react-router-dom'
// import DemoChart from '../components/DemoChart'

export default function Home() {
  // const { username, setLogoutUser } = useAuthStore()
  // const navigate = useNavigate()

  // const handleLogout = () => {
  //   setLogoutUser()
  //   navigate('/')
  // }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="">
        <h1 className="text-2xl font-bold">首頁歡迎</h1>
        {/* <button
          className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          onClick={handleLogout}
        >
          登出
        </button> */}
        <div className="p-6">{/* <DemoChart /> */}</div>
      </div>
    </div>
  )
}
