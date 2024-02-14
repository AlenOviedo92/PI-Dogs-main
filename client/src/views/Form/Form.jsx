import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTemperaments } from '../../redux/actions';
import axios from 'axios';
import { validate, convertArray } from '../../utils';
import style from './Form.module.css';

const Form = () => {
    const dispatch = useDispatch();

    useEffect(() => { dispatch(getTemperaments()) }, [dispatch]);

    const temperaments = useSelector(state => state.temperaments);

    const [form, setForm] = useState({
        name: '',
        minHeight: '',
        maxHeight: '',
        minWeight: '',
        maxWeight: '',
        life_span: '',
        temperament: []
    });

    const [errors, setErrors] = useState({                                      //Creo este estado para realizar las validaciones
        name: '',
        minHeight: '',
        maxHeight: '',
        minWeight: '',
        maxWeight: '',
        life_span: '',
        temperament: []
    });

    const handleOnChange = (event) => {                                         //Para poder cambiar los inputs del form debo cambiar el estado local. Al hacer cambios en los inputs se ejecutará una fn que modifica el estado local
        const property = event.target.name;                                     //Con esta fn logro que el input sea un reflejo del estado
        const value = event.target.value;
        validate({ ...form, [property]: value }, setErrors, errors);            //Quiero validar los datos ingresados al form, cada vez que ocurra un cambio en los inputs(Por esto llamo la fn validate dentro de handleOnChange). A validate NO le paso como parámetro el estado inicial(form) sino el estado modificado{ ...form, [property]: value }, esto se hace para evitar un "delete" en los valores registrados de los inputs 
        setForm({ ...form, [property]: value });                                //Hago una copia del estado(para no perder la info de los demás inputs) y modifico el valor de la propiedad de interés(La acción de cambiar el estado demora un poco)
    };

    const selectHandler = (event) => {                                          //Con esta fn capturo las opciones de temperamnts seleccionadas por el usuario                                     
        setForm({ 
            ...form, 
            temperament: form.temperament.length !== 0 ? convertArray(form.temperament.join(', ') + ', ' + event.target.value) : convertArray(event.target.value) 
        });
    };

    const submitHandler = (event) => {
        event.preventDefault();                                                 //Para evitar que al hacer click en CREATE se recargue la página y se me borren los datos ingresados
        //console.log(form);                                                    //Aquí consologueo el estado(dog) que se guardará en la DB
        const newForm = {
            name: form.name,
            height: form.minHeight + ' - ' + form.maxHeight,
            weight: form.minWeight + ' - ' + form.maxWeight,
            life_span: form.life_span,
            temperaments: form.temperament
        };
        //console.log(newForm);
        axios.post('http://localhost:3001/dogs/', newForm)                       //Como segundo parámetro del .post() va el form(Dog a crear)
        .then(res => alert('Raza creada exitosamente'))
        .catch(err => alert(err));
    };

    return(
        <form onSubmit={submitHandler} className={style.form}>
            <div className={style['form-container']}> 
                <h1 className={style.h1}>CREATE DOG BREED</h1>
                <div>
                    <label>Name: </label>
                    <input type='text' value={form.name} onChange={handleOnChange} name='name' />
                    {errors.name && <span style={{color: 'red'}}>{errors.name}</span>}
                </div>
                <div>
                    <label>Minimum height: </label>
                    <input type='text' value={form.minHeight} onChange={handleOnChange} name='minHeight' />

                    <label>Maximum height: </label>
                    <input type='text' value={form.maxHeight} onChange={handleOnChange} name='maxHeight' />
                    {errors.maxHeight && <span style={{color: 'red'}}>{errors.maxHeight}</span>}
                </div>
                <div>
                    <label>Minimum weight: </label>
                    <input type='text' value={form.minWeight} onChange={handleOnChange} name='minWeight' />

                    <label>Maximum weight: </label>
                    <input type='text' value={form.maxWeight} onChange={handleOnChange} name='maxWeight' />
                    {errors.maxWeight && <span style={{color: 'red'}}>{errors.maxWeight}</span>}
                </div>
                <div>
                    <label>Life span: </label>
                    <input type='text' value={form.life_span} onChange={handleOnChange} name='life_span' />
                </div>
                <div>
                    <label>Temperaments: </label>
                    <select multiple onChange={selectHandler}/*size='51' className={style.select}*/> 
                        {temperaments.map((temperament) => {
                            return <option key={temperament.id} value={temperament.id}>{temperament.name}</option>
                        })}
                    </select>
                </div>
                <div className={style['button-container']}>
                    <button type='submit' disabled = {!form.name || !form.maxHeight || !form.minHeight || !form.maxWeight || !form.minWeight || !form.life_span || !form.temperament.length}>CREATE</button>
                </div>
            </div>
        </form>
    )
};

export default Form;