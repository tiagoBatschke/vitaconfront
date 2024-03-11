import React, { useEffect, useState, useContext  } from 'react'
import { Link, Route, Routes, useNavigate} from "react-router-dom"
import axios from '../api/axios'
import { AuthContext } from '../context/context'
import LateralBar from '../components/lateralBar'
import UploadImagem from '../components/uploadImagem'


const AddCidadesScreen = () => {
    
    const [screen, setScreen] =useState('a')
    
    
  const [nome, setNome]= useState('')
  const [ufs, setUfs] = useState([]);
  const [selectedUf, setSelectedUf] = useState('');
 
  const navigate = useNavigate()

  const [campoFaltante, setCampoFaltante]=  useState(false)
  const [styledInput, setStyledInput]=  useState('border-red-400 border-[2px]')



  const  token = localStorage.getItem('token')
  const  user = localStorage.getItem('user')



  const validateInputs = () => {
    if ( !nome || !selectedUf) {
      setCampoFaltante(true)
      return false;
    }
  
    return true;
  };

  function createCidade() {

    if (!validateInputs()) {
      return;
    }


    axios.post('`https://testevitacon-bd7d417ef875.herokuapp.com/api/cidades', {
        nome: nome,
        uf: selectedUf 
    }, {
        withCredentials: true,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        setScreen('')
        setNome('')
        setSelectedUf(null)
        setCampoFaltante(false)
        navigate('/CidadesBairros')
    })
    .catch(error => {
        console.error('Erro:', error);
    });
  }

  
  useEffect(() => {
    async function fetchUfs() {
        try {
            const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
            const data = await response.json();
            setUfs(data);
        } catch (error) {
            console.error('Erro ao obter os UFs:', error);
        }
    }

    fetchUfs();
}, []);


 
 
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
               <Link to={'/CidadesBairros/newCidades'}  className={`hover:cursor-pointer font-bold`}>Base</Link>
               <Link to={'/CidadesBairros/Bairros'}  className={`hover:cursor-pointer hove:font-bold`}>Bairros</Link>
            </div>
            <div className='flex flex-col items-center justify-evenly w-[100%]'>     
                    <div className='w-[90%] h-[10vh] flex  items-center '>
                        <div className='w-[30%] h-[6vh]'>
                            <input className={`w-[100%] p-1 ml-[0%] h-[4vh] border ${ campoFaltante === true && !nome  ? styledInput : 'border-black'}`} placeholder='Nome' type="text" value={nome} onChange={(e) => setNome(e.target.value)}></input>
                            <p className={ campoFaltante === true && !nome  ? 'w-[80%] text-red-500 ' : 'invisible h-0 w-0 '} >Campo Obrigatorio!</p>
                        </div>
                        <div className='w-[30%] h-[6vh] ml-[10%]'>
                            <div className={`w-[100%] p-1  h-[4vh] border border-black  bg-white  ${ campoFaltante === true && !selectedUf  ? styledInput : 'border-black'}`}>
                                {/* Botão para abrir/fechar o dropdown */}
                                <select className={`w-[100%] h-[100%] flex text-slate-400`} name="uf" value={selectedUf} onChange={(e) => setSelectedUf(e.target.value)}>
                                    <option value="">Selecione o UF</option>
                                    {ufs.map((uf) => (
                                        <option key={uf.id} value={uf.sigla}>{uf.sigla} - {uf.nome}</option>
                                    ))}
                                </select>
                            </div>
                            <p className={ campoFaltante === true && !selectedUf  ? 'w-[80%] text-red-500' : 'invisible h-0 w-0 '} >Campo Obrigatório!</p>
                        </div>
                        <div className='w-[13%] ml-[8.5%]  h-[6vh]'>
                            <button className='w-[100%] border border-[#70AD47]' onClick={createCidade}>Salvar</button>
                        </div>
                    </div>  
            </div>
          </div>
        </div>
             
      </div>
 
  )
}

export default AddCidadesScreen