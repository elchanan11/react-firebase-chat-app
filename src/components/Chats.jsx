import {doc, getDoc, onSnapshot} from "firebase/firestore";
import {useContext, useEffect, useState} from "react";
import {db} from "../firebase";
import {AuthContext} from "../context/AuthContext";
import {Person} from "@mui/icons-material";

function Chats() {
    const [chats, setChats] = useState([])
    const {currentUser} = useContext(AuthContext)

    useEffect(() => {
        const getChats = async () => {
            try {
                const docSnapshot = await getDoc(doc(db, "userChats", currentUser.uid));

                if (docSnapshot.exists()) {
                    setChats(docSnapshot.data());
                } else {
                    // Handle the case when the document doesn't exist
                    console.log("Document does not exist");
                }
            } catch (error) {
                // Handle any errors that might occur during the data retrieval
                console.error("Error getting chats:", error);
            }
        };

        // Only fetch chats if currentUser.uid is available
        currentUser.uid && getChats();
    }, [currentUser.uid]);

    return (
        <div className={"chats"}>
            {Object.entries(chats)?.map(chat => (
                <div className={"userChat"} key={chat[0]}>
                    <img className={"searchImg"} src={chat[1].userInfo.photoUrl ? chat[1].userInfo.photoUrl : <Person />} alt={""}/>
                    <div className={"userChatInfo"}>
                        <span className={"userChatName"}>{chat[1].userInfo.name}</span>
                        <p className={"chatsMessage"}>HelloQ!</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Chats;