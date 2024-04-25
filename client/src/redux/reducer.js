import { GET_DOGS, GET_DOG, GET_TEMPERAMENTS, GET_DOGS_BY_NAME, FILTER_ORIGIN, FILTER_TEMPERAMENT, ORDER, CHANGE_PAGE, CLEAR_DOG, SAVE_VALUE_SEARCHBAR, DELETE_DOG } from "./action-types";

const initialState = {
    dogs: [],
    allDogs: [],
    dog: {},
    temperaments: [],
    dogsByName: [],
    filters: {
        origin: 'All',
        temperament: 'All',
        order: 'None',
    },
    pagination: {
        currentPage: 1,
        pageSize: 8,
    },
    searchBarValue: '',
    removedDog: {}
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
            return { ...state, filters: { ...state.filters, origin: action.payload } };
        case FILTER_TEMPERAMENT:
            return { ...state, filters: { ...state.filters, temperament: action.payload } };
        case ORDER:
            return { ...state, filters: {...state.filters, order: action.payload } };
        case CHANGE_PAGE:
            return { ...state, pagination: { ...state.pagination, currentPage: action.payload } };
        case CLEAR_DOG:
            return { ...state, dog: {} };
        case SAVE_VALUE_SEARCHBAR:
            return { ...state, searchBarValue: action.payload };
        case DELETE_DOG:
            return { ...state, removedDog: action.payload }
        default:
            return { ...state };
    }
};

export default reducer;