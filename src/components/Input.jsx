import ImageIcon from '@mui/icons-material/Image';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import {ChatContext} from "../context/ChatContext";
import {useState} from "react";
import {doc, updateDoc, arrayUnion, serverTimestamp} from "firebase/firestore";
import {db, storage} from "../firebase";
import {v4 as uuid} from "uuid"
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";


function Input() {
    const [text, setText] = useState("")
    const [img, setImg] = useState(null)

    const {currentUser} = useContext(AuthContext)
    const {data} = useContext(ChatContext)

    const handleSend = async () => {
        if (!data || !data.chatId) {
            console.error("Data or data.chatId is falsy");
            return;
        }

        if (img) {
            const storageRef = ref(storage, uuid());
            const uploadTask = uploadBytesResumable(storageRef, img);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    // Handle progress or other snapshot events if needed
                },
                (error) => {
                    console.error('Error uploading file:', error);
                    // setError(true);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateDoc(doc(db, "chats", data.chatId), {
                            messages: arrayUnion({
                                id: uuid(),
                                text,
                                senderId: currentUser.uid,
                                date: Date.now(),
                                img: downloadURL
                            })
                        });
                    });
                }
            );

        } else {
            await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Date.now()
                })
            });
        }

        await updateDoc(doc(db, "userChats", currentUser.uid), {
            [data.chatId + ".lastMessage"]: {
                text
            },
            [data.chatId + ".date"]: serverTimestamp()
        });

        await updateDoc(doc(db, "userChats", data.user.uid), {
            [data.chatId + ".lastMessage"]: {
                text
            },
            [data.chatId + ".date"]: serverTimestamp()
        });

        setImg(null);
        setText("");
    };


    return (
        <div className={"chatInput"}>
            <input value={text}  onChange={e => setText(e.target.value)} className={"sendInput"} type={"text"} placeholder={"Type something"}/>
            <div className={"send"}>
                <AttachFileIcon />
                <input onChange={e => setImg(e.target.files[0])} type={"file"} style={{display:"none"}} id={"file"}/>
                <label htmlFor={"file"} className={"chatImportImage"}>
                    <ImageIcon fontSize={"large"} />
                </label>
                <button onClick={handleSend} className={"sendButton"}>Send</button>
            </div>
        </div>
    )
}

export default Input;