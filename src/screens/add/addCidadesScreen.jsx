import React, { useEffect, useState, useContext  } from 'react'
import { Link, Route, Routes, useNavigate} from "react-router-dom"
import axios from '../../api/axios'
  
import LateralBar from '../../components/lateralBar'
import UploadImagem from '../../components/uploadImagem'


const AddCidadesScreen = () => {
    
  const [screen, setScreen] =useState('a')
  const [bairros, setBairros] =useState(null)
  const [bairroId, setBairroId] =useState(null)
  const [bairrosStyled, setBairrosStyled]= useState(null)
    
  const [nome, setNome]= useState('')
  const [ufs, setUfs] = useState([]);
  const [selectedUf, setSelectedUf] = useState('');
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
  }, [screen]);

  const validateInputs = () => {
    if ( !nome || !selectedUf || !bairroId) {
      setCampoFaltante(true)
      return false;
    }
  
    return true;
  };



  function fetchBairros() {

    axios.get('http://127.0.0.1:8000/api/bairros',  {
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

  function createCidade() {

    if (!validateInputs()) {
      return;
    }


    axios.post('http://127.0.0.1:8000/api/cidades', {
        nome: nome,
        uf: selectedUf, 
        bairro: bairroId 
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


useEffect(() => {
  fetchBairros()
}, [screen])


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
        <option key={item.id} value={item.id}>{item.nome.toUpperCase()}</option>
      );
    }));
  }
  
}, [bairros, screen]);

 
const handleSelectChange = (event) => {

  setBairroId(event.target.value)

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
              <h2 className='w-[20%] ml-[2%] hover:cursor-pointer' onClick={()=>{navigate('/CidadesBairros')}}>Cidades / Bairros</h2>

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
                        <div className='w-[30%] h-[6vh] ml-[10%]'>

                        <div className={`w-[80%] p-1 ml-[0%] h-[4vh] border border-black  bg-white  ${ campoFaltante === true && !bairroId  ? styledInput : 'border-black'}`}>
                              {/* Botão para abrir/fechar o dropdown */}
                              <select onChange={handleSelectChange} className={`w-[100%] h-[100%] flex text-slate-400 `}>
                                <option value="">Selecione um bairro</option>
                                {bairrosStyled}
                              </select>
                            </div>
                            <p className={ campoFaltante === true && !bairroId  ? 'w-[80%] text-red-500' : 'invisible h-0 w-0 '} >Campo Obrigatório!</p>
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