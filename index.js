import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';
import dotenv from 'dotenv';

dotenv.config({path: 'variables.env'})

const app = express();

//Conecta base de datos
db.authenticate()
    .then( () => console.log('Database is connected'))
    .catch( error => console.log(error));




// Habilitar PUG
app.set('view engine', 'pug');

// Obtener el year actual
app.use((req, res, next) => {
    const year = new Date();

    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = 'Agencia de Viajes';
    next()
});

// Agregar body parse para leer datos del formulario
//app.use(express.json());
app.use(express.urlencoded({extended: true}))

// Definir la carpeta publica
app.use(express.static('public'));


// Agregar router
app.use(router);


// Puerto y host para la app
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 2000;

app.listen(port, host, () => {
    console.log(`Server is running on port: ${port}`);
});