const tareas = require('../Modelos/Tareas');
const ip  = require('ip');

exports.guardarTarea = async (req,res)=>{
    const id = req.body.idTareaEditar;
    const nombreTarea = req.body.nombreTarea;
    const descripcionTarea = req.body.descripcionTarea;
    const iconoSelect = req.body.iconoSelect;
    const progresoTarea = req.body.progresoTarea;
    const tareaActualizada = {
        Titulo:nombreTarea,
        Descripcion:descripcionTarea,
        Icono:iconoSelect,
        Progreso:progresoTarea
    }

    const tarea = await tareas.findOneAndUpdate({_id:id},tareaActualizada,{
        new:true,
        runValidators:true
    })

    res.json(tarea);
}

exports.crearTarea = async (req,res)=>{
    const ipDisp = ip.address();
    const nombreTarea = req.body.nombreTarea;
    const descripcionTarea = req.body.descripcionTarea;
    const iconoSelect = req.body.iconoSelect;
    const progresoTarea = req.body.progresoTarea;

    const tareaLocal = {
        Titulo:nombreTarea,
        Descripcion:descripcionTarea,
        Icono:iconoSelect,
        Progreso:progresoTarea,
        usuarioId:ipDisp
    }
    const Tarea = new tareas(tareaLocal)

    try {
        await Tarea.save();
        res.json(Tarea);
    } catch (error) {
        console.log(error);
    }
}

exports.eliminarTarea = async(req,res)=>{
    const {idTarea} = req.params;
    const result = await tareas.deleteOne({_id:idTarea});
    res.json(result);
}