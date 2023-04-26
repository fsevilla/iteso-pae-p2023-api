const router = require('express').Router();
const rutasTareas = require('./tareas');
const rutasUsuarios = require('./usuarios');
const rutasAuth = require('./auth');
const { auth } = require('./../middlewares');

router.use('', rutasAuth); 
router.use('/tareas', auth, rutasTareas);
router.use('/usuarios', auth, rutasUsuarios);



module.exports = router;