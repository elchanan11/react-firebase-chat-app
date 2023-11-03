import profileImg from"../img/profile-pic.png"


function Search() {
    return (
        <div className={"search"}>
            <div className={"searchForm"}>
                <input placeholder={"find a user"} className={"searchInput"} type={"text"}/>
            </div>
            <div className={"userChat"}>
                <img className={"searchImg"} src={profileImg} alt={""}/>
                <div className={"userChatInfo"}>
                    <span>Elchanan</span>
                </div>
            </div>
        </div>
    )
}

export default Search;