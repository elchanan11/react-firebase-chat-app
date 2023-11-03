import VideocamIcon from '@mui/icons-material/Videocam';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Messages from "./Messages";
import Input from "./Input";

function Chat() {
    return (
        <div className={"chat"}>
            <div className={"classInfo"}>
                <span className={"chatName"}>Elchanan</span>
                <div className={"chatIcons"}>
                    <VideocamIcon />
                    <PersonAddIcon />
                    <MoreHorizIcon />
                </div>
            </div>
            <Messages />
            <Input />
        </div>
    )
}

export default Chat;