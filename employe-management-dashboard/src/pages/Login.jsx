import {useNavigate} from "react-router-dom"
import {login} from "../utils/auth"

const Login = () => {
    const navigate = useNavigate()
    const handleLogin = (e) => {
        e.preventDefault()
        login()
        navigate("/dashboard")
    }
    return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Username" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login

