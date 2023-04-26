const express = require('express');
const router = express.Router();
const controller = require('./../controladores/tareas');

router.post('', express.json(), controller.crear);


router.put('/:id', express.json(), controller.actualizar);

router.get('', controller.listar);

router.get('/:id', controller.ver);


module.exports = router;