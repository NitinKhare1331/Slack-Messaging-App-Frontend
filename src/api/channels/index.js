import axios from '@/config/axiosConfig';

export const getChannelById = async ({ channelId, token }) => {
    try {
        const response = await axios.get(`/channels/${channelId}`, {
            headers: {
                'x-access-token': token
            }
        });
        return response?.data?.data;
    } catch (error) {
        console.log('Error in getChannelByIdRequest', error);
    }
}

// export const getPaginatedMessages = async ({ channelId, limit, offset, token }) => {
//     try {
//         const response = await axios.get(`/messages/${channelId}`, {
//             headers: {
//                 'x-access-token': token
//             }
//         })
//     } catch (error) {
//         console.log('Error in getChannelByIdRequest', error);
//     }
// }