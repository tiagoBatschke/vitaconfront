import React, { useEffect, useState, useContext  } from 'react'
import { Link, Route, Routes, useNavigate} from "react-router-dom"
import axios from '../api/axios'
  
import LateralBar from '../components/lateralBar'
import UploadImagem from '../components/uploadImagem'


const AddClienteScreen = () => {
  const [email, setEmail]= useState('')
  const [nome, setNome]= useState('')
  const [cnpj, setCnpj]= useState('')
  const [contato, setContato]= useState('')
  const [telefone, setTelefone]= useState('')
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



  const navigate = useNavigate()


  const  token = localStorage.getItem('token')
  const  user = localStorage.getItem('user')

 useEffect(() => {
   
  function checkToken() {

    axios.get('https://testevitacon-bd7d417ef875.herokuapp.com/api/check-token',  {
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
  }, []);



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

  

function registerUser() {
  axios.post('https://testevitacon-bd7d417ef875.herokuapp.com/api/register', {
      name: nome,
      email: email,
      password: password,
      password_confirmation: password_confirmation ,
      status:  ativo === true ? 'ativo' : 'inativo',
      role: 'cliente',
      telefone: telefone,
      cnpj: cnpj,
      contato: contato
  })
  .then(response => {
      // Registro bem-sucedido, você pode tratar a resposta conforme necessário
 
      // Redirecionar para outra página, exibir uma mensagem de sucesso, etc.
  })
  .catch(error => {
      // Ocorreu um erro ao tentar registrar o usuário
      console.error('Erro:', error.response.data.message);
      // Exibir uma mensagem de erro para o usuário, redirecionar para outra página, etc.
  });
}

const validateInputs = () => {
  if (!email || !nome || !cnpj || !contato || !telefone) {
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

  axios.post('https://testevitacon-bd7d417ef875.herokuapp.com/api/clientes', {
      nome: nome,
      cnpj: cnpj,
      contato: contato,
      email: email,
      telefone: telefone,
      celular: '11111',
      status: status
  }, {
      withCredentials: true,
      headers: {
          'Authorization': `Bearer ${token}`
      }
  })
  .then(response => {
    setNome('');
      setCnpj('');
      setContato('');
      setEmail('');
      setTelefone('');
    navigate('/Clientes');
    setCampoFaltante(false)
   
  })
  .catch(error => {
      console.error('Erro:', error);
  });
}

  const handleAtivoClick = () => {
    setAtivo(true);
    setInativo(false);
  };
  
  const handleInativoClick = () => {
    setAtivo(false);
    setInativo(true);

    
  };
  
 return (
      <div className='w-[100%]'>
        <div className='w-[100%] h-[10vh] bg-[#F9F9F9] border-b flex '>
          <div className='w-[95%] flex items-center justify-between'>
            <img src="https://github.com/tiagoBatschke/vitaconfront/blob/main/src/assets/votacon_logo.jpg?raw=true" className='w-[15%] h-[8vh] ' alt="" />
            <div className='flex items-center justify-between w-[4%] hover:cursor-pointer'>
              <img src="https://github.com/tiagoBatschke/vitaconfront/blob/main/src/assets/icon-Png.png?raw=true" className='w-[3rem] h-[3rem]' alt="" />
              <img src="https://github.com/tiagoBatschke/vitaconfront/blob/main/src/assets/down.png?raw=true" className='w-[0.8rem] h-[0.8rem]' alt="" />
            </div>
          </div>
        </div>
        <div className='flex h-[90vh] w-[100%]'>      
         <LateralBar user={user} screen={'Clientes'}/>
          <div className='flex flex-col items-center w-[83%] bg-[#F9F9F9]'>
            <div className='flex items-center justify-between w-[90%] h-[10vh]'>
              <h2 className='w-[10%] ml-[2%] hover:cursor-pointer' onClick={()=>{navigate('/Clientes');}}>Clientes</h2>
              {/* <button className='w-[10%] mr-[2%] border border-[#70AD47]' >Novo Cliente</button> */}
            </div>
            <div className='flex flex-col items-center justify-evenly w-[100%]'>
                <div className='w-[100%] h-[10vh]  flex '>
                      <div className='w-[50%] h-[60vh] flex flex-col justify-evenly items-center '>
                        <input className={`w-[80%] p-1 ml-[0%] h-[4vh] border ${ campoFaltante === true && !nome  ? styledInput : 'border-black'}`} placeholder='Nome' type="text" value={nome} onChange={(e) => setNome(e.target.value)}></input>
                        <p className={ campoFaltante === true && !nome  ? 'w-[80%] text-red-500 -mt-[2vh]' : 'invisible h-0 w-0 -mt-[2vh]'} >Campo Obrigatorio!</p>
                        <input className={`w-[80%] p-1 ml-[0%] h-[4vh] border ${ campoFaltante === true && !cnpj ? styledInput : 'border-black'}`} placeholder='Cnpj' type="text" value={cnpj} onChange={(e) => setCnpj(e.target.value)}></input>
                        <p className={ campoFaltante === true && !cnpj  ? 'w-[80%] text-red-500 -mt-[2vh]' : 'invisible h-0 w-0 -mt-[2vh]'} >Campo Obrigatorio!</p>
                        <input className={`w-[80%] p-1 ml-[0%] h-[4vh] border ${ campoFaltante === true && !contato  ? styledInput : 'border-black'}`} placeholder='Contato' type="text" value={contato} onChange={(e) => setContato(e.target.value)}></input>
                        <p className={ campoFaltante === true && !contato  ? 'w-[80%] text-red-500 -mt-[2vh]' : 'invisible h-0 w-0 -mt-[2vh]'} >Campo Obrigatorio!</p>
                        <input className={`w-[80%] p-1 ml-[0%] h-[4vh] border ${ campoFaltante === true && !email ? styledInput : 'border-black'}`} placeholder='Email' type="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                        <p className={ campoFaltante === true && !email  ? 'w-[80%] text-red-500 -mt-[2vh]' : 'invisible h-0 w-0 -mt-[2vh]'} >Campo Obrigatorio!</p>
                        <input className={`w-[80%] p-1 ml-[0%] h-[4vh] border ${ campoFaltante === true && !telefone ? styledInput : 'border-black'}`} placeholder='telefone celular' type="tel" value={telefone} onChange={(e) => setTelefone(e.target.value)}></input>
                        <p className={ campoFaltante === true && !telefone  ? 'w-[80%] text-red-500 -mt-[2vh]' : 'invisible h-0 w-0 -mt-[2vh]'} >Campo Obrigatorio!</p>
                        {/* <input  className='w-[80%] p-1 ml-[0%] h-[4vh] border border-black' placeholder='Password' type="text" value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
                        <input  className='w-[80%] p-1 ml-[0%] h-[4vh] border border-black' placeholder='Password confirmation' type="text" value={password_confirmation} onChange={(e)=>{setPassword_confirmation(e.target.value)}}></input> */}
                        {/* <UploadImagem/> */}
                        <button className='w-[30%] ml-[50%] border border-[#70AD47]' onClick={createCliente }>Salvar</button>
                      </div>
                      <div className='w-[40%] flex justify-evenly items-center'>
                        <div className='w-[30%] flex justify-evenly items-center' onClick={handleAtivoClick}>
                            <label className='text-[1rem]' htmlFor="">Ativo</label>
                            <div className={` ${ativoStyle} hover:cursor-pointer border w-[1rem] h-[1rem] rounded-full`} ></div>
                        </div>
                        <div className='w-[30%] flex justify-evenly items-center' onClick={handleInativoClick}>
                            <label className='text-[1rem]' htmlFor="">Inativo</label>
                            <div className={`${inativoStyle} hover:cursor-pointer border w-[1rem] h-[1rem] rounded-full`} ></div>
                        </div>
                    </div>
                </div> 
            </div>
          </div>
        </div>
             
      </div>
 
  )
}

export default AddClienteScreen