function Login() {
    return (
        <div className={"formContainer"}>
            <div className={"formWrapper"}>
                <span className={"logo"}>El Chat</span>
                <span className={"title"}>Register</span>
                <form className={"form"}>
                    <input type={"email"} placeholder={"email"}/>
                    <input type={"password"} placeholder={"password"}/>
                    <button className={"registerButton"}>Register now</button>
                </form>
                <p>Dont have an account? Login</p>
            </div>
        </div>
    )
}

export default Login;