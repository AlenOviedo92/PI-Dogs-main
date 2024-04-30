const { getDogByName, getAllDogs, getDogById, createDog, removeDog, updatedDog } = require('../controllers/dogsController');

const getDogsHandler = async(req, res) => {
    const { name } = req.query;
    try {
        const results = name ? await getDogByName(name) : await getAllDogs();
        if(results.length === 0) {
            res.status(200).send(`The "${name}" dog breed does not exist`); 
        } else {
            res.status(200).json(results); 
        }
    } catch (error) {
        res.status(400).json({ error: error. message });
    }
};

const getDogHandler = async(req, res) => {
    const { id } = req.params;                                                              //req.params me entrega el id en formato string
    try {
        const source = isNaN(id) ? 'DB' : 'API';                                            //isNaN no distinge de números y strings que representan números(menos el cero)
        const dog = await getDogById(id, source);
        console.log(dog);
        if(typeof dog !== 'undefined') {
            return res.status(200).json(dog);
        }
        return res.status(400).json({ error: `El id: ${id} ingresado no existe` });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const createDogHandler = async(req, res) => {
    const { image, name, height, weight, life_span, temperaments } = req.body;
    try {
        const newDog = await createDog(image, name, height, weight, life_span, temperaments);
        return res.status(201).json(newDog);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const deleteDogHandler = async(req, res) => {
    const { id } = req.params;
    try {
        const dogRemoved = await removeDog(id);
        return res.status(200).json(dogRemoved);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const updateDogHandler = async(req, res) => {
    const { id } = req.params;
    //const {image, name, height, weight, life_span, temperaments} = req.body;
    const data = req.body;

    try {
        const dogUpdated = await updatedDog(id, data);
        return res.status(200).json(dogUpdated);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getDogsHandler,
    getDogHandler,
    createDogHandler,
    deleteDogHandler,
    updateDogHandler
};

//NOTA: Tratar de que el handler NO interactúe con la DB