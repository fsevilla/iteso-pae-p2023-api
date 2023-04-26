const express = require('express');
const rutas = require('./rutas');
const routes = require('./src/rutas');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const swaggerConf = require('./swagger.config');    

require('dotenv').config();

const { engine } = require('express-handlebars');

const app = express();

const mongoUrl = process.env.MONGO_URL;


app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

const port = process.env.PORT || 3000;

app.use(cors());

app.use('/assets', express.static(path.join(__dirname, 'assets')));

const swaggerDocs = swaggerJsDoc(swaggerConf);
app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use('', routes);
rutas(app);

mongoose.connect(mongoUrl).then(() => {
    console.log('Se conecto correctamente a la base de datos');
    app.listen(port, function() {
        console.log('app is running in port ' + port)
    });
}).catch(err => {
    console.log('No se pudo conectar a la base de datos', err);
});
