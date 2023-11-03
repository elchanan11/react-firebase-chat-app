function Reagister() {
    return (
        <div className={"formContainer"}>
            <div className={"formWrapper"}>
                <span className={"logo"}>El Chat</span>
                <span className={"title"}>Register</span>
                <form className={"form"}>
                    <input type={"text"} placeholder={"display name"}/>
                    <input type={"email"} placeholder={"email"}/>
                    <input type={"password"} placeholder={"password"}/>
                    <input style={{display:"none"}} type={"file"} id={"file"}/>
                    <label className={"label"} htmlFor={"file"}>
                        <span >Add an avatar</span>
                    </label>
                    <button className={"registerButton"}>Register now</button>
                </form>
                <p>Have an account? Login</p>
            </div>
        </div>
    )
}

export default Reagister;