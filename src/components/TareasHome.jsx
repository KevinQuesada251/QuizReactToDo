import React, {useEffect, useState} from 'react'

import Swal from 'sweetalert2'
import llamados from '../services/llamados'
import "../styles/TareasHome.css"

function TareasHome() {

  let nombreUsuario = localStorage.getItem("NombreUsuario")
  const [tareasUsuario,setTareasUsuarios] = useState([])
  
  useEffect(() => {

  async function mostrar() {
    const todasLasTareas = await llamados.getUsers("tareas")
    const tareasPorUsuario = todasLasTareas.filter(persona=> persona.nombreUsuario === nombreUsuario)
    setTareasUsuarios(tareasPorUsuario)
    console.log(tareasPorUsuario);
    
  }

  mostrar()
},[])
  



  
    async function enviarNuevaTarea(){
    const { value: formValues } = await Swal.fire({
      title: "Escriba la nueva tarea",
      html: `
        <input id="tareaInfo" class="swal1-input">
      `,
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById("tareaInfo").value
        ];
      }
    });
    
    if (formValues) {
      
      const nueva ={
        "nombreUsuario": nombreUsuario,
        "tarea":document.getElementById("tareaInfo").value
      }
       llamados.postUsers( nueva,"tareas")

    }
  }

 


  return (
    <div className='contenedorTareas'>
        <h1>Bienvenido a tu lista de tareas <span>{nombreUsuario}</span></h1>
        <div className='tarea'>
            <ul>
              {tareasUsuario.map((tarea,index)=>(
                <li key={index}>
                  <strong>Nombre:</strong>{tarea.nombreUsuario}
                  <strong>Tarea:</strong>{tarea.tarea}
                </li>
              ))}
            </ul>

            <button onClick={enviarNuevaTarea}>Nueva Tarea</button>

        </div>
    </div>
  )
}

export default TareasHome