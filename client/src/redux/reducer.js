import { GET_DOGS, GET_DOG, GET_TEMPERAMENTS, GET_DOGS_BY_NAME, FILTER_ORIGIN, FILTER_TEMPERAMENT, ORDER } from "./action-types";
import { average } from "../utils";

const initialState = {
    dogs: [],
    allDogs: [],
    dog: {},
    temperaments: [],
    dogsByName: [],
};

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case GET_DOGS:
            return { ...state, dogs: action.payload, allDogs: action.payload };               //Retorno una copia del Estado Global, modificando sólo la propiedad deseada. allDogs es un array copia de dogs que me servirá para los filtros y ordenamientos
        case GET_DOG:
            return { ...state, dog: action.payload };
        case GET_TEMPERAMENTS:
            return { ...state, temperaments: action.payload };
        case GET_DOGS_BY_NAME:
            return { ...state, dogsByName: action.payload };
        case FILTER_ORIGIN:
            if(action.payload === 'API') {
                const apiFilter = state.allDogs.filter((dog) => dog.created === false);
                return {
                    ...state, dogs: apiFilter
                };
            } else {
                const dbFilter = state.allDogs.filter((dog) => dog.created === true);
                return {
                    ...state, dogs: dbFilter
                };
            }
        case FILTER_TEMPERAMENT:
            const dogsFiltered = state.allDogs.filter((dog) => { return dog.temperaments?.split(', ').includes(action.payload) });
            return {
                ...state, dogs: dogsFiltered
            };
        case ORDER:
            const allDogsCopy = [...state.allDogs].filter((dog) => dog.name !== 'Olde English Bulldogge' && dog.name !== 'Smooth Fox Terrier');  //Saco las dos razas que tienen NaN en su propiedad weight
            if(action.payload === 'AO' || action.payload === 'DO') {
                return {
                    ...state,
                    dogs: action.payload === 'AO' ? allDogsCopy.sort((a, b) => { 
                        if (a.name.toUpperCase() > b.name.toUpperCase()) {
                            return 1;
                        }
                        if (a.name.toUpperCase() < b.name.toUpperCase()) {
                            return -1;
                        }
                        return 0; // a must be equal to b
                    }) : allDogsCopy.sort((a, b) => { 
                        if (a.name.toUpperCase() < b.name.toUpperCase()) {
                            return 1;
                        }
                        if (a.name.toUpperCase() > b.name.toUpperCase()) {
                            return -1;
                        }
                        return 0; // a must be equal to b
                    })
                };
            } else if(action.payload === 'AW' || action.payload === 'DW') {
                return {
                    ...state,
                    dogs: action.payload === 'AW' ? allDogsCopy.sort((a, b) => { 
                        if (average(a.weight) < average(b.weight)) {
                            return 1;
                        }
                        if (average(a.weight) > average(b.weight)) {
                            return -1;
                        }
                        return 0; // a must be equal to b
                    }) : allDogsCopy.sort((a, b) => { 
                        if (average(a.weight) > average(b.weight)) {
                            return 1;
                        }
                        if (average(a.weight) < average(b.weight)) {
                            return -1;
                        }
                        return 0; // a must be equal to b
                    })
                };
            }
        break;
        default:
            return { ...state };
    }
};

export default reducer;