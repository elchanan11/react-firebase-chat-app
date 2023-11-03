import NavBar from "./NavBar";
import Search from "./Search";
import Chats from "./Chats";

function SideBar() {
    return (
        <div className={"sideBar"}>
               <NavBar/>
                <Search />
                <Chats />
        </div>
    )
}

export default SideBar;