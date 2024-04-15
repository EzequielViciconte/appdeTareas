import axios from "axios";
import Swal from "sweetalert2";

const tareas = document.querySelectorAll('.divTarea');
const btnCerrarTar = document.querySelector('.cerrar');
const btnGuardarTarea = document.querySelector('.Guardar');
const btnCrear = document.querySelector('.Crear');
const btnBorrarTarea = document.querySelector('.Borrar');
const FormularioEditar = document.querySelector('.EditarTareaFondo')
const Iconos = document.querySelectorAll('.FondoIcono');
const progresoDivs = document.querySelectorAll('.IconoProgreso .divIcono');
let idTareaEditar;


// Ejecutar funcion tras click
Iconos.forEach(Icono=>{
    Icono.addEventListener('click',cambiarIcoSeleccionado);
})
progresoDivs.forEach(progresoDiv=>{
progresoDiv.addEventListener('click',cambiarProgresoSelect);
})

btnGuardarTarea.addEventListener('click',guardarFormTarea);
btnBorrarTarea.addEventListener('click',borrarFormTarea);
btnCerrarTar.addEventListener('click',cerrarFormulario);
tareas.forEach(tarea =>{
    tarea.addEventListener('click',mostrarFormTarea)
})

function mostrarFormTarea (e){
    if(e.target.parentElement != document.querySelector('.AgregarTarea')){
        idTareaEditar = e.target.parentElement.dataset.id;

        // Sacar Datos de la vista
        const NombreTarea = e.target.parentElement.querySelector('.TareaNombre').textContent
        const Descripcion = e.target.parentElement.querySelector('.Descripcion').textContent
        const iconoTarea = e.target.parentElement.querySelector('.Iconos .IconoTarea').dataset.icotar
        const divIcoTarea = document.querySelector(`.${iconoTarea}`); 
        const progresoTarea = e.target.parentElement.querySelector('.Progreso .IconoTarea').dataset.progreso
        const divProgreso = document.querySelector(`.${progresoTarea}Form`);
    
        //SeleccionarInputs
        const inputNombreForm = document.querySelector('.InputFormNombre');
        const inputDescripcionForm = document.querySelector('.InputFormDescripcion');
    
    
        inputNombreForm.value = NombreTarea
        inputDescripcionForm.value = Descripcion
        divIcoTarea.classList.add('Seleccionado')
    
        if(divProgreso != null){
            divProgreso.classList.add('SeleccionadoProgreso')
        }
        FormularioEditar.style.display = 'block'
        btnCrear.classList.add('Invisible');
        btnGuardarTarea.classList.remove('Invisible')
    }else{
        FormularioEditar.style.display = 'block'
        btnCrear.classList.remove('Invisible');
        btnGuardarTarea.classList.add('Invisible');
        btnCrear.addEventListener('click',crearTarea);

    }
    }
    

function cambiarIcoSeleccionado(e){
    const iconoSelect = e.target.parentElement;
    const iconoSelectAntes = document.querySelectorAll('.Seleccionado');
    iconoSelect.classList.add('Seleccionado');
    if(iconoSelect != iconoSelectAntes[0]){
        iconoSelectAntes[0].classList.remove('Seleccionado')
    }
}

function cambiarProgresoSelect(e){
    for(let i = 0;i <= progresoDivs.length;i++){
        if(e.target == progresoDivs[i]){
            const progresoSelect = e.target;
            const progresoSelectAntes = document.querySelector('.SeleccionadoProgreso');
            progresoSelect.classList.add('SeleccionadoProgreso');
            if(progresoSelectAntes != null){
                progresoSelectAntes.classList.remove('SeleccionadoProgreso')
            }
            
        }
    }
}

function guardarFormTarea(e){
    e.preventDefault();
    const nombreTarea = document.querySelector('.InputFormNombre').value;
    const descripcionTarea = document.querySelector('.InputFormDescripcion').value;
    const iconoSelect = document.querySelector('.Seleccionado').dataset.icono;
    const progresoSelectAntes = document.querySelector('.SeleccionadoProgreso');
    let progresoTarea
    if(progresoSelectAntes == null){
        progresoTarea = 'PorHacer'
    }else{
        progresoTarea = document.querySelector('.SeleccionadoProgreso').dataset.progreso;
    }
    
    axios.post('/guardar-tarea',{
        nombreTarea,
        descripcionTarea,
        idTareaEditar,
        iconoSelect,
        progresoTarea
    })
    .then(function(response){
        Swal.fire({
            title: "Guardado Correctamente",
            text: "Los Cambios se efectuaron correctamente!",
            icon: "success"
          }).then((result)=>{
            location.reload();
          });
    })
}

function crearTarea(e){
    e.preventDefault();
    const nombreTarea = document.querySelector('.InputFormNombre').value;
    const descripcionTarea = document.querySelector('.InputFormDescripcion').value;
    const icono = document.querySelector('.Seleccionado');
    const progresoSelectAntes = document.querySelector('.SeleccionadoProgreso');
    let progresoTarea
    if(progresoSelectAntes == null){
        progresoTarea = 'PorHacer'
    }else{
        progresoTarea = document.querySelector('.SeleccionadoProgreso').dataset.progreso;
    }
    
   

    if(nombreTarea == '' || icono == null){
        Swal.fire("Debe Insertar un nombre y un icono para su tarea!");
    }else {
        const iconoSelect = icono.dataset.icono;
        axios.post('/crear-tarea',{
            nombreTarea,
            descripcionTarea,
            iconoSelect,
            progresoTarea
        })
        .then(function(response){
            Swal.fire({
                title: "Creado Correctamente",
                text: "Su Tarea fue creada correctamente!",
                icon: "success"
              }).then((result)=>{
                location.reload();
              });
        })
    }
}

function borrarFormTarea(e){
    e.preventDefault();
    if(e.target == document.querySelector('.Borrar')){
        const Formulario = e.target.parentElement.parentElement.parentElement.parentElement.parentElement;
        const tareaDiv = document.querySelector(`[data-id='${idTareaEditar}']`);
        
        Swal.fire({
            title: "¿Estas Seguro de Eliminar?",
            text: "Una ves eliminado no se podra recuperar!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Eliminalo!"
          }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/borrar-tarea/${idTareaEditar}`,{params:{idTareaEditar}})
                    .then(function(respuesta){
                        Swal.fire({
                            title: "Eliminado!",
                            text: "Su Tarea su eliminada correctamente.",
                            icon: "success"
                          });
                          Formulario.style.display ='none'
                          tareaDiv.remove();
                    })
              
            }
          });
    }
}



function cerrarFormulario(e){

    const swalWithBootstrapButtons = Swal.mixin({
      });
      swalWithBootstrapButtons.fire({
        title: "Esta Seguro?",
        text: "Los cambios no se guardaran",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, Salir!",
        cancelButtonText: "No, Cancelar!",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
            FormularioEditar.style.display = 'none'

            // Removiendo clases al cerrar
            const divIcoTar = document.querySelector('.Seleccionado');
            divIcoTar.classList.remove('Seleccionado');
            const divProgreso = document.querySelector('.SeleccionadoProgreso');
            divProgreso.classList.remove('SeleccionadoProgreso')
        }
      });

    
}
export default tareas