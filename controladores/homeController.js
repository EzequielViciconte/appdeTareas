const tareas = require('../Modelos/Tareas');
const ip  = require('ip');

exports.Home =  async (req,res)=>{
    const ipDisp = ip.address();
    const tareaCreada = await tareas.findOne({usuarioId:ipDisp})
    if(tareaCreada == null){
        tareas.create([
            {
                Titulo:'Tarea en progreso',
                Descripcion:'',
                Icono:'reloj',
                Progreso:'Time_atack_duotone',
                usuarioId:ipDisp
            },
            {
                Titulo:'Tarea Completada',
                Descripcion:'',
                Icono:'Ejercicio',
                Progreso:'Done_round_duotone',
                usuarioId:ipDisp
            },
            {
                Titulo:'Tarea Sin Hacer',
                Descripcion:'',
                Icono:'Cafe',
                Progreso:'close_ring_duotone',
                usuarioId:ipDisp
            },
            {
                Titulo:'Tarea por Hacer',
                Descripcion:'Esta Tarea todavia no la hice,pronto la voy a hacer',
                Icono:'Libro',
                Progreso:'Add_round_duotone',
                usuarioId:ipDisp
            }
        ])
    }

    const Tareas = await tareas.find({usuarioId:ipDisp});
    res.render('home',{
        NombrePagina:'App de Tareas',
        Tareas
    })
}