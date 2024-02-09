import Cards from '../../components/Cards/Cards';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { getDogsByName, getTemperaments, originFilter, temperamentFilter, order, chagePage } from '../../redux/actions';
import { validateSearchBar } from '../../utils';
import Pagination from '../../components/Pagination/Pagination';

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
    const totalDogsSearchBar = dogsByName.length;

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

    //PAGINATION//
    const dogs = useSelector(state => state.dogs);
    const pagination = useSelector(state => state.pagination);

    const totalDogs = dogs.length;
    const pageSize = pagination?.pageSize || 8;
    const currentPage = pagination?.currentPage || 1;
    const changePage = (page) => {
        console.log('Cambiando la página a:', page);
        dispatch(chagePage(page));
    };

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalDogs);
    const visibleDogs = dogs.slice(startIndex, endIndex);
    const visibleDogsSearchBar = dogsByName.slice(startIndex, endIndex);                                    //Hace parte de la SearchBar

    return(
        <div>
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
                <option value='AW'>Descending order (weight)</option>                                         {/*OJO CON ESTE ORDEN???*/}
                <option value='DW'>Ascending order (weight)</option>
            </select>

            <div>
                {
                    !searchBar.name ? <Cards visibleDogs={visibleDogs} /> : typeof dogsByName === 'string' ? <p>{dogsByName}</p> :
                    <Cards visibleDogs={visibleDogsSearchBar} />
                }
            </div>
            
            <Pagination
                totalDogs={!searchBar.name ? totalDogs : typeof dogsByName === 'string' ? 0 : totalDogsSearchBar}
                pageSize={pageSize}
                currentPage={currentPage} 
                onPageChange={(newPage) => changePage(newPage)}    
            />
        </div>
    )
};

export default Home;