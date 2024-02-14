import style from './Landing.module.css';
import { Link } from 'react-router-dom';

const Landing = () => {
    return(
        <div className={style['landing-container']}>
            <Link to='/home' className={style['link-to-home']}>GO TO HOME</Link>
        </div>
    )
};

export default Landing;