const jwt = require('jsonwebtoken');

const Usuario = require('./../modelos/usuario');


const UsuariosController = {
    listar: (req, res) => {
        Usuario.find({}).lean()
            .then(response => {
                console.log('Respuesta: ', response);
                res.render('usuarios', { usuarios: response });
            })
            .catch(error => {
                res.status(400).send('Algo salio mal');
            });
    },
    ver: (req, res) => {},
    crear: (req, res) => {},
    actualizar: (req, res) => {},
    eliminar: (req, res) => {},
    login: (req, res) => {
        res.send({token: '123456'});
        return;
        Usuario.findOne({
            correo: req.body.correo,
            password: req.body.password
        }).then(response=> {
            if(response) {
                // Si encontro al usuario, generamos el token\
                const token = jwt.sign({
                    id: response._id,
                    nombre: response.nombre,
                    correo: response.correo,
                    role: response.role
                }, 'holamundo');
                res.send({token});
            } else {}
        })
        .catch(response => {

        });
    },
    registro: (req, res) => {
        Usuario.create({
            nombre: req.body.nombre,
            correo: req.body.correo,
            pwd: req.body.password
        }).then(() => {
            res.send();
        }).catch(err => {
            res.status(400).send(err);
        })

    //     nombre: { type: String },
    // correo: { type: String },
    // role: { type: String },
    // password: { type: String },
    // status: { type: String, default: 'new' }
    }
}

module.exports = UsuariosController;