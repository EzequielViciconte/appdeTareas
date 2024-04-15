const express = require('express');
const router = express.Router();

const homeController = require('../controladores/homeController')
const tareasController = require('../controladores/tareasController')


module.exports = function(){
    router.get('/',homeController.Home);
    router.post('/guardar-tarea',tareasController.guardarTarea);
    router.post('/crear-tarea',tareasController.crearTarea);
    router.delete('/borrar-tarea/:idTarea',tareasController.eliminarTarea)
    return router
}