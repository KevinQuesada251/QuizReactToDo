import React, {useEffect, useState} from 'react'

import Swal from 'sweetalert2'
import llamados from '../services/llamados'
import "../styles/TareasHome.css"

function TareasHome() {

  let nombreUsuario = localStorage.getItem("NombreUsuario")
  const [tareasUsuario,setTareasUsuarios] = useState([])
  const [recarga,setRecarga] = useState(false)
  useEffect(() => {

  async function mostrar() {
    const todasLasTareas = await llamados.getUsers("tareas")
    const tareasPorUsuario = todasLasTareas.filter(persona=> persona.nombreUsuario === nombreUsuario)
    setTareasUsuarios(tareasPorUsuario)
    console.log(tareasPorUsuario);
  }
  mostrar()
},[recarga])
  



  
    async function enviarNuevaTarea(){
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
      
      const nueva ={
        "nombreUsuario": nombreUsuario,
        "tarea":document.getElementById("tareaInfo").value,
        "estado":false
      }
       llamados.postUsers( nueva,"tareas")

    }
  }

  

 async function editar (id){
  console.log(id);
  
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
    const editarTarea = {
      "tarea": document.getElementById("inputEditar").value 
    }
    console.log(editarTarea,id);
    setRecarga(!recarga)
    await llamados.patchData(editarTarea ,"tareas",id)

  }
}
const [contador,setContador] = useState(0)

async function realizadas (id){
  const nuevoEstado = {
    "estado": true
  }
  await llamados.patchData(nuevoEstado,"tareas",id)

  setContador(contador + 1)
  setRecarga(!recarga)
  await llamados.deleteUser("tareas",id)
  
  
}





  return (
    <div className='contenedorTareas'>
        <h1 className='tituloToDo'>Bienvenido a Tu Lista de Tareas</h1>
        <p className='nombreUsuario'>Usuario: <span>{nombreUsuario}</span></p>
        <h5 className='tituloRealizadas'>Tareas Realizadas</h5>
        <div className='contador'>{contador}</div>
        
        <div className='tarea'>
            <ul>
              {tareasUsuario.map((tarea)=>(
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