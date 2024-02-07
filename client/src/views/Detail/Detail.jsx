import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getDog } from '../../redux/actions';
import style from './Detail.module.css';

const Detail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();                         //Aquí capturo el id ingresado por params

    useEffect(() => {                                   //Al montarse el componente Detail, hago el dispatch de la action que modifica la propiedad dog del Estado Global
        dispatch(getDog(id));
    }, [dispatch, id]);

    const dog = useSelector(state => state.dog);        //Aquí obtengo el dog buscado y guardado en la propiedad dog del Estado Global

    return(
        <div className={style.detail}>
            <img src={dog.image} alt='Dog breed'/>
            <p>ID: {dog.id}</p>
            <p>Name: {dog.name}</p>
            <p>Height: {dog.height}</p>
            <p>Weight: {dog.weight}</p>
            <p>Temperaments: {dog.temperaments}</p>
            <p>Life span: {dog.life_span}</p>
        </div>
    )
};

export default Detail;