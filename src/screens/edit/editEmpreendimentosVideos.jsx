import React, { useEffect, useState, useContext  } from 'react'
import { Link, Route, Routes, useNavigate, useParams} from "react-router-dom"
import axios from '../../api/axios'

  
import LateralBar from '../../components/lateralBar'
import UploadImagem from '../../components/uploadImagem'


const EditEmpreendimentosVideos = () => {
    
  const [screen, setScreen] =useState('a')

  const [ProjetoId, setProjetoId] =useState(null)
  const [bairroId, setBairroId] =useState(null)
  const [nome, setNome]= useState('')
  const [endereco, setEndereco]= useState('')
  const [aviso, setAviso]= useState('')
  const [latitudeLongitude, setLatitudeLongitude]= useState('')
  const [corPrimaria, setCorPrimaria]= useState('')
  const [corSecundaria, setCorSecundaria]= useState('')
  const [imagens, setImagens]= useState([])
  const [Videos, setVideos]= useState([])
  const [Pois, setPois]= useState([])
  const [Unidades, setUnidades]= useState([])
  const [Diferenciais, setDiferenciais]= useState([])
  const [FichaTecnica, setFichaTecnica]= useState([])
  
  const [novosVideos, setNovosVideos] = useState([]);
  
  const [Titulo, setTitulo]= useState('')
  const [Thumb, setThumb]= useState('')
  const [BgArea, setBgArea]= useState('')

  const navigate = useNavigate()

  const [campoFaltante, setCampoFaltante]=  useState(false)
  const [styledInput, setStyledInput]=  useState('border-red-400 border-[2px]')

  const [toggleLogOut, setToggleLogOut] = useState(false)
  const [userOptions, setUserOptions] =useState(<div className='text-center text-white -mb-8 mt-2 w-[90%] -ml-[10%] bg-slate-500 z-10' onClick={()=>{localStorage.setItem('token', ''), setScreen('gg')}}>Log Out</div>)

  const [ativo, setAtivo]= useState(true)
  const [inativo, setInativo]= useState(false)

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
    fetchEmpreendimentos()
  }, [screen]);



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

  const validateInputs = () => {
    if (!nome || !endereco || !aviso || !latitudeLongitude || !corPrimaria || !corSecundaria || !Titulo) {
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

    setNovosVideos([...novosVideos, {Titulo: Titulo, Thumb: Thumb, Bg_area: BgArea}]);
    const VideosExistente = Videos ? Videos : [];
    const VideosAtualizadas = [...VideosExistente, ...novosVideos];

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
        videos: VideosAtualizadas,
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
      console.log(response)
        
    })
    .catch(error => {
        console.error('Erro:', error);
    });
  }



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
            <div className='flex   items-center justify-start w-[100%]'>     
              <div className='w-[50%] ml-[5%] -mb-7 h-[30vh] flex-col  items-center '>
                  <input className={`w-[80%] mt-2 p-1 ml-[0%] h-[4vh] border ${ campoFaltante === true && !Titulo  ? styledInput : 'border-black'}`} placeholder='Titulo' type="text" value={Titulo} onChange={(e) => setTitulo(e.target.value)}></input>
                  <p className={ campoFaltante === true && !Titulo  ? 'w-[80%] text-red-500 ' : 'invisible h-0 w-0 '} >Campo Obrigatorio!</p>
                  <input className={`w-[80%] mt-2 p-1 ml-[0%] h-[4vh] border ${ campoFaltante === true && !Thumb  ? styledInput : 'border-black'}`} placeholder='Thumb' type="text" value={Thumb} onChange={(e) => setThumb(e.target.value)}></input>
                  <p className={ campoFaltante === true && !Thumb  ? 'w-[80%] text-red-500 ' : 'invisible h-0 w-0 '} >Campo Obrigatorio!</p>
                  <input className={`w-[80%] mt-2 p-1 ml-[0%] h-[4vh] border ${ campoFaltante === true && !BgArea  ? styledInput : 'border-black'}`} placeholder='Bg Area' type="text" value={BgArea} onChange={(e) => setBgArea(e.target.value)}></input>
                  <p className={ campoFaltante === true && !BgArea  ? 'w-[80%] text-red-500 ' : 'invisible h-0 w-0 '} >Campo Obrigatorio!</p>
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

export default EditEmpreendimentosVideos