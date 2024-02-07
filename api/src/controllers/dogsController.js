require('dotenv').config();
const { Dog, Temperament } = require('../db');
const { Op } = require('sequelize');
const { cleanPropsDogs, cleanTemperaments } = require('../utils');
const axios = require('axios');
const { YOUR_API_KEY } = process.env;

const getDogByName = async(name) => {
    const databaseDogs = await Dog.findAll({ where: {name: { [Op.iLike]: `%${name}%` }} });                         //El operador iLike permite buscar un patrón en strings, no distingue entre mayúsculas y minúsculas
    const apiDogs = cleanPropsDogs((await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}`, {
        headers: {
            'x-api-key': YOUR_API_KEY
        }
    })).data);
    return [...databaseDogs, ...apiDogs];
};

const getAllDogs = async() => {
    const databaseDogsRaw = await Dog.findAll(
        {include: {                                                                                                 //Para incluir los temperamentos asociados a los Dogs de la DB
                    model: Temperament,
                    attributes: ['name'],
                    as: 'Temperaments',
                    through: {
                        attributes: []
                    },
                }
        }
    );
    const databaseDogs = databaseDogsRaw.map((dog) => cleanTemperaments(dog));                                       //Para obtener los temperamentos organizados en un solo string(normalizados con la API)
    const apiDogsRaw = (await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`)).data;
    const apiDogs = cleanPropsDogs(apiDogsRaw);
    const results = [...databaseDogs, ...apiDogs];
    return results;
};

const getDogById = async(id, source) => {
    if(source === 'API') {
        const dataRaw = (await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`)).data;
        const dog = dataRaw.filter((dog) => dog.id === +id);
        return cleanPropsDogs(dog)[0];
    } else {
        const dogRaw = await Dog.findByPk(id, 
            {include: {
                        model: Temperament,
                        attributes: ['name'],
                        as: 'Temperaments',
                        through: {
                            attributes: []
                        },
                    }
            }
        );
        const dog = cleanTemperaments(dogRaw);
        return dog;
    }
};

const createDog = async(image, name, height, weight, life_span, temperaments) => {                  //Fn async porque trabaja con los métodos del modelo, y dichos métodos retornan promesas
    const newDog = await Dog.create({ image, name, height, weight, life_span });                    //Dog.create me retorna una preomesa, por eso se hace await
    await newDog.addTemperament(temperaments);
    return newDog;
};

module.exports = {
    getDogByName,
    getAllDogs,
    getDogById,
    createDog,
};