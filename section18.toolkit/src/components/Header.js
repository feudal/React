import classes from './Header.module.css';
import {authAction} from '../store/authentification';
import {useDispatch, useSelector} from "react-redux";

const Header = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    function logoutHandler(event) {
        event.preventDefault();
        dispatch(authAction.logout());
    }

    return (
        <header className={classes.header}>
            <h1>Redux Auth</h1>
            <nav>
                {isAuthenticated && <ul>
                    <li>
                        <a href='/'>My Products</a>
                    </li>
                    <li>
                        <a href='/'>My Sales</a>
                    </li>
                    <li>
                        <button onClick={logoutHandler}>Logout</button>
                    </li>
                </ul>}
            </nav>
        </header>
    );
};

export default Header;
