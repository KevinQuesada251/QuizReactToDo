import React, { use, useState } from 'react'
import { Link } from 'react-router-dom'

import "../styles/FormRegister.css"
import llamados from '../services/llamados'

function FormRegister() {
  const [nombre, setNombre] = useState("") //hook para guardar el nombre
  const [correo, setCorreo] = useState("") //hook para guardar el correo
  const [pass, setPass] = useState("")  //hook para guardar la contraseña


  function registrarUsuario() { //creo un objeto y guarda la info de los hooks
    let usuario = {
      "nombre": nombre,
      "correo": correo,
      "pass": pass
    }
    llamados.postUsers(usuario, "usuarios") //uso el metodo post para enviarlo al db.json

  }

  return (
    <div className='formRegister'>
      <label htmlFor="">Nombre de Usuario</label>
      <br />
      <input className='nombre' onChange={(evento) => setNombre(evento.target.value)} type="text" name="" id="" />
      <br />
      <label  htmlFor="">Correo Electronico</label>
      <br />
      <input className='correo' onChange={(evento) => setCorreo(evento.target.value)} type="text" name="" id="" />
      <br />
      <label htmlFor="">Contraseña</label>
      <br />
      <input className='contra' onChange={(evento) => setPass(evento.target.value)} type="text" />
      <br />
      <Link to="/">Inicia aquí si tienes cuenta</Link>
      <br />
      
      
      <button class="btn-12"><span>Registrar</span></button>


    </div>
  )
}

export default FormRegister