import {useNavigate, Link} from "react-router-dom";
import {useState} from "react";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../firebase";
import {CircularProgress} from "@mui/material";

function Login() {
    const navigate = useNavigate()

    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const email = e.target[0].value;
        const password = e.target[1].value;

        try{
            setLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
            setLoading(false)
            navigate("/")
        }catch (err) {
            setLoading(false)
            setError(true)
        }
    }

    return (
        <div className={"formContainer"}>
            <div className={"formWrapper"}>
                <span className={"logo"}>El Chat</span>
                <span className={"title"}>Login</span>
                <form className={"form"} onSubmit={handleSubmit}>
                    <input type={"email"} placeholder={"email"}/>
                    <input type={"password"} placeholder={"password"}/>
                    <button disabled={loading}  className={"registerButton"}>{
                        loading ?
                            <CircularProgress/> : "Register now"
                    }
                    </button>
                </form>
                <p><Link to={"/register"}>Dont have an account? Register</Link></p>
            </div>
        </div>
    )
}

export default Login;