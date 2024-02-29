//Componente Smart: Este componente se encarga de tomar un array de dogs y por cada dog renderiza un componente Card
import Card from '../Card/Card';
import style from './Cards.module.css';
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { getDogs } from '../../redux/actions';

const Cards = ({ visibleDogs }) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);               // Estado para indicar si los datos se están cargando

    useEffect(() => {                                               //Al montar el componente Cards quiero que los dogs vayan al Estado Global y que estén listos para mostrarse
        dispatch(getDogs())
        .then(() => setIsLoading(false))                            // Una vez que la carga de datos está completa, establece isLoading en falso
        .catch(error => {
            setIsLoading(false);                                    // Asegúrate de manejar cualquier error aquí
            console.error('Error fetching dogs:', error);
        })
    }, [dispatch]);                                                 //Agredo dispatch al array de dependencias para quitar el warning mostrado
    
    return(
        <div>
            {isLoading ? <h1 className={style.h1}>Loading...</h1> :
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
            }
        </div>
    )
};

export default Cards;