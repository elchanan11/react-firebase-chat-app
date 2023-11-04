import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

function Message({ message }) {
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const ref = useRef();

    useEffect(() => {
        // Ensure the ref is attached to the outermost div
        ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);

    return (
        <div className={`message ${message.senderId === currentUser.uid && "owner"}`} ref={ref}>
            <div className={"messageInfo"}>
                <img
                    className={"imageMessageInfo"}
                    src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL}
                    alt={""}
                />
                <span className={"messageInfoTime"}>Just Now</span>
            </div>
            <div className={"messageContent"}>
                <p className={"messageContentText"}>{message?.text}</p>
                {message.img && (
                    <img className={"imageMessageContent"} src={message.img} alt={""} />
                )}
            </div>
        </div>
    );
}

export default Message;
