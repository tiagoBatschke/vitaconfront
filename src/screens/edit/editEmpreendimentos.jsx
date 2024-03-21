import React, { useEffect, useState, useContext  } from 'react'
import { Link, Route, Routes, useNavigate, useParams} from "react-router-dom"
import axios from '../../api/axios'

  
import LateralBar from '../../components/lateralBar'
import UploadImagem from '../../components/uploadImagem'


const EditEmpreendimentos = () => {
    
  const [screen, setScreen] =useState('a')
  const [projetos, setProjetos] =useState(null)
  const [projetosStyled, setProjetosStyled]= useState(null)
  const [ProjetoId, setProjetoId] =useState(null)
  const [bairros, setBairros] =useState(null)
  const [bairroId, setBairroId] =useState(null)
  const [bairrosStyled, setBairrosStyled]= useState(null)
  const [nome, setNome]= useState('')
  const [endereco, setEndereco]= useState('')
  const [aviso, setAviso]= useState('')
  const [latitudeLongitude, setLatitudeLongitude]= useState('')
  const [corPrimaria, setCorPrimaria]= useState('')
  const [corSecundaria, setCorSecundaria]= useState('')

  const [ufs, setUfs] = useState([]);
  const [selectedUf, setSelectedUf] = useState('');
  const navigate = useNavigate()

  const [imagens, setImagens]= useState([])
  const [Videos, setVideos]= useState([])
  const [Pois, setPois]= useState([])
  const [Unidades, setUnidades]= useState([])
  const [Diferenciais, setDiferenciais]= useState([])
  const [FichaTecnica, setFichaTecnica]= useState([])

  const [campoFaltante, setCampoFaltante]=  useState(false)
  const [styledInput, setStyledInput]=  useState('border-red-400 border-[2px]')

  const [toggleLogOut, setToggleLogOut] = useState(false)
  const [userOptions, setUserOptions] =useState(<div className='text-center text-white -mb-8 mt-2 w-[90%] -ml-[10%] bg-slate-500 z-10' onClick={()=>{localStorage.setItem('token', ''), setScreen('gg')}}>Log Out</div>)

  const [ativo, setAtivo]= useState(true)
  const [ativoStyle, setAtivoStyle]= useState(`bg-[#127ceee1]`)
  const [inativo, setInativo]= useState(false)
  const [status, setStatus]= useState('ativo')
  const [inativoStyle, setInativoStyle]= useState(`bg-[#127ceee1]`)

  const [tiposDeUsoStyled, setTiposDeUsoStyled]= useState(null)
  const [tiposDeUso, setTiposDeUso] =useState(null)

  const { id } = useParams();

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
    fetchBairros();
    fetchTiposDeUso();
    fetchprojetos();
    fetchEmpreendimentos()
  }, [screen]);


  function fetchprojetos() {

    axios.get('http://127.0.0.1:8000/api/projetos',  {
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


  function fetchEmpreendimentos() {

    axios.get(`http://127.0.0.1:8000/api/empreendimentos/${id}`,  {
      withCredentials: true,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
       setNome(response.data.nome)
       setBairroId(response.data.bairroId)
       setProjetoId(response.data.projetoId)
       setLatitudeLongitude(response.data.latitude_longitude)
       setEndereco(response.data.endereco)
       setAviso(response.data.aviso_legal)
       setCorPrimaria(response.data.cor_primaria)
       setCorSecundaria(response.data.cor_secundaria)
       if (response.data.status === "ativo") {
          setAtivo(true)
          setInativo(false)
       }else{
          setAtivo(false)
          setInativo(true)
       }
       setImagens(response.data.imagens)
       setVideos(response.data.videos)
       setPois(response.data.pois)
       setDiferenciais(response.data.diferenciais)
       setFichaTecnica(response.data.ficha_tecnica)
       setUnidades(response.data.unidades)
      console.log(response.data)
    })
    .catch(error => {
        console.error('Erro:', error);
    }); 
  
  }

  function fetchTiposDeUso() {

    axios.get('http://127.0.0.1:8000/api/tiposDeUso',  {
      withCredentials: true,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        setTiposDeUso(response.data)
    })
    .catch(error => {
        console.error('Erro:', error);
    }); 
  
  }

  const validateInputs = () => {
    if (!nome || !endereco || !aviso || !latitudeLongitude || !corPrimaria || !corSecundaria) {
      setCampoFaltante(true);
      return false;
    }
    
    setCampoFaltante(false); // Se todos os campos obrigatórios estiverem preenchidos, definimos como falso
    return true;
  };



   function updateEmpreendimentos() {

    if (!validateInputs()) {
      return;
    }

  

    axios.put(`http://127.0.0.1:8000/api/empreendimentos/${id}`, {
        nome: nome,
        endereco: endereco,
        aviso_legal: aviso,
        latitude_longitude: latitudeLongitude,
        cor_primaria: corPrimaria,
        cor_secundaria: corSecundaria,
        status:  ativo === true ? 'ativo' : 'inativo',
        bairroId: bairroId,
        projetoId: ProjetoId,
        imagens: imagens,
        videos: Videos,
        pois: Pois,
        unidades: Unidades,
        diferenciais: Diferenciais,
        ficha_tecnica: FichaTecnica
    
    }, {
        withCredentials: true,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        setScreen('')
       navigate('/Empreendimentos')
        
    })
    .catch(error => {
        console.error('Erro:', error);
    });
  }


  

  useEffect(() => {

    if (projetos != null && projetos.projetos) {
      setProjetosStyled( projetos.projetos.map((item) => {
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
    
  }, [projetos, screen]);
  
 
useEffect(() => {
    if (ativo === true) {
      setInativoStyle(`bg-[#fff]`)
      setAtivoStyle(`bg-[#127ceee1]`)
      setStatus('ativo')
    }else{
      setInativoStyle(`bg-[#127ceee1]`)
      setAtivoStyle(`bg-[#fff]`)
      setStatus('inativo')
    }
  
  
  }, [ativo, inativo, campoFaltante])

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
   
  const handleSelectProjectChange = (event) => {
  
    setProjetoId(event.target.value)
  };


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
         <LateralBar user={user} screen={'Empreendimentos'}/>
          <div className='flex flex-col items-center w-[83%] bg-[#F9F9F9]'>
            <div className='flex items-center justify-between w-[90%] h-[10vh]'>
              <h2 className='w-[20%] ml-[2%] hover:cursor-pointer' onClick={()=>{navigate('/Empreendimentos')}}>Empreendimentos</h2>

            </div>
            <div className='flex items-center justify-evenly w-[90%] h-[5vh]  border-b mb-5'>
               <Link to={`/Empreendimentos/infoBasica/${id}`}  className={`hover:cursor-pointer hover:font-bold`}>Informações Basicas</Link>
               <Link to={`/Empreendimentos/ShowImagens/${id}`}  className={`hover:cursor-pointer hover:font-bold`}>Imagens</Link>
            </div>
            <div className='flex   items-center justify-start w-[100%]'>     
              <div className='w-[50%] ml-[5%] -mb-7 h-[30vh] flex-col  items-center '>
                        <div className='w-[80%] h-[6vh]'>
                            <input className={`w-[100%] p-1 ml-[0%] h-[4vh] border ${ campoFaltante === true && !nome  ? styledInput : 'border-black'}`} placeholder='Nome' type="text" value={nome} onChange={(e) => setNome(e.target.value)}></input>
                            <p className={ campoFaltante === true && !nome  ? 'w-[80%] text-red-500 ' : 'invisible h-0 w-0 '} >Campo Obrigatorio!</p>
                        </div>
                        <div className='w-[80%] h-[6vh] ml-[0%]'>
                              <div className={`w-[100%] p-1 ml-[0%] h-[4vh] border border-black  bg-white  ${ campoFaltante === true && !ProjetoId  ? styledInput : 'border-black'}`}>
                                {/* Botão para abrir/fechar o dropdown */}
                                <select onChange={handleSelectProjectChange} value={ProjetoId} className={`w-[100%] h-[100%] flex text-slate-400 `}>
                                  <option value="">Selecione um Projeto</option>
                                  {projetosStyled}
                                </select>
                              </div>
                              <p className={ campoFaltante === true && !ProjetoId  ? 'w-[80%] text-red-500' : 'invisible h-0 w-0 '} >Campo Obrigatório!</p>
                        </div>
                      <div className={`w-[80%] p-1 ml-[0%] h-[4vh] border border-black  bg-white  ${ campoFaltante === true && !bairroId  ? styledInput : 'border-black'}`}>
                        <select onChange={handleSelectChange} value={bairroId} className={`w-[100%] h-[100%] flex text-slate-400 `}>
                          <option value="">Selecione um bairro</option>
                          {bairrosStyled}
                        </select>
                      </div>
                      <p className={ campoFaltante === true && !bairroId  ? 'w-[80%] text-red-500' : 'invisible h-0 w-0 '} >Campo Obrigatório!</p>
                      <input className={`w-[80%] mt-2 p-1 ml-[0%] h-[4vh] border ${ campoFaltante === true && !endereco  ? styledInput : 'border-black'}`} placeholder='Endereço' type="text" value={endereco} onChange={(e) => setEndereco(e.target.value)}></input>
                      <p className={ campoFaltante === true && !endereco  ? 'w-[80%] text-red-500 ' : 'invisible h-0 w-0 '} >Campo Obrigatorio!</p>
                      <input className={`w-[80%] mt-2 p-1 ml-[0%] h-[4vh] border ${ campoFaltante === true && !aviso  ? styledInput : 'border-black'}`} placeholder='aviso legal' type="text" value={aviso} onChange={(e) => setAviso(e.target.value)}></input>
                      <p className={ campoFaltante === true && !aviso  ? 'w-[80%] text-red-500 ' : 'invisible h-0 w-0 '} >Campo Obrigatorio!</p>
                      <input className={`w-[80%] mt-2 p-1 ml-[0%] h-[4vh] border ${ campoFaltante === true && !latitudeLongitude  ? styledInput : 'border-black'}`} placeholder='Latitude / Longitude (Google)' type="text" value={latitudeLongitude} onChange={(e) => setLatitudeLongitude(e.target.value)}></input>
                      <p className={ campoFaltante === true && !latitudeLongitude  ? 'w-[80%] text-red-500 ' : 'invisible h-0 w-0 '} >Campo Obrigatorio!</p>
                      <input className={`w-[80%] mt-2 p-1 ml-[0%] h-[4vh] border ${ campoFaltante === true && !corPrimaria  ? styledInput : 'border-black'}`} placeholder='Cor Primaria' type="text" value={corPrimaria} onChange={(e) => setCorPrimaria(e.target.value)}></input>
                      <p className={ campoFaltante === true && !corPrimaria  ? 'w-[80%] text-red-500 ' : 'invisible h-0 w-0 '} >Campo Obrigatorio!</p>
                      <input className={`w-[80%] mt-2 p-1 ml-[0%] h-[4vh] border ${ campoFaltante === true && !corSecundaria  ? styledInput : 'border-black'}`} placeholder='Cor Secundaria' type="text" value={corSecundaria} onChange={(e) => setCorSecundaria(e.target.value)}></input>
                      <p className={ campoFaltante === true && !corSecundaria  ? 'w-[80%] text-red-500 ' : 'invisible h-0 w-0 '} >Campo Obrigatorio!</p>
                </div>
                    <div className='w-[50%] h-[30vh]  flex justify-evenly items-start'>
                        <div className='w-[30%] flex justify-evenly items-center' onClick={handleAtivoClick}>
                            <label className='text-[1rem]' htmlFor="">Ativo</label>
                            <div className={` ${ativoStyle} hover:cursor-pointer border w-[1rem] h-[1rem] rounded-full`} ></div>
                        </div>
                        <div className='w-[30%] flex justify-evenly items-center' onClick={handleInativoClick}>
                            <label className='text-[1rem]' htmlFor="">Inativo</label>
                            <div className={`${inativoStyle} hover:cursor-pointer border w-[1rem] h-[1rem] rounded-full`} ></div>
                        </div>
                    </div>    
              </div>         
            <div className='w-[90%]   h-[6vh] mt-[30vh]'>
                <button className='w-[13%] ml-[90%] border border-[#70AD47]' onClick={updateEmpreendimentos}>Salvar</button>
            </div>
          </div>
        </div>
             
      </div>
 
  )
}

export default EditEmpreendimentos