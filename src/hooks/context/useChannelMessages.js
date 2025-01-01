import ChannelMessagesContext from '@/context/ChannelMessagesContext';
import { useContext } from 'react';

export const useChannelMessages = () => {
    return useContext(ChannelMessagesContext);
};