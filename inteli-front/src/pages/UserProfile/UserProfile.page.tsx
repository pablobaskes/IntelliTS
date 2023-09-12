import { useLocation } from 'wouter';
import { useEffect, useState } from 'react';
import AuthenticatedRoute from '../../components/AuthenticatedRoute/AuthenticatedRoute';
import useUser from '../../hooks/user.hooks';
import { getListsByUserId } from '../../services/user.services';
import { List } from '../../types/List.interfaces';
import FavoriteMovies from '../../components/FavoriteMovies/FavoriteMovies';
import { useFavoriteMovies } from '../../hooks/Movies.hooks';

const UserProfile = () => {
    const [, setLocation] = useLocation();
    const { user, loading, error } = useUser();
    const [userLists, setUserLists] = useState<List[]>([]);
    const favoriteMovies = useFavoriteMovies();

    useEffect(() => {
        const fetchUserLists = async () => {
            if (user) {
                try {
                    const lists = await getListsByUserId(user._id);
                    setUserLists(lists);
                } catch (err) {
                    console.error("Error fetching user's lists:", err);
                }
            }
        };

        fetchUserLists();
    }, [user]);

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        setLocation('/login');
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <AuthenticatedRoute>
            <div style={{ textAlign: "center", marginTop: "50px" }}>
                <h1>UserProfile</h1>
                <p>Welcome {user?.name}, you are now logged in!</p>
                <h2>Your Lists:</h2>
                <div>
                    {userLists.map(list => (
                        <li key={list._id}>{list.name}</li>
                    ))}
                </div>
                <FavoriteMovies favoriteMovies={favoriteMovies} />
                <button
                    onClick={handleLogout}
                    className='btn btn-danger'
                    style={{ padding: "10px 20px", fontSize: "15px", cursor: "pointer", margin: "20px" }}
                >
                    Logout
                </button>
            </div>
        </AuthenticatedRoute>
    )
}

export default UserProfile;
