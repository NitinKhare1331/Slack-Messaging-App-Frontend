import axios from '@/config/axiosConfig';

export const signUpRequest = async ({ email, password, username }) => {
    try {
        const response = axios.post("/users/signup", {
            email,
            password,
            username
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error.response.data;
    }
}

export const signInRequest = async ({ email, password }) => {
    try {
        const response = axios.post("/users/signin", {
            email,
            username
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error.response.data;
    }
}