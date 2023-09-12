import { useState } from 'react';
import styles from './Login.module.css'
import {useAuth} from '../../hooks/auth.hooks';

function Login() {
    const [isLoginForm, setLogin] = useState(false);
    const { handleUsernameChange, handlePasswordChange, handleNameChange, handleLogin, handleRegister } = useAuth();

    const handleLabelClick = () => {
        setLogin(!isLoginForm);
    };

    return (
        <div className={styles.main}>
            <div className={styles.signup} style={{ transform: isLoginForm ? 'scale(.6)' : 'scale(1)' }}>
                <form onSubmit={handleRegister}>
                    <label onClick={handleLabelClick} className={styles.loginlabel}>Sign up</label>
                    <input type="text" name="txt" placeholder="User name" required className={styles.logininput} onChange={handleNameChange}/>
                    <input type="email" name="email" placeholder="Email" required className={styles.logininput} onChange={handleUsernameChange}/>
                    <input type="password" name="pswd" placeholder="Password" required className={styles.logininput} onChange={handlePasswordChange}/>
                    <button className={styles.loginbutton}>Sign up</button>
                </form>
            </div>
            <div className={styles.login} style={{ transform: isLoginForm ? 'translateY(-500px)' : 'translateY(-180px)' }}>
                <form onSubmit={handleLogin}>
                    <label onClick={handleLabelClick} className={styles.loginlabel}>Login</label>
                    <input className={styles.logininput} type="text" name="email" placeholder="Email" required onChange={handleUsernameChange}/>
                    <input className={styles.logininput} type="password" name="pswd" placeholder="Password" required onChange={handlePasswordChange}/>
                    <button className={styles.loginbutton}>Login</button>
                </form>
            </div>
        </div>
    );
}
export default Login;
