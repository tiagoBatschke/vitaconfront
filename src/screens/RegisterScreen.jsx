import React, { useEffect, useState } from 'react'
import { Link, Route, Routes, useNavigate} from "react-router-dom"
import axios from 'axios'


const RegisterScreen = () => {
  const [email, setEmail]= useState('')
  const [nome, setNome]= useState('')
  const [cnpj, setCnpj]= useState('')
  const [telefone, setTelefone]= useState('')
  const [password, setPassword]= useState('')
  const [password_confirmation, setPassword_confirmation]= useState('')
  const [errors, setErrors]= useState('')
  const navigate = useNavigate()


  useEffect(() => {
    console.log(errors)
  }, [errors])


  const handleRegister  = async(event) => {
    event.preventDefault();
    axios.post('https://testevitacon-bd7d417ef875.herokuapp.com/api/register', {
      name: nome,
      email: email,
      password: password,
      password_confirmation: password_confirmation ,
      status:   'ativo',
      role: 'admin',
      telefone: telefone,
      
  })
  .then(response => {
      // Registro bem-sucedido, você pode tratar a resposta conforme necessário
        navigate(`/Clientes/UserByClientsScreen/${id}`);
      // Redirecionar para outra página, exibir uma mensagem de sucesso, etc.
  })
  .catch(error => {
    // Ocorreu um erro ao tentar registrar o usuário
    if (error.response.status == 422) {
      setErrors(error.response.data.errors)
      console.error('Erro:', error.response.data.errors);
    }
    // Exibir uma mensagem de erro para o usuário, redirecionar para outra página, etc.
});
  }

  return (
    <div className='flex justify-evenly w-[100vw]'>
   <div className='h-[100vh] w-[60%]  flex flex-col items-center justify-center'>
        <img className='w-[90%] ' src="https://github.com/tiagoBatschke/vitaconfront/blob/main/src/assets/VitaconLogin.jpg?raw=true" alt="" />
      </div>
    <div className='flex flex-col items-start justify-center w-[35%] h-[100vh] '>
      <h2 className='text-[1rem] font-bold text-[#a0a0a0]'>SIGN IN BELOW:</h2>
      <form className='h-[60vh] w-[100%] flex flex-col justify-evenly' onSubmit={handleRegister}>

      <div className='flex flex-col w-[80%]  p-1 items-start  border-[1px] border-[#C4C4C4]'>
        <label className='text-[0.7rem]' htmlFor="">Name</label>
        <input  className='w-[80%] ml-[0%] h-[3vh]   outline-none' placeholder='Name' type="text" value={nome} onChange={(e)=>{setNome(e.target.value)}}></input>
      </div>
      <p className={errors.name ? 'w-[80%] text-red-500 -mt-[2vh]' : 'invisible h-0 w-0 -mt-[2vh]'} >{errors.name}</p>
      <div className='flex flex-col w-[80%]  p-1 items-start  border-[1px] border-[#C4C4C4]'>
        <label className='text-[0.7rem]' htmlFor="">E-mail</label>
        <input  className='w-[80%] ml-[0%] h-[3vh]   outline-none' placeholder='E-mail' type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}}></input>
      </div>
      <p className={errors.email ? 'w-[80%] text-red-500 -mt-[2vh]' : 'invisible h-0 w-0 -mt-[2vh]'} >{errors.email}</p>
      <div className='flex flex-col w-[80%]  p-1 items-start  border-[1px] border-[#C4C4C4]'>
        <label className='text-[0.7rem]' htmlFor="">Telefone</label>
        <input  className='w-[80%] ml-[0%] h-[3vh]   outline-none' placeholder='Telefone' type="tel" value={telefone} onChange={(e)=>{setTelefone(e.target.value)}}></input>
      </div>
      <p className={errors.telefone ? 'w-[80%] text-red-500 -mt-[2vh]' : 'invisible h-0 w-0 -mt-[2vh]'} >{errors.telefone}</p>
      <div className='flex flex-col w-[80%]  p-1 items-start  border-[1px] border-[#C4C4C4]'>
        <label className='text-[0.7rem]' htmlFor="">Password</label>
        <input  className='w-[80%] ml-[0%] h-[3vh]   outline-none' placeholder='Password' type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
      </div>
      <p className={errors.name ? 'w-[80%] text-red-500 -mt-[2vh]' : 'invisible h-0 w-0 -mt-[2vh]'} >{errors.name}</p>
      <div className='flex flex-col w-[80%]  p-1 items-start  border-[1px] border-[#C4C4C4]'>
        <label className='text-[0.7rem]' htmlFor="">Confirm Password</label>
        <input  className='w-[80%] ml-[0%] h-[3vh]   outline-none' placeholder='Password' type="password" value={password_confirmation} onChange={(e)=>{setPassword_confirmation(e.target.value)}}></input>
      </div>
      <p className={errors.password ? 'w-[80%] text-red-500 -mt-[2vh]' : 'invisible h-0 w-0 -mt-[2vh]'} >{errors.password}</p>
      <button  type='submit'  className='bg-[#58A5F5] flex justify-center items-center text-white h-[2rem] w-[15%] rounded-sm' aria-current='page' >Register</button> 
      </form>
    </div>

  </div>
  )
}

export default RegisterScreen