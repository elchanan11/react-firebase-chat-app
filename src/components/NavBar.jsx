import profileImg from "../img/profile-pic.png"
import {signOut} from "firebase/auth"
import {auth} from "../firebase";


function NavBar() {
    return (
        <div className={"navBar"}>
            <span className={"logoNav"}>EL Chat</span>
            <div className={"user"}>
                <img className={"imgNav"} src={profileImg} alt={""}/>
                <span className={"navName"}>Jhon</span>
                <button className={"buttonNav"} onClick={() => signOut(auth)}>logout</button>
            </div>
        </div>
    )
}

export default NavBar;