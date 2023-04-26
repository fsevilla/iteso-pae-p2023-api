function middleware(req, res, next) {
    if(req.query.token === '123') {
        req.usuario = 'Francisco';
        next();
    } else {
        res.status(401).send('Usuario no autenticado');
    }
}

module.exports = middleware;