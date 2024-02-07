import { GET_DOGS, GET_DOG, GET_TEMPERAMENTS, GET_DOGS_BY_NAME, FILTER_ORIGIN, FILTER_TEMPERAMENT, ORDER } from './action-types';
import axios from 'axios';

export const getDogs = () => {
    return async function(dispatch) {
        const dogs = (await axios.get('http://localhost:3001/dogs/')).data;
        dispatch({ type: GET_DOGS, payload: dogs });
    };
};

export const getDog = (id) => {
    return async function(dispatch) {
        const dog = (await axios.get(`http://localhost:3001/dogs/${id}`)).data;
        dispatch({ type: GET_DOG, payload: dog });
    };
};

export const getTemperaments = () => {
    return async function(dispatch) {
        const temperaments = (await axios.get('http://localhost:3001/temperaments/')).data;
        dispatch({ type: GET_TEMPERAMENTS, payload: temperaments });
    };
};

export const getDogsByName = (name) => {
    return async function(dispatch) {
        const dogs = (await axios.get(`http://localhost:3001/dogs?name=${name}`)).data;
        dispatch({ type: GET_DOGS_BY_NAME, payload: dogs });
    };
};

export const originFilter = (origin) => {
    return { type: FILTER_ORIGIN, payload: origin };
};

export const temperamentFilter = (temperament) => {
    return { type: FILTER_TEMPERAMENT, payload: temperament};
};

export const order = (order) => {
    return { type: ORDER, payload: order};
};