import React, { use, useState } from 'react'
import { Link } from 'react-router-dom'

import "../styles/FormRegister.css"
import llamados from '../services/llamados'

function FormRegister() {
  const [nombre,setNombre] = useState("")
  const [correo,setCorreo] = useState("")
  const [pass,setPass]= useState("")


  function registrarUsuario() {
    let usuario = {
      "nombre": nombre,
      "correo": correo,
      "pass": pass
    } 
    llamados.postUsers(usuario,"usuarios")

  }
  
  return (
    <div className='formRegister'>
        <label htmlFor="">Nombre de Usuario</label>
        <br />
        <input onChange={(evento)=>setNombre(evento.target.value)} type="text" name="" id="" />
        <br />
        <label  htmlFor="">Correo Electronico</label>
        <br />
        <input onChange={(evento)=>setCorreo(evento.target.value)} type="text" name="" id="" />
        <br />
        <label  htmlFor="">Contraseña</label>
        <br />
        <input onChange={(evento)=>setPass(evento.target.value)} type="text"  />
        <br />
        <h1>=======</h1>
        <Link to="/">Inicia aquí si tienes cuenta</Link>
        <br />
        <button onClick={registrarUsuario}>Enviar</button>
    </div>
  )
}

export default FormRegister