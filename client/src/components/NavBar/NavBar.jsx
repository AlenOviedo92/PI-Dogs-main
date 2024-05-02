//Es la barra para poder navegar
import { Link, useLocation } from 'react-router-dom';
import style from './NavBar.module.css';

const NavBar = () => {
    const location = useLocation();

    const handlerClick = () => {
        window.location.reload();
    };

    return(
        <>
            <div className={style.landingButton}>
                <Link to={location.pathname === '/home' ? '/' : '/home'}>{'<'}</Link>
                {location.pathname === '/home' ? <button onClick={handlerClick} className={style.resetButton}>RESET SEARCH</button> : null }
            </div>
            <div className={style.mainContainer}>
                <Link to='/home'>HOME</Link>
                <Link to='/create'>FORM</Link>
            </div>
        </>
    )
};

export default NavBar;