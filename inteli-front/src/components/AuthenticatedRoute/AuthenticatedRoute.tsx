import { useLocation } from 'wouter';
import { AuthenticatedRouteProps } from '../../types/AuthenticatedRouteProps.interfaces';

const AuthenticatedRoute = ({ children }: AuthenticatedRouteProps) => {
    const [, setLocation] = useLocation();

    if (!localStorage.getItem('jwt')) {
        setLocation('/login');
        return null;
    }

    return <>{children}</>;
};

export default AuthenticatedRoute;
