import { createContext, useState, useEffect } from 'react';
import { IAuthContext, IProps } from '../types/AuthenticatedRouteProps.interfaces';

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: IProps) => {
    const [token, setToken] = useState<string | null>(() => {
        const savedToken = localStorage.getItem('jwt');
        return savedToken ? savedToken : null;
    });

    useEffect(() => {
        if (token) {
            localStorage.setItem('jwt', token);
        }
    }, [token]);

    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </AuthContext.Provider>
    );
};
