import profileImg from"../img/profile-pic.png"

function NavBar() {
    return (
        <div className={"navBar"}>
            <span className={"logoNav"}>EL Chat</span>
            <div className={"user"}>
                <img className={"imgNav"} src={profileImg} alt={""}/>
                <span className={"navName"}>Jhon</span>
                <button className={"buttonNav"}>logout</button>
            </div>
        </div>
    )
}

export default NavBar;