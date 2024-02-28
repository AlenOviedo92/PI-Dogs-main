import Cards from '../../components/Cards/Cards';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { getDogsByName, getTemperaments, originFilter, temperamentFilter, order, chagePage, saveValueSearchBar } from '../../redux/actions';
import { validateSearchBar, combineFilters } from '../../utils';
import Pagination from '../../components/Pagination/Pagination';
import style from './Home.module.css';

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
        dispatch(saveValueSearchBar(searchBar.name));
        changePages(1);
    };
    
    const dogsByName = useSelector(state => state.dogsByName);
    const searchBarValue = useSelector(state => state.searchBarValue);

    //FILTER BY ORIGIN
    const handleOriginFilter = (event) => {
        dispatch(originFilter(event.target.value));
        changePages(1);                     
    };

    //FILTER BY TEMPERAMENTS//
    useEffect(() => { dispatch(getTemperaments()) }, [dispatch]);

    const temperaments = useSelector(state => state.temperaments);

    const handleTemperamentFilter = (event) => {
        dispatch(temperamentFilter(event.target.value));
        changePages(1);
    };

    //ORDER//
    const handleOrder = (event) => {
        dispatch(order(event.target.value));
        changePages(1);
    };

    //COMBINATION OF FILTERS AND SORTS//
    const filters = useSelector(state => state.filters);                                                    //Obtendo los filtros y el orden acumulados en el Estado Global
    const dogs = useSelector(state => state.dogs);

    const filteredDogs = combineFilters(dogs, filters);
    const filteredDogsSearchBar = typeof dogsByName !== 'string' ? combineFilters(dogsByName, filters) : [];                                                //Hace parte de la SearchBar
   
    //PAGINATION//
    const pagination = useSelector(state => state.pagination);
    const totalDogs = filteredDogs.length;
    const totalDogsSearchBar = filteredDogsSearchBar.length;
    const pageSize = pagination?.pageSize || 8;
    const currentPage = pagination?.currentPage || 1;
    const changePages = (page) => {
        //console.log('Cambiando la página a:', page);
        dispatch(chagePage(page));
    };

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalDogs);
    const visibleDogs = filteredDogs.length ? filteredDogs.slice(startIndex, endIndex) : 'No Search Results';
    const visibleDogsSearchBar = filteredDogsSearchBar.length ? filteredDogsSearchBar.slice(startIndex, endIndex) : 'No Search Results';                          //Hace parte de la SearchBar

    return(
        <div>
            <div className={style['searchbar-container']}>
                <div className={style['input-container']}>
                    <label className={style.label}>Breed name: </label>
                    <input type='search' value={searchBar.name} onChange={changeHandler} name='name' placeholder='search...' className={style.input}/>
                </div>
                <button type='submit' onClick={clickHandler} className={style.button}>SEND</button>
                {errors.name && <span className={style['searchbar-error']}>{errors.name}</span>}
            </div>
            
            <div className={style['buttons-container']}>
                <select onChange={handleOriginFilter}>
                    <option value='API'>Its origin is the API</option>
                    <option value='DB'>Its origin is the DB</option>
                    <option value='All'>All</option>
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
                    <option value='DW'>Ascending order (weight)</option>
                    <option value='AW'>Descending order (weight)</option>                                         {/*OJO CON ESTE ORDEN???*/}
                </select>
            </div>

            <div className={style['cards-container']}>
                {
                    !searchBarValue ? <Cards visibleDogs={visibleDogs} /> : typeof dogsByName === 'string' ? <h1 className={style.h1}>{dogsByName}</h1> :
                    <Cards visibleDogs={visibleDogsSearchBar} />
                }
            </div>
            
            <Pagination
                totalDogs={!searchBarValue ? totalDogs : typeof dogsByName === 'string' ? 0 : totalDogsSearchBar}
                pageSize={pageSize}
                currentPage={currentPage} 
                onPageChange={(newPage) => changePages(newPage)}    
            />
        </div>
    )
};

export default Home;