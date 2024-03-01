import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTemperaments, getDogs } from '../../redux/actions';
import { validate, convertArray, repeatedDog } from '../../utils';
import dotenv from 'dotenv';
import axios from 'axios';
import style from './Form.module.css';

dotenv.config();
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Form = () => {
    const dispatch = useDispatch();

    useEffect(() => { dispatch(getTemperaments()) }, [dispatch]);
    useEffect(() => { dispatch(getDogs()) }, [dispatch]);

    const temperaments = useSelector(state => state.temperaments);
    const dogs = useSelector(state => state.dogs);

    const [form, setForm] = useState({
        name: '',
        minHeight: '',
        maxHeight: '',
        minWeight: '',
        maxWeight: '',
        life_span: '',
        temperaments: [],
        image: ''
    });

    const [errors, setErrors] = useState({                                      //Creo este estado para realizar las validaciones
        name: '',
        minHeight: '',
        maxHeight: '',
        minWeight: '',
        maxWeight: '',
        life_span: '',
        temperaments: [],
        image: ''
    });

    const handleOnChange = (event) => {                                         //Para poder cambiar los inputs del form debo cambiar el estado local. Al hacer cambios en los inputs se ejecutará una fn que modifica el estado local
        const property = event.target.name;                                     //Con esta fn logro que el input sea un reflejo del estado
        const value = event.target.value;
        validate({ ...form, [property]: value }, setErrors, errors);            //Quiero validar los datos ingresados al form, cada vez que ocurra un cambio en los inputs(Por esto llamo la fn validate dentro de handleOnChange). A validate NO le paso como parámetro el estado inicial(form) sino el estado modificado{ ...form, [property]: value }, esto se hace para evitar un "delete" en los valores registrados de los inputs 
        setForm({ ...form, [property]: value });                                //Hago una copia del estado(para no perder la info de los demás inputs) y modifico el valor de la propiedad de interés(La acción de cambiar el estado demora un poco)
    };

    const selectHandler = (event) => {                                          //Con esta fn capturo las opciones de temperamnts seleccionadas por el usuario
        if(!form.temperaments.includes(event.target.value)) {
            setForm({ 
                ...form, 
                temperaments: form.temperaments.length !== 0 ? convertArray(form.temperaments.join(', ') + ', ' + event.target.value) : convertArray(event.target.value) 
            });
        } else {
            const updatedTemperaments = form.temperaments.filter((temp) => temp !== event.target.value);
            setForm({
                ...form,
                temperaments: updatedTemperaments
            });
        }                                 
    };

    const submitHandler = (event) => {
        event.preventDefault();                                                 //Para evitar que al hacer click en CREATE se recargue la página y se me borren los datos ingresados

        const newForm = {
            name: form.name,
            height: form.minHeight + ' - ' + form.maxHeight,
            weight: form.minWeight + ' - ' + form.maxWeight,
            life_span: form.life_span + ' years',
            temperaments: form.temperaments,
            image: form.image
        };
        
        if(!repeatedDog(form.name, dogs)) {                                     //Si la raza NO esta repetida, la creo
            axios.post(`${backendUrl}/dogs/`, newForm)                          //Como segundo parámetro del .post() va el form(Dog a crear)
            .then(res => alert('Successfully created dog breed'))
            .catch(err => alert(err));
        } else {
            alert('Repeated dog breed');
        }
    };

    return(
        <form onSubmit={submitHandler} id='form' className={style.form}>
            <div className={style['form-container']}> 
                <h1 className={style.h1}>CREATE DOG BREED</h1>
                <div>
                    <label>Image URL: </label>
                    <input type='text' onChange={handleOnChange} name='image' />
                </div>
                <div>
                    <label>Name: </label>
                    <input type='text' value={form.name} onChange={handleOnChange} name='name' />
                    {errors.name && <span className={style['error-name']}>{errors.name}</span>}
                </div>
                <div>
                    <label>Minimum height: </label>
                    <input type='text' value={form.minHeight} onChange={handleOnChange} name='minHeight' />

                    <label>Maximum height: </label>
                    <input type='text' value={form.maxHeight} onChange={handleOnChange} name='maxHeight' />
                    {errors.maxHeight && <span className={style['error-size']}>{errors.maxHeight}</span>}
                </div>
                <div>
                    <label>Minimum weight: </label>
                    <input type='text' value={form.minWeight} onChange={handleOnChange} name='minWeight' />

                    <label>Maximum weight: </label>
                    <input type='text' value={form.maxWeight} onChange={handleOnChange} name='maxWeight' />
                    {errors.maxWeight && <span className={style['error-size']}>{errors.maxWeight}</span>}
                </div>
                <div>
                    <label>Life span: </label>
                    <input type='text' value={form.life_span} onChange={handleOnChange} name='life_span' />
                </div>
                <div>
                    <label>Temperament: </label>
                    <select multiple onChange={selectHandler}/*size='51'*/> 
                        {temperaments.map((temperament) => {
                            return <option key={temperament.id} value={temperament.id}>{temperament.name}</option>
                        })}
                    </select>
                </div>
                <div className={style['button-container']}>
                    <button type='submit' disabled={!form.image || !form.name || !form.maxHeight || !form.minHeight || !form.maxWeight || !form.minWeight || !form.life_span || !form.temperaments.length || errors.name || errors.maxHeight || errors.minHeight || errors.maxWeight || errors.minWeight}>CREATE</button>
                </div>
            </div>
        </form>
    )
};

export default Form;