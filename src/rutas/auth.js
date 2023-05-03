const express = require('express');
const router = express.Router();
const usuariosController = require('./../controladores/usuarios');

router.post('/login', usuariosController.login);
router.post('/login/google', usuariosController.googleLogin);
router.post('/registro', usuariosController.registro);

module.exports = router;