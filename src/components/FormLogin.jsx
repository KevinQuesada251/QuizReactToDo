import React, { useState } from 'react'

import llamados from '../services/llamados'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

function FormLogin() {

  const [nombreUsuario,setNombreUsuario] = useState("")
  const [passUsuario,setPassUsuario] = useState("") 
  const [estadoLogin,setEstadoLogin] = useState("btn btn-primary")
  const navigate = useNavigate()


    async function validarUsuario() {
    const todosLosUsuarios = await llamados.getUsers("usuarios")
    console.log(todosLosUsuarios);
    const encontrado = todosLosUsuarios.find(usuario => usuario.nombre === nombreUsuario && usuario.pass === passUsuario)
    console.log(encontrado);

    if(encontrado){
        navigate("/home")
    }else{
      Swal.fire({
        title: 'Error!',
        text: 'PONGA BIEN LA VARA H A C K E R',
        icon: 'error',
        confirmButtonText: 'Cool 👍🏻'
      })
      setEstadoLogin("btn btn-danger")
    }

  }

  return (
    <div>
        <label htmlFor="">Nombre de Usuario</label>
        <input onChange={(evento)=>setNombreUsuario(evento.target.value)} type="text" name="" id="" />
        <label htmlFor="">Contraseña</label>
        <input onChange={(evento)=>setPassUsuario(evento.target.value)} type="text" name="" id="" />
        <button className={estadoLogin} onClick={validarUsuario}>Iniciar</button>
    </div>
  )
}

export default FormLogin