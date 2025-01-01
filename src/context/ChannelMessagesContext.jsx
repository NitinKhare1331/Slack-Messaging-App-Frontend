import { createContext, useState } from "react";

const ChannelMessagesContext = createContext();

export const ChannelMessagesContextProvider = ({  children }) => {

    const [messageList, setMessageList] = useState([]);

    return (
        <ChannelMessagesContext.Provider value={{messageList, setMessageList}}>
            {children}
        </ChannelMessagesContext.Provider>
    )
}

export default ChannelMessagesContext;