import { ChannelHeader } from '@/components/molecules/Channel/ChannelHeader';
import { ChatInput } from '@/components/molecules/ChatInput/ChatInput';
import { Message } from '@/components/molecules/Message/Message';
import { useGetChannelById } from '@/hooks/apis/channels/useGetChannelById';
import { useGetChannelMessages } from '@/hooks/apis/channels/useGetChannelMessages';
import { useChannelMessages } from '@/hooks/context/useChannelMessages';
import { useSocket } from '@/hooks/context/useSocket';
import { useQueryClient } from '@tanstack/react-query';
import { Loader2, TriangleAlertIcon } from 'lucide-react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const Channel = () => {

    const queryClient = useQueryClient();

    const { channelId } = useParams();

    const { channelDetails, isFetching, isError } = useGetChannelById(channelId);

    const { messageList, setMessageList } = useChannelMessages();

    const { joinChannel } = useSocket();

    const { isSuccess, messages } = useGetChannelMessages(channelId);

    useEffect(() => {
        queryClient.invalidateQueries('getPaginatedMessages');
    }, [channelId]);

    useEffect(() => {
        if(!isFetching, !isError){
            joinChannel(channelId);
        }
    }, [isFetching, isError, joinChannel, channelId])

    useEffect(() => {
        if(isSuccess){
            console.log('channel message is fetched');
            setMessageList(messages);
        }
    }, [isSuccess, setMessageList, messages, channelId])

    if(isFetching) {
        return (
            <div className='h-full flex flex-1 items-center justify-center'>
                <Loader2 className='size-5 animate-spin text-muted-foreground'/>
            </div>
        )
    }

    if(isError) {
        return (
            <div className='h-full flex-1 flex flex-col gap-y-2 items-center justify-center'>
                <TriangleAlertIcon className='size-6 text-muted-foreground' />
                <span className='text-sm text-muted-foreground'>Channel Not found</span>
            </div>
        );
    }

    return (
        <div className='flex flex-col h-full'>
            <ChannelHeader name={channelDetails?.name} />

        {messageList?.map((message) => {
            return <Message 
                key={message?._id} 
                body={message?.body} 
                authorImage={message?.senderId?.avatar} 
                authorName={message?.senderId?.username}
                createdAt={message?.createdAt}
            />
        })}

            <div className='flex-1' />
            <ChatInput />
        </div>
    );
};