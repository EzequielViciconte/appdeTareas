const mongoose = require('mongoose');

const tareasSchema = new mongoose.Schema({
    Titulo:{
        type:String,
        require:true
    },
    Descripcion:{
        type:String,
    },
    Icono:{
        type:String,
        require:true
    },
    Progreso:{
        type:String,
        require:true
    },
    usuarioId:{
        type:String,
        require:true,
    },
})

module.exports = mongoose.model('Tareas',tareasSchema);