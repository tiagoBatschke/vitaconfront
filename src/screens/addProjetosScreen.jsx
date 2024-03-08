import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from "react-router-dom";
import axios from '../api/axios';
import { AuthContext } from '../context/context';
import LateralBar from '../components/lateralBar';
import UploadImagem from '../components/uploadImagem';

const AddProjetosScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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
  const [status, setStatus] = useState('ativo');

  const [ativoStyle, setAtivoStyle] = useState('bg-[#127ceee1]');
  const [inativoStyle, setInativoStyle] = useState('bg-[#127ceee1]');



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








  const validateInputs = () => {
    if ( !nome || !clienteId || !tipo) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return false;
    }
  
  
    return true;
  };



  function createProjetos() {

    if (!validateInputs()) {
      return;
    }


    axios.post('https://testevitacon-bd7d417ef875.herokuapp.com/api/projetos', {
        nome: nome,
        cliente_id: clienteId, 
        tipos: tipo,
        status: status
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
        navigate(`/Projetos`)
  
    })
    .catch(error => {
        console.error('Erro:', error);
    });
  }


  useEffect(() => {
    fetchClientes()
  }, [screen]);



  useEffect(() => {
    if (clientes && clientes.clientes) {
      setClientesStyled(clientes.clientes.map((item) => {
        const formatDate = (dateString) => {
          const regex = /^(\d{4})-(\d{2})-(\d{2})T.*/;
          const match = regex.exec(dateString);
          if (match) {
            const year = match[1];
            const month = match[2];
            const day = match[3];
            return `${day}/${month}/${year}`;
          }
          return dateString;
        };
  
        return (
          <option key={item.id} value={item.id}>{item.nome.toUpperCase()}</option>
        );
      }));
    }
  }, [clientes]);

  useEffect(() => {
    if (ativo) {
      setStatus('ativo');
      setAtivoStyle('bg-[#127ceee1]');
      setInativoStyle('bg-[#fff]');
    } else {
      setStatus('inativo');
      setAtivoStyle('bg-[#fff]');
      setInativoStyle('bg-[#127ceee1]');
    }
  }, [ativo]);
  

  const handleAtivoClick = () => {
    setAtivo(true);
    setInativo(false);
  };
  
  const handleInativoClick = () => {
    setAtivo(false);
    setInativo(true);
  };


  const handleSelectChange = (event) => {
    const selectedClientId = event.target.value;
    setClienteId(selectedClientId);
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
              <h2 className='w-[10%] ml-[2%] hover:cursor-pointer' onClick={()=>{navigate(`/Projetos`)}}>Projetos</h2>
            </div>
            <div className='flex flex-col items-center justify-evenly w-[100%]'>
                <div className='w-[100%] h-[10vh]  flex '>
                      <div className='w-[50%] h-[60vh] flex flex-col justify-evenly items-center '>
                        <input className='w-[80%] p-1 ml-[0%] h-[4vh] border border-black' placeholder='Nome' type="text" value={nome} onChange={(e) => setNome(e.target.value)}></input>
                        <div className="w-[80%] p-1 ml-[0%] h-[4vh] border border-black  bg-white">
                              {/* Botão para abrir/fechar o dropdown */}
                              <select onChange={handleSelectChange} className="w-[100%] h-[100%] flex text-slate-400">
                                {clientesStyled}
                              </select>

                            </div>
                            <input className='w-[80%] p-1 ml-[0%] h-[4vh] border border-black' placeholder='Tipo' type="text" value={tipo} onChange={(e) =>setTipo(e.target.value)}></input>
                          <button className='w-[30%] ml-[50%] border border-[#70AD47]' onClick={createProjetos}>Salvar</button>
                      </div>
                      <div className='w-[40%] flex justify-evenly items-center'>
                    <div className='w-[30%] flex justify-evenly items-center' onClick={handleAtivoClick}>
                    <label className='text-[1rem]' htmlFor="">Ativo</label>
                    <div className={`${ativoStyle} hover:cursor-pointer border w-[1rem] h-[1rem] rounded-full`} ></div>
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
 
  );
};

export default AddProjetosScreen;