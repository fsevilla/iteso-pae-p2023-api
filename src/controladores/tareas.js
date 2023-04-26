const Tarea = require('./../modelos/tarea');

const TareasController = {
    listar: (req, res) => {
        Tarea.find({}).lean()
            .then(response => {
                console.log('Respuesta: ', response);
                res.render('tareas', { tareas: response });
            })
            .catch(error => {
                res.status(400).send('Algo salio mal');
            });
    },
    ver: (req, res) => {},
    crear: (req, res) => {},
    actualizar: (req, res) => {},
    eliminar: (req, res) => {},
}

module.exports = TareasController;