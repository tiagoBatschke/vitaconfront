import React, { useEffect, useState, useContext  } from 'react'
import { Link, Route, Routes, useNavigate} from "react-router-dom"
import axios from '../api/axios'
import { AuthContext } from '../context/context'
import LateralBar from '../components/lateralBar'
import UploadImagem from '../components/uploadImagem'


const ClienteScreen = () => {
  const [email, setEmail]= useState('')
  const [nome, setNome]= useState('')
  const [cnpj, setCnpj]= useState('')
  const [contato, setContato]= useState('')
  const [telefone, setTelefone]= useState('')
  const [ativo, setAtivo]= useState(true)
  const [inativo, setInativo]= useState(false)
  const [logo, setLogo]= useState('')
  const [clientesStyled, setClientesStyled]= useState(null)
  const [screen, setScreen] =useState()
  const [clientes, setClientes] =useState(null)
  const [clienteId, setClienteId] =useState('')
  const [password, setPassword]= useState('')
  const [password_confirmation, setPassword_confirmation]= useState('')
  const navigate = useNavigate()

  const [func, setFunc] =useState('create')




  const  token = localStorage.getItem('token')
  const  user = localStorage.getItem('user')


  function fetchClientes() {

    axios.get('https://testevitacon-bd7d417ef875.herokuapp.com/api/clientes',  {
      withCredentials: true,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        setClientes(response.data)
    })
    .catch(error => {
        console.error('Erro:', error);
    }); 
 
}

  function deleteClientes(id) {

    axios.delete(`https://testevitacon-bd7d417ef875.herokuapp.com/api/clientes/${id}`,  {
      withCredentials: true,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        setScreen('a')
    })
    .catch(error => {
        console.error('Erro:', error);
    }); 
 
}
  

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
      console.log(response.data);
      // Redirecionar para outra página, exibir uma mensagem de sucesso, etc.
  })
  .catch(error => {
      // Ocorreu um erro ao tentar registrar o usuário
      console.error('Erro:', error.response.data.message);
      // Exibir uma mensagem de erro para o usuário, redirecionar para outra página, etc.
  });
}




function createCliente() {

  registerUser();
  axios.post('https://testevitacon-bd7d417ef875.herokuapp.com/api/clientes', {
      nome: nome,
      cnpj: cnpj,
      contato: contato,
      email: email,
      telefone: telefone,
      celular: '11111',
      status: ativo === true ? 'ativo' : 'inativo',
  }, {
      withCredentials: true,
      headers: {
          'Authorization': `Bearer ${token}`
      }
  })
  .then(response => {
      setScreen('')
   
  })
  .catch(error => {
      console.error('Erro:', error);
  });
}



function updateCliente() {
  axios.put(`https://testevitacon-bd7d417ef875.herokuapp.com/api/clientes/${clienteId}`, {
      nome: nome,
      cnpj: cnpj,
      contato: contato,
      email: email,
      telefone: telefone,
      celular: '11111',
      status: ativo === true ? 'ativo' : 'inativo',
  }, {
      withCredentials: true,
      headers: {
          'Authorization': `Bearer ${token}`
      }
  })
  .then(response => {
      setScreen('')
      setNome('')
      setCnpj('')
      setContato('')
      setEmail('')
      setTelefone('')
  })
  .catch(error => {
      console.error('Erro:', error);
  });
}

  useEffect(() => {
    fetchClientes()
  }, [screen])


  useEffect(() => {

    if (clientes != null && clientes.clientes) {
      setClientesStyled(clientes.clientes.map((item) => {
        // Função para formatar a data
        const formatDate = (dateString) => {
          const regex = /^(\d{4})-(\d{2})-(\d{2})T.*/;
          const match = regex.exec(dateString);
          if (match) {
            const year = match[1];
            const month = match[2];
            const day = match[3];
            return `${day}/${month}/${year}`;
          }
          return dateString; // Retorna a string original se não houver correspondência
        };
  
        return (
          <tr className=' w-[100%]' key={item.id}>
            <td className=' w-[23%] text-center'>{item.nome.toUpperCase()}</td>
            <td className=' w-[23%] text-center'>{formatDate(item.created_at)}</td>
            <td className=' w-[23%] text-center'>{formatDate(item.status)}</td>
            <td className='w-[31%]'>
              <div className='w-[70%] ml-[30%]'>      
                <button className='w-[60%] mr-[2%] border border-[#70AD47]' onClick={()=>{setScreen('form'), setFunc('update'), setClienteId(item.id), setNome(item.nome), setCnpj(item.cnpj), setContato(item.contato), setEmail(item.email), setTelefone(item.telefone)}}>Editar</button>
                <button className='w-[10%] text-red-500 font-bold  ' onClick={()=>{deleteClientes(item.id)}}>X</button>
              </div>
            </td>
          </tr>
        );
      }));
    }
    
  }, [clientes]);

  const handleAtivoClick = () => {
    setAtivo(prevAtivo => true);
    setInativo(prevInativo => false);
  };
  
  const handleInativoClick = () => {
    setAtivo(prevAtivo => false);
    setInativo(prevInativo => true);
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
              <h2 className='w-[10%] ml-[2%] hover:cursor-pointer' onClick={()=>{setScreen('')}}>Clientes</h2>
              <button className='w-[10%] mr-[2%] border border-[#70AD47]' onClick={()=>{navigate('/Clientes/newCliente');}}>Novo Cliente</button>
            </div>
            <div className='flex flex-col items-center justify-evenly w-[100%]'>    
                    <table className='w-[90%] max-h-[50vh] min-h-[15vh]'>
                      <thead>
                        <tr className=''>
                          <th className='w-[23%]'>Nome</th>
                          <th className='w-[23%]'>Data de inclusão</th>
                          <th className='w-[23%]'>Status</th>
                          <th className='w-[31%]'>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {clientesStyled}
                      </tbody>
                    </table>     
            </div>
          </div>
        </div>
             
      </div>
 
  )
}

export default ClienteScreen