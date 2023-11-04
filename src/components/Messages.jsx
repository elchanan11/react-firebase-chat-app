import Message from "./Message";
import {useContext} from "react";
import {ChatContext} from "../context/ChatContext";
import {useEffect, useState} from "react";
import {db} from "../firebase";
import {doc, onSnapshot} from "firebase/firestore";

function Messages() {
    const [messages, setMessages] = useState([])
    const {data: data} = useContext(ChatContext)

    useEffect(() => {
        if (data.chatId) {
            console.log(data.chatId)
            const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
                doc.exists() && setMessages(doc.data().messages)
            });
            console.log(messages)
            return () => {
                unsub()
            }
        }
    }, [data.chatId])

    return (
        <div className={"messages"}>
            {messages?.map(message => (
                <Message message={message} key={message.id}/>
            ))}
        </div>
    )
}

export default Messages;
