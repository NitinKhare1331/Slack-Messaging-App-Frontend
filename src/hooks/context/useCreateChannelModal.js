import CreateChannelContext from "@/context/CreateChannelContext"
import { useContext } from "react"

export const useCreateChannelModal = () => {
    return useContext(CreateChannelContext);
}