import VideocamIcon from '@mui/icons-material/Videocam';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Messages from "./Messages";
import Input from "./Input";
import {useContext} from "react";
import {ChatContext} from "../context/ChatContext";

function Chat() {
    const {data: data} = useContext(ChatContext)
    console.log(data)
    return (
        <div className={"chat"}>
            <div className={"classInfo"}>
                <span className={"chatName"}>{data?.user.name}</span>
                <div className={"chatIcons"}>
                    <VideocamIcon/>
                    <PersonAddIcon/>
                    <MoreHorizIcon/>
                </div>
            </div>
            <Messages/>
            <Input/>
        </div>
    )
}

export default Chat;