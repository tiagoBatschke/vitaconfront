import React, { useEffect, useState, useContext  } from 'react'
import { Link, Route, Routes, useNavigate} from "react-router-dom"
import axios from '../../api/axios'
import { useParams } from 'react-router-dom';
import LateralBar from '../../components/lateralBar'
import UploadImagem from '../../components/uploadImagem'


const EditDiferencial = () => {
  const { id } = useParams();
  const [screen, setScreen] =useState('a')
  const [bairros, setBairros] =useState(null)
  const [AreaComumValue, setAreaComumValue] =useState(null)

    
  const [nome, setNome]= useState('')

  const navigate = useNavigate()

  const [campoFaltante, setCampoFaltante]=  useState(false)
  const [styledInput, setStyledInput]=  useState('border-red-400 border-[2px]')

  const [toggleLogOut, setToggleLogOut] = useState(false)
  const [userOptions, setUserOptions] =useState(<div className='text-center text-white -mb-8 mt-2 w-[90%] -ml-[10%] bg-slate-500 z-10' onClick={()=>{localStorage.setItem('token', ''), setScreen('gg')}}>Log Out</div>)


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

    fetchDiferencial() 
  }, [screen]);

  const validateInputs = () => {
    if ( !nome || !AreaComumValue) {
      setCampoFaltante(true)
      return false;
    }
  
    return true;
  };



  function fetchDiferencial() {

    axios.get(`http://127.0.0.1:8000/api/diferenciais/${id}`,  {
      withCredentials: true,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
   
        setNome(response.data.nome)
        setAreaComumValue(response.data.area_comum)
    })
    .catch(error => {
        console.error('Erro:', error);
    }); 
 
}


  function updateDiferencial() {

    if (!validateInputs()) {
      return;
    }


    axios.put(`http://127.0.0.1:8000/api/diferenciais/${id}`, {
        nome: nome,
        area_comum: true
    }, {
        withCredentials: true,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        navigate('/Diferenciais')
    })
    .catch(error => {
        console.error('Erro:', error);
    });
  }


 
const handleSelectChange = (event) => {
  
  setAreaComumValue(event.target.value)
 
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
         <LateralBar user={user} screen={'Cidades'}/>
          <div className='flex flex-col items-center w-[83%] bg-[#F9F9F9]'>
            <div className='flex items-center justify-between w-[90%] h-[10vh]'>
              <h2 className='w-[20%] ml-[2%] hover:cursor-pointer' onClick={()=>{navigate('/CidadesBairros')}}>Diferenciais</h2>
            </div>
            <div className='flex flex-col items-center justify-evenly w-[100%]'>     
                    <div className='w-[90%] h-[10vh] flex  items-center '>
                        <div className='w-[30%] h-[6vh]'>
                            <input className={`w-[100%] p-1 ml-[0%] h-[4vh] border ${ campoFaltante === true && !nome  ? styledInput : 'border-black'}`} placeholder='Nome' type="text" value={nome} onChange={(e) => setNome(e.target.value)}></input>
                            <p className={ campoFaltante === true && !nome  ? 'w-[80%] text-red-500 ' : 'invisible h-0 w-0 '} >Campo Obrigatorio!</p>
                        </div>
                        <div className='w-[30%] h-[6vh] ml-[10%]'>

                        <div className={`w-[80%] p-1 ml-[0%] h-[4vh] border border-black  bg-white  ${ campoFaltante === true && !AreaComumValue  ? styledInput : 'border-black'}`}>
                              {/* Botão para abrir/fechar o dropdown */}
                              <select onChange={handleSelectChange} value={AreaComumValue} className={`w-[100%] h-[100%] flex text-slate-400 `}>
                                <option value="">Area comum</option>
                                <option value={true}>Sim</option>
                                <option value={false}>Não</option>
                              </select>
                            </div>
                            <p className={ campoFaltante === true && !AreaComumValue  ? 'w-[80%] text-red-500' : 'invisible h-0 w-0 '} >Campo Obrigatório!</p>
                        </div>
                        <div className='w-[13%] ml-[8.5%]  h-[6vh]'>
                            <button className='w-[100%] border border-[#70AD47]' onClick={updateDiferencial}>Salvar</button>
                        </div>
                    </div>  
            </div>
          </div>
        </div>
             
      </div>
 
  )
}

export default EditDiferencial