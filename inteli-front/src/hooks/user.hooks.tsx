import { useState, useEffect } from 'react';
import { User } from '../types/user.interfaces';
import { getUserById } from '../services/user.services';


const useUser = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getUserById();
                setUser(data);
                setLoading(false);
            } catch (err) {
                setError(err as any);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { user, loading, error };
};

export default useUser;
