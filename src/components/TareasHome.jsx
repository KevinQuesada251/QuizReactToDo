import React from 'react'

import Swal from 'sweetalert2'
import llamados from '../services/llamados'
import "../styles/TareasHome.css"

function TareasHome() {

  let nombreUsuario = localStorage.getItem("NombreUsuario")
  
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
       console.log(nueva);
    }
  }


  return (
    <div className='contenedorTareas'>
        <h1>Bienvenido a tu lista de tareas <span>{nombreUsuario}</span></h1>
        <div className='tarea'>
            

            <button onClick={enviarNuevaTarea}>Nueva Tarea</button>

        </div>
    </div>
  )
}

export default TareasHome