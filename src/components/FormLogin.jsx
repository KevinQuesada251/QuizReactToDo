import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "../styles/FormLogin.css"

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
    const encontrado = todosLosUsuarios.find(usuario => usuario.nombre === nombreUsuario && usuario.pass === passUsuario)
    

    if(encontrado){
        navigate("/home")
        localStorage.setItem("NombreUsuario",encontrado.nombre)
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
    <div className='containerLogin'>
        <label htmlFor="">Nombre de Usuario</label>
        <br />
        <input onChange={(evento)=>setNombreUsuario(evento.target.value)} type="text" name="" id="" />
        <br />
        <label htmlFor="">Contraseña</label>
        <br />
        <input onChange={(evento)=>setPassUsuario(evento.target.value)} type="text" name="" id="" />
        <br />
        <Link to="/register">No tienes cuenta? Registrate aquí</Link>
        <br />
        <button className={estadoLogin} onClick={validarUsuario}>Iniciar</button>
    </div>
  )
}

export default FormLogin