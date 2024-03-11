import React, { useEffect, useState, useContext  } from 'react'
import { Link, Route, Routes, useNavigate} from "react-router-dom"
import axios from '../api/axios'
import { AuthContext } from '../context/context'
import LateralBar from '../components/lateralBar'
import UploadImagem from '../components/uploadImagem'


const BairrosScreen = () => {
  const [nome, setNome]= useState('')
  const [bairrosStyled, setBairrosStyled]= useState(null)
  const [screen, setScreen] =useState('a')
  const [bairros, setBairros] =useState(null)
  const [regiao, setRegiao] =useState('')
  const navigate = useNavigate()

  const [campoFaltante, setCampoFaltante]=  useState(false)
  const [styledInput, setStyledInput]=  useState('border-red-400 border-[2px]')



  const  token = localStorage.getItem('token')
  const  user = localStorage.getItem('user')


  function fetchClientes() {

    axios.get('https://testevitacon-bd7d417ef875.herokuapp.com/api/bairros',  {
      withCredentials: true,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        setBairros(response.data)
    })
    .catch(error => {
        console.error('Erro:', error);
    }); 
 
}

  function deleteBairro(id) {

    axios.delete(`https://testevitacon-bd7d417ef875.herokuapp.com/api/bairros/${id}`,  {
      withCredentials: true,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        setScreen('a')
    })
    .catch(error => {
      alert('cliente não pode ser apagado, pois está sendo utilizado em outra rota')
        console.error('Erro:', error);
    }); 
 
}

useEffect(() => {
    fetchClientes()
  }, [screen])


  const validateInputs = () => {
    if ( !nome || !regiao) {
      setCampoFaltante(true)
      return false;
    }
  
    return true;
  };

  function createBairros() {

    if (!validateInputs()) {
      return;
    }


    axios.post('https://testevitacon-bd7d417ef875.herokuapp.com/api/bairros', {
        nome: nome,
        regiao: regiao 
    }, {
        withCredentials: true,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        setScreen('')
        setNome('')
        setRegiao(null)
        setCampoFaltante(false)
    })
    .catch(error => {
        console.error('Erro:', error);
    });
  }

  useEffect(() => {

    if (bairros != null && bairros.bairros) {
      setBairrosStyled( bairros.bairros.map((item) => {
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
          <tr className='h-[5vh] w-[100%]' key={item.id}>
            <td className=' w-[23%] text-center'>{item.nome.toUpperCase()}</td>
            <td className=' w-[23%] text-center'>{formatDate(item.created_at)}</td>
            <td className=' w-[23%] text-center'>{item.regiao}</td>
            <td className='w-[31%]'>
              <div className='w-[70%] ml-[30%]'>      
                <button className='w-[60%] mr-[2%] border border-[#70AD47]' onClick={()=>{navigate(`/CidadesBairros/Bairros/editBairros/${item.id}`)}}>Editar</button>
                <button className='w-[10%] text-red-500 font-bold  ' onClick={()=>{deleteBairro(item.id)}}>X</button>
              </div>
            </td>
          </tr>
        );
      }));
    }
    
  }, [bairros, screen]);


  const handleRegiaoChange = (event) => {
    const selectedRegiao = event.target.value;
    setRegiao(selectedRegiao)
    
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
         <LateralBar user={user} screen={'Cidades'}/>
          <div className='flex flex-col items-center w-[83%] bg-[#F9F9F9]'>
            <div className='flex items-center justify-between w-[90%] h-[10vh]'>
              <h2 className='w-[20%] ml-[2%] hover:cursor-pointer' onClick={()=>{navigate('/CidadesBairros')}}>Cidades / Bairros</h2>
              <button className='w-[10%] mr-[2%] border border-[#70AD47]' onClick={()=>{navigate('/CidadesBairros/newCidades');}}>Nova Cidade</button>
            </div>
            <div className='flex items-center justify-evenly w-[90%] h-[5vh]  border-b mb-5'>
               <Link to={'/CidadesBairros/newCidades'}  className={`hover:cursor-pointer hover:font-bold`}>Base</Link>
               <Link to={'/CidadesBairros/Bairros'}  className={`hover:cursor-pointer font-bold`}>Bairros</Link>
            </div>
            <div className='flex flex-col items-center justify-evenly w-[100%]'>    
                    <table className='w-[90%] max-h-[50vh] min-h-[15vh]'>
                      <thead>
                        <tr className=''>
                          <th className='w-[23%]'>Nome</th>
                          <th className='w-[23%]'>Data de inclusão</th>
                          <th className='w-[23%]'>Região</th>
                          <th className='w-[31%]'>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bairrosStyled}
                      </tbody>

                    </table>   
                    <div className='w-[90%] h-[10vh] flex  items-center '>
                        <div className='w-[30%] h-[6vh]'>
                            <input className={`w-[100%] p-1 ml-[0%] h-[4vh] border ${ campoFaltante === true && !nome  ? styledInput : 'border-black'}`} placeholder='Nome' type="text" value={nome} onChange={(e) => setNome(e.target.value)}></input>
                            <p className={ campoFaltante === true && !nome  ? 'w-[80%] text-red-500 ' : 'invisible h-0 w-0 '} >Campo Obrigatorio!</p>
                        </div>
                        <div className='w-[30%] h-[6vh] ml-[10%]'>
                            <div className={`w-[100%] p-1  h-[4vh] border border-black  bg-white  ${ campoFaltante === true && !regiao  ? styledInput : 'border-black'}`}>
                                {/* Botão para abrir/fechar o dropdown */}
                                <select className={`w-[100%] h-[100%] flex text-slate-400`} name="regiao" value={regiao} onChange={handleRegiaoChange}>
                                    <option value="">Selecione a região</option>
                                    <option value="norte">Norte</option>
                                    <option value="sul">Sul</option>
                                    <option value="leste">Leste</option>
                                    <option value="oeste">Oeste</option>
                                    <option value="centro">Centro</option>
                                    <option value="zona rural">Zona Rural</option>
                                </select>
                                </div>
                                <p className={ campoFaltante === true && !regiao  ? 'w-[80%] text-red-500' : 'invisible h-0 w-0 '} >Campo Obrigatorio!</p>
                        </div>
                        <div className='w-[13%] ml-[8.5%]  h-[6vh]'>
                             <button className='w-[100%] border border-[#70AD47]' onClick={createBairros}>Incluir</button>
                        </div>
                    </div>  
            </div>
          </div>
        </div>
             
      </div>
 
  )
}

export default BairrosScreen