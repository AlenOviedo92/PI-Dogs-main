const { getAllTemperaments } = require('../controllers/temperamentsController');

const getTemperamentsHandler = async(req, res) => {
    try {
        const results = await getAllTemperaments();
        res.status(200).json(results);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getTemperamentsHandler
};

//NOTA: Tratar de que el handler NO interactúe con la DB
