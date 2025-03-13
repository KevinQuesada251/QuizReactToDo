import React, {useEffect, useState} from 'react'

import Swal from 'sweetalert2'
import llamados from '../services/llamados'
import "../styles/TareasHome.css"

function TareasHome() {

  let nombreUsuario = localStorage.getItem("NombreUsuario") //guardo en una variable lo que hay dentro del Loca Storage

  const [tareasUsuario,setTareasUsuarios] = useState([]) // hook para guardar la tarea del usuario
  const [recarga,setRecarga] = useState(false) // hook para campara cambiar la renderizacion de la pantalla
  useEffect(() => {

  async function mostrar() {
    const todasLasTareas = await llamados.getUsers("tareas") // obtengo los usuarios
    const tareasPorUsuario = todasLasTareas.filter(persona=> persona.nombreUsuario === nombreUsuario) // hago un filtro para tener solo las tareas por el nombre del usuario
    setTareasUsuarios(tareasPorUsuario)
  }
  mostrar()
},[recarga]) // recargar la pantalla
  



  
    async function enviarNuevaTarea(){ // muestra un sweet alert para que el usuario haga su tarae
    const { value: formValues } = await Swal.fire({
      title: "Escriba la nueva tarea",
      html: `
        <input id="tareaInfo" class="swal1-input">
      `,
      customClass: {
        htmlContainer: 'costum-container',
      },
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById("tareaInfo").value,
        ];
      }
    });
    setRecarga(!recarga)
    if (formValues) {
      
      const nueva ={ // construyo el objeto 
        "nombreUsuario": nombreUsuario,
        "tarea":document.getElementById("tareaInfo").value,
        "estado":false
      }
       llamados.postUsers( nueva,"tareas") // lo envio a la base de datos con el metodo post 

    }
  }

  

 async function editar (id){ 
  
  const { value: formValues } = await Swal.fire({
    title: "Multiple inputs",
    html: `
      <input id="inputEditar">
      
    `,
    focusConfirm: false,
    preConfirm: () => {
      return [
         document.getElementById("inputEditar").value
      ]
    }
  });
  if (formValues) {
    const editarTarea = { // construyo un objeto 
      "tarea": document.getElementById("inputEditar").value 
    }
    setRecarga(!recarga) // renderizo los cambios
    await llamados.patchData(editarTarea ,"tareas",id) //edito la tarea usando el metodo patch

  }
}
const [contador,setContador] = useState(0) //inicializo el contador

async function realizadas (id){
  const nuevoEstado = {
    "estado": true
  }
  await llamados.patchData(nuevoEstado,"tareas",id) // elimino la tarea

  setContador(contador + 1) //sumo al contador cada vez que realizo la tarea
  setRecarga(!recarga)
  await llamados.deleteUser("tareas",id) //elimino la tarea con el metodo delete
  
  
}





  return (
    <div className='contenedorTareas'>
        <h1 className='tituloToDo'>Bienvenido a Tu Lista de Tareas</h1>
        <p className='nombreUsuario'>Usuario: <span>{nombreUsuario}</span></p>
        <h5 className='tituloRealizadas'>Tareas Realizadas</h5>
        <div className='contador'>{contador}</div>
        
        <div className='tarea'>
            <ul>
              {tareasUsuario.map((tarea)=>(//recorro la lista
                <li key={tarea.id}>
                  <input onClick={(e)=>{realizadas(tarea.id)}}  type="checkbox" /> 
                  <strong>Nombre:</strong>{tarea.nombreUsuario}
                  <strong>Tarea:</strong>{tarea.tarea}
                  <button className='btnEliminar' onClick={async () => {
                    await llamados.deleteUser("tareas",tarea.id)
                    setRecarga(!recarga)
                  }}>Eliminar</button>
                  <button className='btnEditar' onClick={(e)=>{
                    editar(tarea.id)
                  }}>Editar</button>
                </li>
              ))}
            </ul>

            <button id='btnNuevasTareas' onClick={enviarNuevaTarea}>Nueva Tarea</button>  

        </div>
    </div>
  )
}

export default TareasHome