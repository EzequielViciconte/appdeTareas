require('./config/Db');
const express = require('express');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');
const routes = require('./routes');


const app = express();

// Habilitar BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// Habilitar pug
app.set('view engine','pug')

app.use(session({
    secret:'secreto',
    password:'password',
    resave:false,
    saveUninitialized:false,
    store:MongoStore.create({mongoUrl:'mongodb+srv://pruebatiendavirtual12:Prueba123@pruebaapptarea.oiewhs5.mongodb.net/appDeTarea'})
}))

// Archivos Estaticos
app.use(express.static(path.join(__dirname,"public")));

app.use('/',routes());

app.listen(3000)