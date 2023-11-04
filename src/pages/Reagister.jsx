import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import {auth, storage, db} from "../firebase";
import {useState} from "react";
import {CircularProgress} from "@mui/material";
import {
    Link,
    useNavigate,
} from 'react-router-dom';

function Reagister() {
    const navigate = useNavigate()

    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0]

        try {
            setLoading(true)
            const res = await createUserWithEmailAndPassword(auth, email, password);

            const storageRef = ref(storage, displayName);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    // Handle progress or other snapshot events if needed
                },
                (error) => {
                    console.error('Error uploading file:', error);
                    setError(true);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL
                        });
                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            name: displayName,
                            email: email,
                            photoURL: downloadURL
                        });
                        await setDoc(doc(db, "userChats", res.user.uid), {});
                    });
                }
            );
            setLoading(false)
            navigate("/")
        } catch (err) {
            console.error('Error creating user:', err);
            setLoading(false)
            setError(true);
        }
    };

    return (
        <div className={"formContainer"}>
            <div className={"formWrapper"}>
                <span className={"logo"}>El Chat</span>
                <span className={"title"}>Register</span>
                <form className={"form"} onSubmit={handleSubmit}>
                    <input type={"text"} placeholder={"display name"}/>
                    <input type={"email"} placeholder={"email"}/>
                    <input type={"password"} placeholder={"password"}/>
                    <input style={{display: "none"}} type={"file"} id={"file"}/>
                    <label className={"label"} htmlFor={"file"}>
                        <span>Add an avatar</span>
                    </label>
                    <button disabled={loading} className={"registerButton"}>{ !loading ? "Register now" : <CircularProgress fontSize={"small"} />}</button>
                </form>
                {error && <span>Something  went wrong...</span>}
                <p><Link to={"/login"}>Have an account? Login</Link></p>
            </div>
        </div>
    )
}

export default Reagister;