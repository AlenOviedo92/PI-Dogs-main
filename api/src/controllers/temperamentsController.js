const { Temperament } = require('../db');
const axios = require('axios');

const getAllTemperaments = async() => {
    const apiData = (await axios.get('https://api.thedogapi.com/v1/breeds')).data;
    const temperamentsRaw = apiData.map((dog) => dog.temperament);
    const temperamentsRawFilter = temperamentsRaw.filter((temp) => typeof temp !== 'undefined');
    const temperamentsArr = temperamentsRawFilter.map((string) => {
        return string.split(', ');
    });

    const temperamentsRepeated = [];
    temperamentsArr.map((arr) => {
        for(let i = 0; i < arr.length; i++) {
            temperamentsRepeated.push(arr[i]);
        }
    });

    const temperaments = [...new Set(temperamentsRepeated)];                                        //Elimino los temperamentos repetidos

    const temperamentsDatabase = await Temperament.findAll();
    if(!temperamentsDatabase.length) {
        temperaments.forEach(async(temperament) => {
            await Temperament.create({
                name: temperament
            });
        });
    }
    const allTemperaments = await Temperament.findAll();
    return allTemperaments;
};

module.exports = {
    getAllTemperaments
};