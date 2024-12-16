import axios from "@/config/axiosConfig";

export const createWorkspaceRequest = async ({ name, description, token }) => {
    try {
        const response = await axios.post('/workspaces', { name, description }, {
            header: {
                'x-access-token': token
            }
        })

        console.log('Response in create workspace request', response);
        
        return response?.data

    } catch (error) {
        console.log("Error in create workspace request", error);
        throw error.response.data;
    }
};

export const fetchWorkspacesRequest = async ({ token }) => {
    try {
        const response = await axios.get('/workspaces', {
            header: {
                'x-access-token': token
            }
        })

        console.log('Response in fetch workspace request', response);
        
        return response?.data

    } catch (error) {
        console.log("Error in fetch workspace request", error);
        throw error.response.data;
    }
};