import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getDog, clearDog } from '../../redux/actions';
import style from './Detail.module.css';

const Detail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();                         //Aquí capturo el id ingresado por params

    useEffect(() => {                                   //Al montarse el componente Detail, hago el dispatch de la action que modifica la propiedad dog del Estado Global
        dispatch(getDog(id));
        return () => { dispatch(clearDog()) };          //Al desmontarse Detail, limpio el estado global de Detail para que al hacer click en un nuevo Detail NO se muestren datos anteriores
    }, [dispatch, id]);

    const dog = useSelector(state => state.dog);        //Aquí obtengo el dog buscado y guardado en la propiedad dog del Estado Global

    return(
        <div className={style['detail-container']}>
            <img src={dog.image} alt='Dog breed'/>
            <p><strong>ID:</strong> {dog.id}</p>
            <p><strong>Name: {dog.name}</strong></p>
            <p><strong>Height:</strong> {dog.height}</p>
            <p><strong>Weight:</strong> {dog.weight}</p>
            <p><strong>Temperaments:</strong> {dog.temperaments}</p>
            <p><strong>Life span:</strong> {dog.life_span}</p>
        </div>
    )
};

export default Detail;