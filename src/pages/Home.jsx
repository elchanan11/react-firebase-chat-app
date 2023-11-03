import SideBar from "../components/SIdeBar";
import Chats from "../components/Chats";
import Chat from "../components/Chat";

function Home() {
    return (
        <div className={"home"}>
           <div className={"container"}>
                <SideBar/>
               <Chat/>
           </div>
        </div>
    )
}

export default Home;