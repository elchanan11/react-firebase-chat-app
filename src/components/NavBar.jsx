import {signOut} from "firebase/auth"
import {auth} from "../firebase";
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import {Person} from "@mui/icons-material";

function NavBar() {
    const {currentUser} = useContext(AuthContext)

    return (
        <div className={"navBar"}>
            <span className={"logoNav"}>EL Chat</span>
            <div className={"user"}>
                <img className={"imgNav"} src={currentUser.photoURL ? currentUser.photoURL : <Person/>} alt={""}/>
                <span className={"navName"}>{currentUser.displayName}</span>
                <button className={"buttonNav"} onClick={() => signOut(auth)}>logout</button>
            </div>
        </div>
    )
}

export default NavBar;