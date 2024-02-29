import React, { useEffect, useState, useContext  } from 'react'
import { Link, Route, Routes, useNavigate} from "react-router-dom"
import axios from '../api/axios'
import { AuthContext } from '../context/context'
import LateralBar from '../components/lateralBar'


const ProjetosScreen = () => {


 
  const [ativo, setAtivo]= useState(true)
  const [inativo, setInativo]= useState(false)
  const [projetosStyled, setprojetosStyled]= useState(null)
  const [screen, setScreen] =useState()
  const [clientes, setClientes] =useState(null)
  const [nome, setNome] =useState(null)
  const [cliente, setCliente] =useState('Cliente')
  const [clientesStyled, setClientesStyled]= useState(null)
  const [clienteId, setClienteId] =useState(null)
  const [tipo, setTipo] =useState(null)
  const [projetos, setProjetos] =useState(null)
  const [projetoId, setProjetoId] =useState('')
  const [func, setFunc] =useState('create')
  const  token = localStorage.getItem('token')
  const  user = localStorage.getItem('user')


  function fetchProjetos() {

    axios.get('https://testevitacon-bd7d417ef875.herokuapp.com/api/projetos',  {
      withCredentials: true,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        setProjetos(response.data)
       
    })
    .catch(error => {
        console.error('Erro:', error);
    }); 
 
}
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

  function deleteProjeto(id) {

    axios.delete(`https://testevitacon-bd7d417ef875.herokuapp.com/api/projetos/${id}`,  {
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

function createProjetos() {
  axios.post('https://testevitacon-bd7d417ef875.herokuapp.com/api/projetos', {
      nome: nome,
      cliente_id: clienteId, 
      tipos: tipo,
  }, {
      withCredentials: true,
      headers: {
          'Authorization': `Bearer ${token}`
      }
  })
  .then(response => {
      setScreen('')
      setNome('')
      setClienteId(null)
      setCliente('Cliente')
      setTipo('')

  })
  .catch(error => {
      console.error('Erro:', error);
  });
}


function updateProjetos() {
  axios.put(`https://testevitacon-bd7d417ef875.herokuapp.com/api/projetos/${projetoId}`, {
    nome: nome,
    cliente_id: clienteId, 
    tipos: tipo,
  }, {
      withCredentials: true,
      headers: {
          'Authorization': `Bearer ${token}`
      }
  })
  .then(response => {
    setScreen('')
    setNome('')
    setClienteId(null)
    setCliente('Cliente')
    setTipo('')
  })
  .catch(error => {
      console.error('Erro:', error);
  });
}

  useEffect(() => {
    fetchProjetos()
    fetchClientes()
  }, [screen])


  useEffect(() => {

    if (projetos != null && projetos.projetos) {
      setprojetosStyled(projetos.projetos.map((item) => {
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
          <div className='flex w-[100%] justify-evenly items-center' key={item.id}>
            <div className='w-[20%]'>{item.nome.toUpperCase()}</div>
            <div>{formatDate(item.created_at)}</div>
            <div>{formatDate(item.status)}</div>
            <div className='w-[15%] flex justify-evenly'>
              <button className='w-[60%] mr-[2%] border border-[#70AD47]' onClick={()=>{setScreen('form'), setFunc('update'), setProjetoId(item.id)}}>Editar</button>
              <button className='w-[10%] text-red-500 font-bold mr-[2%] ' onClick={()=>{deleteProjeto(item.id)}}>X</button>
            </div>
          </div>
        );
      }));
    }
    
  }, [projetos]);


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
          <div className='flex w-[100%] h-[5vh] justify-evenly items-center mt-2' key={item.id} onClick={()=>{setCliente(item.nome.toUpperCase()), setClienteId(item.id), toggleDropdown()}}>
            <div className='w-[20%]'>{item.nome.toUpperCase()}</div>
            <div>{formatDate(item.created_at)}</div>
            <div>{formatDate(item.status)}</div>
          </div>
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


    const [isOpen, setIsOpen] = useState(false);
  
    // Função para alternar o estado do dropdown entre aberto e fechado
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
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
         <LateralBar user={user} screen={'Projetos'}/>
          <div className='flex flex-col items-center w-[83%] bg-[#F9F9F9]'>
            <div className='flex items-center justify-between w-[90%] h-[10vh]'>
              <h2 className='w-[10%] ml-[2%] hover:cursor-pointer' onClick={()=>{setScreen('')}}>Projetos</h2>
              <button className='w-[10%] mr-[2%] border border-[#70AD47]' onClick={()=>{setScreen('form')}}>Novo Projeto</button>
            </div>
            <div className='flex flex-col items-center justify-evenly w-[100%]'>
            {screen === "form" ? (
                <div className='w-[100%] h-[10vh]  flex '>
                      <div className='w-[50%] h-[60vh] flex flex-col justify-evenly items-center '>
                        <input className='w-[80%] p-1 ml-[0%] h-[4vh] border border-black' placeholder='Nome' type="text" value={nome} onChange={(e) => setNome(e.target.value)}></input>
                        <div className="w-[80%] p-1 ml-[0%] h-[4vh] border border-black  bg-white">
                              {/* Botão para abrir/fechar o dropdown */}
                              <button className="w-[100%] h-[100%] flex text-slate-400" onClick={toggleDropdown}>{cliente}</button>

                              {/* Conteúdo do dropdown */}
                              {isOpen && (
                                <div className="bg-[#93919133] w-[103%] -ml-[1.5%]">
                                 {clientesStyled}
                                </div>
                              )}
                            </div>
                            <input className='w-[80%] p-1 ml-[0%] h-[4vh] border border-black' placeholder='Tipo' type="text" value={tipo} onChange={(e) =>setTipo(e.target.value)}></input>
                          <button className='w-[30%] ml-[50%] border border-[#70AD47]' onClick={func === 'create' ? createProjetos : updateProjetos}>Salvar</button>
                      </div>
                     <div className='w-[40%] flex justify-evenly  items-center'>
                        <div className='w-[30%] flex justify-evenly  items-center'>
                          <label className='text-[1rem]' htmlFor="">Ativo</label>
                          <button className={`bg-[${ativo === true ? '#127ceee1' : '#fff'}] hover:cursor-pointer border w-[1rem] h-[1rem] rounded-full`} onClick={handleAtivoClick}></button>
                        </div>
                        <div className='w-[30%] flex justify-evenly  items-center'>
                          <label className='text-[1rem]' htmlFor="">Inativo</label>
                          <button className={`bg-[${inativo  === true ? '#127ceee1' : '#fff'}] hover:cursor-pointer border w-[1rem] h-[1rem] rounded-full`} onClick={handleInativoClick}></button>
                        </div>
                     </div>
                </div>  
                ) : (
                  <div className='flex flex-col items-center justify-evenly w-[100%] h-[50vh]'>
                    {/* Caso contrário, renderize o conteúdo de projetosStyled */}
                    {projetosStyled}
                  </div>
                )}
            </div>
          </div>
        </div>
             
      </div>
 
  )
}

export default ProjetosScreen