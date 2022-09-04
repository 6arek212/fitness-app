import { useState } from "react";
import useLogin from "../hooks/useLogin";


const Login = () => {
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const { login, isLoading, error } = useLogin()

    const onLogin = async (e) => {
        e.preventDefault()
        await login(phone, password)
    }



    return (
        <div className="login">

            <div className="left">
                <div className="container">
                    <h1>This Is My</h1>
                    <h1>Happy</h1>
                    <h1>Hour</h1>
                    <h2>Let's Do it</h2>
                </div>
            </div>


            <div className="right">
                <div className="container">
                    <div className="logo"></div>

                    <h2>LOGIN</h2>

                    <form onSubmit={onLogin}>

                        <label>Phone</label>
                        <input
                            type="text"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />


                        <label>Password</label>
                        <input
                            type="text"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />


                        <div className="remember-me">
                            <input type="checkbox" />
                            <label> Remember Me</label>
                        </div>


                        <button disabled={isLoading}>Login</button>
                        {error && <div className="error">{error}</div>}

                    </form>

                </div>
            </div>

        </div>
    );
}

export default Login;