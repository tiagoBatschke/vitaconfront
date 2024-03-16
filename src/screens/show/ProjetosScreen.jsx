import React, { useEffect, useState, useContext  } from 'react'
import { Link, Route, Routes, useNavigate} from "react-router-dom"
import axios from '../../api/axios'
  
import LateralBar from '../../components/lateralBar'


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
  const [toggleLogOut, setToggleLogOut] = useState(false)
  const [userOptions, setUserOptions] =useState(<div className='text-center text-white -mb-8 mt-2 w-[90%] -ml-[10%] bg-slate-500 z-10' onClick={()=>{localStorage.setItem('token', ''), setScreen('gg')}}>Log Out</div>)
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
  }, [screen]);


  const navigate = useNavigate()

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
          <tr className='h-[6vh] w-[100%]' key={item.id}>
            <td className=' w-[23%] text-center'>{item.nome.toUpperCase()}</td>
            <td className=' w-[23%] text-center'>{formatDate(item.created_at)}</td>
            <td className=' w-[23%] text-center'>{formatDate(item.status)}</td>
            <td className='w-[31%]'>
              <div className='w-[70%] ml-[30%]'>      
                <button className='w-[60%] mr-[2%] border border-[#70AD47]' onClick={()=>{navigate(`/Projetos/editProjeto/${item.id}`)}}>Editar</button>
                <button className='w-[10%] text-red-500 font-bold mr-[2%] ' onClick={()=>{deleteProjeto(item.id)}}>X</button>
              </div>
            </td>
          </tr>
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
         <LateralBar user={user} screen={'Projetos'}/>
          <div className='flex flex-col items-center w-[83%] bg-[#F9F9F9]'>
            <div className='flex items-center justify-between w-[90%] h-[10vh]'>
              <h2 className='w-[10%] ml-[2%] hover:cursor-pointer' onClick={()=>{setScreen('')}}>Projetos</h2>
              <button className='w-[10%] mr-[2%] border border-[#70AD47]' onClick={()=>{navigate(`/Projetos/addProjeto`)}}>Novo Projeto</button>
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
                          {projetosStyled}
                      </tbody>
                    </table>  
            </div>
          </div>
        </div>
             
      </div>
 
  )
}

export default ProjetosScreen