//Componente Dumb: Este componente debe mostrar la info de cada Dog mapeado y además dar un link para ir al detalle del Dog en cuestión
import style from './Card.module.css';
import { Link } from 'react-router-dom';

const Card = ({ id, image, name, temperaments, weight }) => {
    return(
        <Link to={`/detail/${id}`} className={style['link-without-underline']}>
            <div className={style.card}>
                <div className={style.back}>
                    <div className={style['card-image']}>
                        <img src={image} alt='Dog breed'/>
                    </div>
                    <div className={style['card-content']}>
                        <strong>Name: {name}</strong>
                        <p>Temperaments: {temperaments}</p>
                        <p>Weight: {weight}</p>
                    </div>
                </div>

                {/* <div className={style.front}>
                    {name}
                </div> */}
            </div>
        </Link>
    )
};

export default Card;