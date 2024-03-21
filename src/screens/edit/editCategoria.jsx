import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from "react-router-dom";
import axios from '../../api/axios';
  ;
import LateralBar from '../../components/lateralBar';
import UploadImagem from '../../components/uploadImagem';

const EditCategoria = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nome, setNome]= useState('')
  const [bairrosStyled, setBairrosStyled]= useState(null)
  const [screen, setScreen] =useState('a')
  const [bairros, setBairros] =useState(null)
  const [regiao, setRegiao] =useState('')


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
  }, [screen]);



  function fetchBairro() {

    axios.get(`http://127.0.0.1:8000/api/categorias/${id}`,  {
      withCredentials: true,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        setNome(response.data.Categoria.nome)
       
    })
    .catch(error => {
        console.error('Erro:', error);
    }); 
 
}






const validateInputs = () => {
  if ( !nome ) {
    setCampoFaltante(true)
    return false;
  }

  return true;
};



  function updateBairros() {

    if (!validateInputs()) {
        return;
      }
    
    axios.put(`http://127.0.0.1:8000/api/categorias/${id}`, {
      nome: nome,
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
        navigate(`/Poi/Categorias`)
    })
    .catch(error => {
        console.error('Erro:', error);
    });
  }

  


  useEffect(() => {
 
    fetchBairro()
  }, [screen]);




  useEffect(() => {
  
  }, [ campoFaltante]);
  





  const handleRegiaoChange = (event) => {
    const selectedRegiao = event.target.value;
    setRegiao(selectedRegiao)
    
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
              <h2 className='w-[20%] ml-[2%] hover:cursor-pointer' onClick={()=>{navigate('/CidadesBairros')}}>Cidades / Bairros</h2>
            </div>
            <div className='flex items-center justify-evenly w-[90%] h-[5vh]  border-b mb-5'>
                <Link to={'/Poi'}  className={`hover:cursor-pointer hover:font-bold`}>(POI)</Link>
               <Link to={'/Poi/Categorias'}  className={`hover:cursor-pointer hover:font-bold`}>Categorias</Link>
            </div>
            <div className='flex flex-col items-center justify-evenly w-[100%]'>
                <div className='w-[100%] h-[10vh]  flex '>
                <div className='w-[90%]  ml-[5%] h-[10vh] flex  items-center '>
                        <div className='w-[30%] h-[6vh]'>
                            <input className={`w-[100%] p-1 ml-[0%] h-[4vh] border ${ campoFaltante === true && !nome  ? styledInput : 'border-black'}`} placeholder='Nome' type="text" value={nome} onChange={(e) => setNome(e.target.value)}></input>
                            <p className={ campoFaltante === true && !nome  ? 'w-[80%] text-red-500 ' : 'invisible h-0 w-0 '} >Campo Obrigatorio!</p>
                        </div>
                        <div className='w-[13%] ml-[8.5%]  h-[6vh]'>
                             <button className='w-[100%] border border-[#70AD47]' onClick={updateBairros}>Salvar</button>
                        </div>
                    </div>  
                </div>  
            </div>
          </div>
        </div>
             
      </div>
 
  );
};

export default EditCategoria;