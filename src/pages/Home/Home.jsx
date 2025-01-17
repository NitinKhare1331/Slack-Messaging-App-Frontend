import { UserButton } from "@/components/atoms/UserButton/UserButton"
import { useFetchWorkspace } from "@/hooks/apis/workspaces/useFetchWorkspace"
import { useCreateWorkspaceModal } from "@/hooks/context/useCreateWorkspaceModal"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const Home = () => {

    const { isFetching, workspaces } = useFetchWorkspace()

    const { setOpenCreateWorkspaceModal } = useCreateWorkspaceModal();

    const navigate = useNavigate();

    useEffect(() => {

        if(isFetching) return;

        console.log("workspaces downloaded is", workspaces);
        
        if(workspaces.length === 0 || !workspaces) {
            console.log('No workspaces found, creating one');
            setOpenCreateWorkspaceModal(true);
        } else {
            navigate(`/workspaces/${workspaces[0]._id}`);
        }

    }, [ isFetching, workspaces, navigate ])

    return (
        <>
            <div className="mt-5 ml-5">
                <UserButton />
            </div>
        </>
    )
}