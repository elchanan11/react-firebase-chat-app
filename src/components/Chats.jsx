import profileImg from "../img/profile-pic.png";

function Chats() {
    return (
        <div className={"chats"}>
            <div className={"userChat"}>
                <img className={"searchImg"} src={profileImg} alt={""}/>
                <div className={"userChatInfo"}>
                    <span className={"userChatName"}>Elchanan</span>
                    <p className={"chatsMessage"}>HelloQ!</p>
                </div>
            </div>
        </div>
    )
}

export default Chats;