import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { getDogsByName } from '../../redux/actions';

const SearchBar = () => {
    const dispatch = useDispatch();

    const [searchBar, setSearchBar] = useState({
        name: '',
    });

    // const [errors, setErrors] = useState({
    //     name: '',
    // });

    const changeHandler = (event) => {
        setSearchBar({
            ...searchBar,
            [event.target.name]: event.target.value
        });
    };

    const clickHandler = (event) => {
        dispatch(getDogsByName(searchBar.name));
    };

    return(
            <div>
                <label>Breed name: </label>
                <input type='search' value={searchBar.name} onChange={changeHandler} name='name' />
                <button type='submit' onClick={clickHandler}>SEND</button>
            </div>
    )
};

export default SearchBar;