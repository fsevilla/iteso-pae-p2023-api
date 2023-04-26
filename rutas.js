const path = require('path');
const express = require('express');
const auth = require('./src/middlewares').auth;

function cargarHome(req, res) {
    // const paginado = req.query.paginado === 'false' ? false : true; 
    console.log('api works');
    // res.sendFile(pat{h.join(__dirname, 'src', 'views', 'index.html'));
    res.render('home', {
        nombre: 'Juan Perez'
    });
}


module.exports = function(app) {


    app.get('/', auth, cargarHome);
    
    
    app.get('*', function(req, res) {
        res.status(404).send('Pagina no encontrada');
    });
    
}
