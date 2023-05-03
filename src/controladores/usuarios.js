const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

require('dotenv').config();

const googleClient = new OAuth2Client(process.env.GOOGLE_ID);

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
    googleLogin: (req, res) => {
        const idToken = req.body.googleToken;

        googleClient.verifyIdToken({ idToken: idToken }).then(response => {
            const user = response.getPayload();
            console.log('Si se valido el token', user);
            // Buscar el usuario, obtener el ID, generar el token con JWT y responder el token
            res.send({token:1235438});
        }).catch(err => {
            res.status(401).send({ msg: 'token invalido' });
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