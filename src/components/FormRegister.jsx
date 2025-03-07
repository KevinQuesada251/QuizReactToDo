import React, { use, useState } from 'react'

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
    <div>
        <label htmlFor="">Nombre de Usuario</label>
        <input onChange={(evento)=>setNombre(evento.target.value)} type="text" name="" id="" />
        <label  htmlFor="">Correo Electronico</label>
        <input onChange={(evento)=>setCorreo(evento.target.value)} type="text" name="" id="" />
        <label  htmlFor="">Contraseña</label>
        <input onChange={(evento)=>setPass(evento.target.value)} type="text"  />
        <button onClick={registrarUsuario}>Enviar</button>
    </div>
  )
}

export default FormRegister