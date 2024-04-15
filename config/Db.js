const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://pruebatiendavirtual12:Prueba123@pruebaapptarea.oiewhs5.mongodb.net/appDeTarea',{useNewUrlParser:true})

mongoose.connection.on('error',(error)=>{
    console.log(error);
})

// Importar Modelo
require('../Modelos/Tareas');