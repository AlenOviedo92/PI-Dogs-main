import Cards from '../../components/Cards/Cards';
import Card from '../../components/Card/Card';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { getDogsByName, getTemperaments, originFilter, temperamentFilter, order } from '../../redux/actions';
import { validateSearchBar } from '../../utils';

const Home = () => {
    //SEARCHBAR//
    const dispatch = useDispatch();
    const [searchBar, setSearchBar] = useState({
        name: '',
    });

    const [errors, setErrors] = useState({
        name: '',
    });

    const changeHandler = (event) => {
        validateSearchBar({ ...searchBar, [event.target.name]: event.target.value }, setErrors, errors);
        setSearchBar({ ...searchBar, [event.target.name]: event.target.value });
    };

    const clickHandler = (event) => {
        dispatch(getDogsByName(searchBar.name));
    };
    
    const dogsByName = useSelector(state => state.dogsByName);

    //FILTER BY ORIGIN
    const handleOriginFilter = (event) => {
        dispatch(originFilter(event.target.value));
    };

    //FILTER BY TEMPERAMENTS//
    useEffect(() => { dispatch(getTemperaments()) }, [dispatch]);

    const temperaments = useSelector(state => state.temperaments);

    const handleTemperamentFilter = (event) => {
        dispatch(temperamentFilter(event.target.value));
    };

    //ORDER//
    const handleOrder = (event) => {
        dispatch(order(event.target.value));
    };

    return(
        <div>
            <h1>Esta es la vista de Home</h1>

            <div>
                <label>Breed name: </label>
                <input type='search' value={searchBar.name} onChange={changeHandler} name='name' />
                <button type='submit' onClick={clickHandler}>SEND</button>
                {errors.name && <span>{errors.name}</span>}
            </div>

            <select onChange={handleOriginFilter}>
                <option value='API'>Its origin is the API</option>
                <option value='DB'>Its origin is the DB</option>
            </select>

            <select onChange={handleTemperamentFilter}>
                {
                    temperaments.map((temperament) => {
                        return <option key={temperament.id} value={temperament.name}>{temperament.name}</option>
                    })
                }
            </select>

            <select onChange={handleOrder}>
                <option value='AO'>Ascending order (alphabet)</option>
                <option value='DO'>Descending order (alphabet)</option>
            </select>

            <select onChange={handleOrder}>
                <option value='AW'>Descending order (weight)</option>    {/*OJO CON ESTE ORDEN???*/}
                <option value='DW'>Ascending order (weight)</option>
            </select>

            <div>
                {
                    !searchBar.name ? <Cards /> : typeof dogsByName === 'string' ? <p>{dogsByName}</p> :
                    dogsByName.map((dog) => {
                        return <Card
                            key={dog.id}
                            id={dog.id}
                            image={dog.image}
                            name={dog.name}
                            temperaments={dog.temperaments}
                            weight={dog.weight} 
                        />
                    })
                }
            </div>
        </div>
    )
};

export default Home;