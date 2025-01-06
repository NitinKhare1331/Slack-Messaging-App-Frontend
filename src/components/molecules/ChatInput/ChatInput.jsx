import { getPresignedUrl, uploadImageToAWSpresignedUrl } from "@/api/s3";
import { Editor } from "@/components/atoms/Editor/Editor"
import { useAuth } from "@/hooks/context/useAuth";
import { useCurrentWorkspace } from "@/hooks/context/useCurrentWorkspace";
import { useSocket } from "@/hooks/context/useSocket";
import { useQueryClient } from "@tanstack/react-query";

export const ChatInput = () => {

    const { socket, currentChannel } = useSocket();
    const { auth } = useAuth();
    const { currentWorkspace } = useCurrentWorkspace();
    const queryclient = useQueryClient();

    async function handleSubmit({ body, image }) {
        console.log(body, image);
        let fileUrl = null;
        if(image) {
            const preSignedUrl = await queryclient.fetchQuery({
                queryFn: () => getPresignedUrl({ token: auth?.token }),
                queryKey: ['getPresignedUrl']
            });

            console.log("Presigned url",preSignedUrl);
            const responseAws = await uploadImageToAWSpresignedUrl({
                url: preSignedUrl,
                file: image
            });
            console.log('file upload success', responseAws);
            fileUrl = preSignedUrl.split('?')[0];
        }
        socket?.emit('NewMessage', {
            channelId: currentChannel,
            body,
            image: fileUrl,
            senderId: auth?.user?._id,
            workspaceId: currentWorkspace?._id
        }, (data) => {
            console.log('Message sent', data);
        });
    }

    return (
        <div
            className="px-5 w-full"
        >
            <Editor 
                placeholder="Type a message..."
                onSubmit={handleSubmit}
                onCancel={() => {}}
                disabled={false}
                defaultValue=""

            />
        </div>
    );
}