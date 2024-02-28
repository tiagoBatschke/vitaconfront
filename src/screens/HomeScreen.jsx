import React, { useEffect, useState, useContext  } from 'react'
import { Link, Route, Routes, useNavigate} from "react-router-dom"
import axios from '../api/axios'
import { AuthContext } from '../context/context'


const HomeScreen = () => {
  const [email, setEmail]= useState('')
  const [nome, setNome]= useState('')
  const [cnpj, setCnpj]= useState('')
  const [contato, setContato]= useState('')
  const [telefone, setTelefone]= useState('')
  const [ativo, setAtivo]= useState(true)
  const [inativo, setInativo]= useState(false)
  const [logo, setLogo]= useState('')
  const [clientesStyled, setClientesStyled]= useState(null)
  const [user, setUser] =useState()
  const [screen, setScreen] =useState()
  const [clientes, setClientes] =useState(null)
  const navigate = useNavigate()



  const { token, setToken } = useContext(AuthContext);

  function fetchData() {

    axios.get('https://testevitacon-bd7d417ef875.herokuapp.com/api/user',  {
      withCredentials: true,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        setUser(response.data)
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
  


function createCliente() {
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

  useEffect(() => {
    fetchClientes()
  }, [screen])


  useEffect(() => {

    if (clientes != null) {
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
          <div className='flex w-[100%] justify-evenly items-center' key={item.id}>
            <div className='w-[20%]'>{item.nome.toUpperCase()}</div>
            <div>{formatDate(item.created_at)}</div> {/* Chama a função formatDate para formatar a data */}
            <div className='w-[15%] flex justify-evenly'>
              <button className='w-[60%] mr-[2%] border border-[#70AD47]'>Editar</button>
              <button className='w-[10%] text-red-500 font-bold mr-[2%] '>X</button>
            </div>
          </div>
        );
      }));
    }
    
    
  }, [clientes]);

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
          <div className='flex flex-col  h-[90vh] w-[17%] bg-[#283138]'>
            <div className=' bg-[#2c4267b6] hover:cursor-pointer  hover:font-bold flex items-center justify-between  w-[100%] h-[5rem]'>
              <div className='flex items-center ml-[10%] w-[80%]'>
                <img src="https://github.com/tiagoBatschke/vitaconfront/blob/main/src/assets/icon-Png.png?raw=true" className='w-[3rem] h-[3rem]' alt="" />
                <Link  className=' text-white text-[1.3rem] ml-[5%]'>ferando</Link>
              </div>
            </div>
            <div className=' hover:cursor-pointer  hover:font-bold flex items-center justify-between  w-[100%] h-[3rem]'>
              <div className='flex items-center ml-[10%] w-[80%]'>
                <img src="https://github.com/tiagoBatschke/vitaconfront/blob/main/src/assets/ship_icon.png?raw=true" className='w-[2rem] h-[2rem] ml-[0.5rem]' alt="" />
                <Link  className=' text-[#ffffff93] ml-[10%]'>Dashboard</Link>
              </div>
            </div>
            <div className='flex flex-col bg-[#ffffff1e]  w-[100%]  h-[80%]   items-center'>
              <div className='flex flex-col  h-[60%]  w-[90%]  justify-evenly '>
                <Link  className=' hover:cursor-pointer hover:font-bold text-white'>Institucional</Link>
                <div className='flex flex-col'>
                  <Link  className=' hover:cursor-pointer hover:font-bold text-white'>Cidades / Bairros</Link>
                  <Link  className=' hover:cursor-pointer hover:font-bold text-white'>POI(localizações)</Link>
                  <Link  className=' hover:cursor-pointer hover:font-bold text-white'>Diferenciais</Link>
                  <Link  className=' hover:cursor-pointer hover:font-bold text-white'>Tipos de uso</Link>
                </div>
                <Link  className=' hover:cursor-pointer hover:font-bold text-white'>Empreendimentos</Link>
                <div className='flex flex-col'>
                  <Link  className=' hover:cursor-pointer hover:text-[1.4rem]  text-white text-[1.3rem] font-bold'>CLIENTES *</Link>
                  <Link  className=' hover:cursor-pointer hover:font-bold text-white text-[1.3rem] font-semibold'>PROJETOS</Link>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col items-center w-[83%] bg-[#F9F9F9]'>
            <div className='flex items-center justify-between w-[90%] h-[10vh]'>
              <h2 className='w-[10%] ml-[2%]'>Clientes</h2>
              <button className='w-[10%] mr-[2%] border border-[#70AD47]' onClick={()=>{setScreen('form')}}>Novo Cliente</button>
            </div>
            <div className='flex flex-col items-center justify-evenly w-[100%]'>
            {screen === "form" ? (
                <div className='w-[100%] h-[10vh]  flex '>
                      <div className='w-[50%] h-[60vh] flex flex-col justify-evenly items-center '>
                        <input className='w-[80%] p-1 ml-[0%] h-[4vh] border border-black' placeholder='Nome' type="text" value={nome} onChange={(e) => setNome(e.target.value)}></input>
                        <input className='w-[80%] p-1 ml-[0%] h-[4vh] border border-black' placeholder='Cnpj' type="text" value={cnpj} onChange={(e) => setCnpj(e.target.value)}></input>
                        <input className='w-[80%] p-1 ml-[0%] h-[4vh] border border-black' placeholder='Contato' type="text" value={contato} onChange={(e) => setContato(e.target.value)}></input>
                        <input className='w-[80%] p-1 ml-[0%] h-[4vh] border border-black' placeholder='Email' type="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                        <input className='w-[80%] p-1 ml-[0%] h-[4vh] border border-black' placeholder='telefone celular' type="tel" value={telefone} onChange={(e) => setTelefone(e.target.value)}></input>
                        <button className='w-[30%] ml-[50%] border border-[#70AD47]' onClick={createCliente}>Salvar</button>
                      </div>
                     <div className='w-[40%] flex justify-evenly  items-center'>
                        <div className='w-[30%] flex justify-evenly  items-center'>
                          <label className='text-[1rem]' htmlFor="">Ativo</label>
                          <button className={`bg-[${ativo ? '#127ceee1' : '#fff'}] hover:cursor-pointer border w-[1rem] h-[1rem] rounded-full`} onClick={handleAtivoClick}></button>
                        </div>
                        <div className='w-[30%] flex justify-evenly  items-center'>
                          <label className='text-[1rem]' htmlFor="">Inativo</label>
                          <button className={`bg-[${inativo ? '#127ceee1' : '#fff'}] hover:cursor-pointer border w-[1rem] h-[1rem] rounded-full`} onClick={handleInativoClick}></button>
                        </div>
                     </div>
                </div>  
                ) : (
                  <div className='flex flex-col items-center justify-evenly w-[100%] h-[50vh]'>
                    {/* Caso contrário, renderize o conteúdo de clientesStyled */}
                    {clientesStyled}
                  </div>
                )}
            </div>
          </div>
        </div>
             
      </div>
 
  )
}

export default HomeScreen