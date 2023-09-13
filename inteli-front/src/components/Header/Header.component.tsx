import styles from "./Header.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faRightToBracket,
    faSearch,
    faUser,
} from '@fortawesome/free-solid-svg-icons'
import { Link, useLocation } from "wouter";
import { useState } from "react";
export default function Header() {

    const [keyword, setKeyword] = useState("");
    const [, setLocation] = useLocation();

    const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        setLocation(`/search/${keyword}`);
    };

    return (
        <div>
            <nav className={`navbar navbar-expand-lg navbar-light ${styles.navbarBlack} d-flex`}>
                <Link to='/' className={styles.navbarBlackA}>
                    <img src='/logoHeader.png' alt='Logo' width='270' height='100'></img>
                </Link>
                <button
                    className='navbar-toggler'
                    type='button'
                    data-toggle='collapse'
                    data-target='#navbarSupportedContent'
                    aria-controls='navbarSupportedContent'
                    aria-expanded='false'
                    aria-label='Toggle navigation'>
                    <span className='navbar-toggler-icon'></span>
                </button>

                <div
                    className='collapse navbar-collapse justify-content-between'
                    id='navbarSupportedContent'>
                    <div className='botones'>
                        <Link to='/'>
                            <button className={`${styles.glowingBtn} ${styles.glowingBtnMarginRight}`}>
                                <span className={styles.glowingTxt}>MOVIES</span>
                            </button>
                        </Link>
                        <Link to='/'>
                            <button className={`${styles.glowingBtn} ${styles.glowingBtnMarginRight}`}>
                                <span className={styles.glowingTxt}>SERIES</span>
                            </button>
                        </Link>
                    </div>
                    <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
                        <input
                            className="form-control mr-sm-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            onChange={e => setKeyword(e.target.value)}
                        />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
                            <FontAwesomeIcon icon={faSearch} width="20" height="20" />
                        </button>
                        <Link to="/login">
                            <FontAwesomeIcon
                                icon={faRightToBracket}
                                width="40px"
                                className={styles.userIcon}
                            />
                        </Link>
                        <Link to="/profile">
                            <FontAwesomeIcon
                                icon={faUser}
                                width="40px"
                                className={styles.userIcon}
                            />
                        </Link>
                    </form>
                </div>
            </nav>
        </div>
    )
}