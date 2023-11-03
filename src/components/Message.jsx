import profileImg from "../img/profile-pic.png";

function Message() {
    return (
        <div className={"message owner"}>
            <div className={"messageInfo"}>
                <img className={"imageMessageInfo"} src={profileImg} alt={""}/>
                <span className={"messageInfoTime"}>Just Now</span>
            </div>
            <div className={"messageContent"}>
                <p className={"messageContentText"}>Hello</p>
                <img className={"imageMessageContent"} src={profileImg} alt={""}/>
            </div>
        </div>
    )
}

export default Message;