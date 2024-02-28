import { GET_DOGS, GET_DOG, GET_TEMPERAMENTS, GET_DOGS_BY_NAME, FILTER_ORIGIN, FILTER_TEMPERAMENT, ORDER, CHANGE_PAGE, CLEAR_DOG, SAVE_VALUE_SEARCHBAR } from './action-types';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const getDogs = () => {
    return async function(dispatch) {
        const dogs = (await axios.get(`${backendUrl}/dogs/`)).data;
        dispatch({ type: GET_DOGS, payload: dogs });
    };
};

export const getDog = (id) => {
    return async function(dispatch) {
        try {
            const dog = (await axios.get(`${backendUrl}/dogs/${id}`)).data;
            dispatch({ type: GET_DOG, payload: dog });
        
        } catch (error) {
            alert('Hay un error en el ID, recargar la página');
        }
    }; 
};

export const getTemperaments = () => {
    return async function(dispatch) {
        const temperaments = (await axios.get(`${backendUrl}/temperaments/`)).data;
        dispatch({ type: GET_TEMPERAMENTS, payload: temperaments });
    };
};

export const getDogsByName = (name) => {
    return async function(dispatch) {
        const dogs = (await axios.get(`${backendUrl}/dogs?name=${name}`)).data;
        dispatch({ type: GET_DOGS_BY_NAME, payload: dogs });
    };
};

export const originFilter = (origin) => {
    return { type: FILTER_ORIGIN, payload: origin };
};

export const temperamentFilter = (temperament) => {
    return { type: FILTER_TEMPERAMENT, payload: temperament };
};

export const order = (order) => {
    return { type: ORDER, payload: order };
};

export const chagePage = (page) => {
    return { type: CHANGE_PAGE, payload: page };
};

export const clearDog = () => {
    return { type: CLEAR_DOG };
};

export const saveValueSearchBar = (name) => {
    return { type: SAVE_VALUE_SEARCHBAR, payload: name };
};