import { useQuery } from '@tanstack/react-query';

import { useAuth } from '@/hooks/context/useAuth';
import { getPaginatedMessages } from '@/api/channels';

export const useGetChannelMessages = (channelId) => {
    const { auth } = useAuth();
    
    const { isFetching, isError, error, data, isSuccess  } = useQuery({
        queryFn: () => getPaginatedMessages({ channelId, limit: 20, offset: 0, token: auth?.token }),
        queryKey: ['getPaginatedMessages'],
    });
    return {
        isFetching,
        isError,
        error,
        messages: data,
        isSuccess
    };
};