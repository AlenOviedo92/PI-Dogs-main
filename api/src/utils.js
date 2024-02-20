const cleanPropsDogs = (arr) => {                                                              //Limpia las propiedades de los Dogs de la API
    const dog = arr.map((dog) => {
        return{
            id: dog.id,
            image: dog.image.url,
            name: dog.name,
            height: dog.height.metric,
            weight: dog.weight.metric,
            life_span: dog.life_span,
            temperaments: dog.temperament,
            created: false
        }
    });
    return dog;
};

const cleanTemperaments = (obj) => {                                                            //Limpia la propiedad "temperaments" de los Dogs de la DB
    return {
        id: obj.id,
        image: obj.image,
        name: obj.name,
        height: obj.height,
        weight: obj.weight,
        life_span: obj.life_span,
        temperaments: obj.Temperaments.map((temperament) => temperament.name).join(', '),
        created: true
    }
};

const validate = (req, res, next) => {                                                          //Ya que recibe next como parámetro es un Middleware
    const { image, name, height, weight, life_span, temperaments } = req.body;
    if(!image) return res.status(400).json({ error: 'Agregue la propiedad image'});
    if(!name) return res.status(400).json({ error: 'Agregue la propiedad name'});
    if(!height) return res.status(400).json({ error: 'Agregue la propiedad heigth'});
    if(!weight) return res.status(400).json({ error: 'Agregue la propiedad weigth'});
    if(!life_span) return res.status(400).json({ error: 'Agregue la propiedad life_span'});
    if(!temperaments) return res.status(400).json({ error: 'Debe agragar al menos un temperamento'});
    next();
};

module.exports = {
    cleanPropsDogs,
    cleanTemperaments,
    validate,
};