//Componente Smart: Este componente se encarga de tomar un array de dogs y por cada dog renderiza un componente Card
import Card from '../Card/Card';
import style from './Cards.module.css';
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { getDogs } from '../../redux/actions';

const Cards = ({ visibleDogs }) => {
    const dispatch = useDispatch();

    useEffect(() => {                                       //Al montar el componente Cards quiero que los dogs vayan al Estado Global y que estén listos para mostrarse
        dispatch(getDogs());
    }, [dispatch]);                                         //Agredo dispatch al array de dependencias para quitar el warning mostrado
    
    return(
        <div className={style.container}>
            {typeof visibleDogs === 'string' ? <h1 className={style.h1}>{visibleDogs}</h1> : visibleDogs.map((dog) => {
                return (
                    <div key={dog.id}>
                        <Card
                            key={dog.id}
                            id={dog.id}
                            image={dog.image}
                            name={dog.name}
                            height={dog.height}
                            weight={dog.weight}
                            life_span={dog.life_span}
                            temperaments={dog.temperaments}
                        />
                    </div>
                )
            })}
        </div>
    )
};

export default Cards;