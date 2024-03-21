import React, { useEffect, useState, useContext  } from 'react'
import { Link, Route, Routes, useNavigate} from "react-router-dom"
import axios from '../../api/axios'
  
import LateralBar from '../../components/lateralBar'
import UploadImagem from '../../components/uploadImagem'


const AddTiposDeUsoScreen = () => {
  const [email, setEmail]= useState('')
  const [nome, setNome]= useState('')
  const [ativo, setAtivo]= useState(true)
  const [ativoStyle, setAtivoStyle]= useState(`bg-[#127ceee1]`)
  const [inativo, setInativo]= useState(false)
  const [status, setStatus]= useState('ativo')
  const [inativoStyle, setInativoStyle]= useState(`bg-[#127ceee1]`)
  const [logo, setLogo]= useState('')
  const [clientesStyled, setClientesStyled]= useState(null)
  const [screen, setScreen] =useState()
  const [clientes, setClientes] =useState(null)
  const [clienteId, setClienteId] =useState('')
  const [password, setPassword]= useState('')
  const [password_confirmation, setPassword_confirmation]= useState('')
  const [campoFaltante, setCampoFaltante]=  useState(false)
  const [styledInput, setStyledInput]=  useState('border-red-600 border-[2px]')

  const [toggleLogOut, setToggleLogOut] = useState(false)
  const [userOptions, setUserOptions] =useState(<div className='text-center text-white -mb-8 mt-2 w-[90%] -ml-[10%] bg-slate-500 z-10' onClick={()=>{localStorage.setItem('token', ''), setScreen('gg')}}>Log Out</div>)

  const navigate = useNavigate()


  const  token = localStorage.getItem('token')
  const  user = localStorage.getItem('user')

 useEffect(() => {
   
  function checkToken() {

    axios.get('http://127.0.0.1:8000/api/check-token',  {
      withCredentials: true,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
       if (response.status !== 200) {
        navigate('/')
       }
    })
    .catch(error => {
        console.error('Erro:', error);
        navigate('/')
    }); 
 
}


    checkToken();
  }, [screen]);



useEffect(() => {
  if (ativo === true) {
    setInativoStyle(`bg-[#fff]`)
    setAtivoStyle(`bg-[#127ceee1]`)
    setStatus('ativo')
  }else{
    setInativoStyle(`bg-[#127ceee1]`)
    setAtivoStyle(`bg-[#fff]`)
    setStatus('inativo')
  }


}, [ativo, inativo, campoFaltante])

  

const validateInputs = () => {
  if ( !nome) {
    setCampoFaltante(true)
    return false;
  }

  if (password !== password_confirmation) {
    alert('As senhas não coincidem.');
    return false;
  }

  return true;
};



function createCliente() {

  if (!validateInputs()) {
    return;
  }

  axios.post('http://127.0.0.1:8000/api/tiposDeUso', {
      nome: nome,
  }, {
      withCredentials: true,
      headers: {
          'Authorization': `Bearer ${token}`
      }
  })
  .then(response => {
    navigate('/TiposDeUso');
    setCampoFaltante(false)
   
  })
  .catch(error => {
      console.error('Erro:', error);
  });
}
  
 return (
      <div className='w-[100%]'>
        <div className='w-[100%] h-[10vh] bg-[#F9F9F9] border-b flex '>
          <div className='w-[95%] flex items-center justify-between'>
            <img src="https://github.com/tiagoBatschke/vitaconfront/blob/main/src/assets/votacon_logo.jpg?raw=true" className='w-[15%] h-[8vh] ' alt="" />
            <div className='flex flex-col items-center justify-between w-[5%] hover:cursor-pointer'>
              <div className='flex items-center justify-between w-[100%] hover:cursor-pointer' onClick={()=>{setToggleLogOut(!toggleLogOut)}}>
                <img src="https://github.com/tiagoBatschke/vitaconfront/blob/main/src/assets/icon-Png.png?raw=true" className='w-[3rem] h-[3rem]' alt="" />
                <img src="https://github.com/tiagoBatschke/vitaconfront/blob/main/src/assets/down.png?raw=true" className='w-[0.8rem] h-[0.8rem]' alt="" />
              </div>
              {toggleLogOut === true ? userOptions : null}
            </div>
          </div>
        </div>
        <div className='flex h-[90vh] w-[100%]'>      
         <LateralBar user={user} screen={'Clientes'}/>
          <div className='flex flex-col items-center w-[83%] bg-[#F9F9F9]'>
            <div className='flex items-center justify-between w-[90%] h-[10vh]'>
              <h2 className='w-[10%] ml-[2%] hover:cursor-pointer' onClick={()=>{navigate('/TiposDeUso');}}>Tipos de uso</h2>
              {/* <button className='w-[10%] mr-[2%] border border-[#70AD47]' >Novo Cliente</button> */}
            </div>
            <div className='flex flex-col items-center justify-evenly w-[100%]'>
                <div className='w-[100%] h-[10vh]  flex '>
                      <div className='w-[50%] h-[60vh] flex flex-col justify-evenly items-center '>
                        <input className={`w-[80%] p-1 ml-[0%] h-[4vh] border ${ campoFaltante === true && !nome  ? styledInput : 'border-black'}`} placeholder='Nome' type="text" value={nome} onChange={(e) => setNome(e.target.value)}></input>
                        <p className={ campoFaltante === true && !nome  ? 'w-[80%] text-red-500 -mt-[2vh]' : 'invisible h-0 w-0 -mt-[2vh]'} >Campo Obrigatorio!</p>
                        <button className='w-[30%] ml-[50%] border border-[#70AD47]' onClick={createCliente }>Salvar</button>
                      </div>
                </div> 
            </div>
          </div>
        </div>
             
      </div>
 
  )
}

export default AddTiposDeUsoScreen