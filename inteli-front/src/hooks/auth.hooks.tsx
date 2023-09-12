import { useState } from 'react';
import { useLocation } from 'wouter';
import { loginUser, registerUser } from '../services/auth.services';
import axios from 'axios';

export const useAuth = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [, setLocation] = useLocation();

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await loginUser(username, password);

        if (response.data.checkUser) {
            localStorage.setItem('jwt', response.data.jwt);
            setLocation('/profile');
        } else {
            alert('WRONG_PASSWORD');
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const registerResponse = await registerUser(username, password, name);
            if (registerResponse.status !== 201) {
                throw new Error('Registration failed');
            }

            const loginResponse = await loginUser(username, password);
            if (!loginResponse.data.checkUser) {
                throw new Error('Login failed');
            }

            localStorage.setItem('jwt', loginResponse.data.jwt);
            setLocation('/profile');

        } catch (error) {
            console.error(error);
            alert('Registration failed');
        }
    };


    return { username, password, name, handleUsernameChange, handlePasswordChange, handleNameChange, handleLogin, handleRegister };
};


export const useAxiosInterceptors = () => {
    const [, setLocation] = useLocation();

    axios.interceptors.response.use(
        response => response,
        error => {
            if (error.response && (error.response.status === 401 || error.response.status === 400)) {
                localStorage.removeItem("jwt");
                setLocation("/login");
            }
            return Promise.reject(error);
        }
    );
};

