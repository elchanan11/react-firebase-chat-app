import {collection, doc, getDoc, getDocs, query, setDoc, where, updateDoc, serverTimestamp} from 'firebase/firestore';
import {useState} from "react";
import {db} from "../firebase";
import {AuthContext} from "../context/AuthContext";
import {useContext} from "react";
import {ChatContext} from "../context/ChatContext";

function Search() {
    const [search, setSearch] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);

    const {dispatch} = useContext(ChatContext)

    const {currentUser} = useContext(AuthContext)

    const handleSearch = async () => {
        const q = query(collection(db, "users"), where("name", "==", search));
        try {
            const querySnapshots = await getDocs(q);
            querySnapshots.forEach((doc) => {
                setUser(doc.data());
            });
        } catch (e) {
            setErr(true);
            setUser([])
        }
    };

    const handleKey = (e) => {
        e.key === "Enter" && handleSearch();
    };

    const handleSelect = async () => {
        if (user.uid && currentUser.uid) {
            const combinedId =
                parseInt(currentUser.uid, 10) >= parseInt(user.id, 10)
                    ? currentUser.uid + user.uid
                    : user.uid + currentUser.uid;
            console.log(combinedId)

            try {
                const res = await getDoc(doc(db, "chats", combinedId));
                if (!res.exists()) {
                    await setDoc(doc(db, "chats", combinedId), { messages: [] }, { merge: true });
                    const res = await getDoc(doc(db, "chats", combinedId));
                    console.log(res?.data())
                    await updateDoc(doc(db, "userChats", currentUser.uid),{
                        [combinedId+".userInfo"] : {
                            uid: user.uid,
                            name: user.name,
                            photoURL: user.photoURL
                        },
                        [combinedId+".date"]: serverTimestamp()
                    })

                    await updateDoc(doc(db, "userChats", user.uid),{
                        [combinedId+".userInfo"] : {
                            user: currentUser.uid,
                            name: currentUser.displayName,
                            photoURL: currentUser.photoURL
                        },
                        [combinedId+".date"]: serverTimestamp()
                    })
                }
            } catch (e) {
                console.log(e)
            }

            setUser(null)
            setSearch("")

            dispatch({ type: "CHANGE_USER", payload: user });
        }
    }

    return (
        <div className={"search"}>
            <div className={"searchForm"}>
                <input
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={"find a user"}
                    className={"searchInput"}
                    type={"text"}
                    onKeyDown={handleKey}
                    value={search}
                />
            </div>
            {err && <span>user not found</span>}
            {user && Object.keys(user).length > 0 && (
                <div className={"userChatWrapper"}>
                    <div className={"userChat"} onClick={handleSelect}>
                        <img className={"searchImg"} src={user.photoURL} alt={""}/>
                        <div className={"userChatInfoInput"}>
                            <span className={"searchName"}>{user.name}</span>
                            <span className={"searchEmail"}>{user.email}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Search;
