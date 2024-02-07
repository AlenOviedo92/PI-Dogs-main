//Componente Dumb: Este componente debe mostrar la info de cada Dog mapeado y además dar un link para ir al detalle del Dog en cuestión
import style from './Card.module.css';
import { Link } from 'react-router-dom';

const Card = ({ id, image, name, temperaments, weight }) => {
    return(
        <Link to={`/detail/${id}`}>
            <div className={style.card}>
                <img src={image} alt='Dog breed'/>
                <p>Name: {name}</p>
                <p>Temperaments: {temperaments}</p>
                <p>Weight: {weight}</p>
            </div>
        </Link>
    )
};

export default Card;