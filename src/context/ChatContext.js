import {createContext, useContext, useReducer} from "react";
import {AuthContext} from "./AuthContext";

export const ChatContext = createContext();

export const ChatContextProvider = ({children}) => {
    const {currentUser} = useContext(AuthContext)
    console.log(currentUser)
    const INITIAL_STATE = {
        chatId: null,
        user: {},
    }
    const chatReducer = (state, action) => {
        switch (action.type) {
            case "CHANGE_USER":
                console.log(currentUser.uid,action.payload.uid)
                return {
                    user: action.payload,
                    chatId: currentUser.uid > parseInt(action.payload.uid, 10)
                        ? currentUser.uid + action.payload.uid
                        : action.payload.uid + currentUser.uid
                }
            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE)
    return (
        <ChatContext.Provider value={{data: state, dispatch}}>
            {children}
        </ChatContext.Provider>
    );
};
