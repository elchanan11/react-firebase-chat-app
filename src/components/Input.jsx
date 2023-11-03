import ImageIcon from '@mui/icons-material/Image';
import AttachFileIcon from '@mui/icons-material/AttachFile';

function Input() {
    return (
        <div className={"chatInput"}>
            <input className={"sendInput"} type={"text"} placeholder={"Type something"}/>
            <div className={"send"}>
                <AttachFileIcon />
                <input type={"file"} style={{display:"none"}} id={"file"}/>
                <label htmlFor={"file"} className={"chatImportImage"}>
                    <ImageIcon fontSize={"large"} />
                </label>
                <button className={"sendButton"}>Send</button>
            </div>
        </div>
    )
}

export default Input;