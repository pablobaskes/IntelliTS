import axios from 'axios';

export const loginUser = async (email: string, password: string) => {
    return await axios.post('http://localhost:3000/auth/login', {
        email,
        password,
    });
};

export const registerUser = async (email: string, password: string, name: string) => {
    return await axios.post('http://localhost:3000/auth/register', {
        email,
        password,
        name,
    });
};
