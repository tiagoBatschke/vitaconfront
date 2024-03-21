import React, { useEffect, useState, useContext  } from 'react'
import { Link, Route, Routes, useNavigate} from "react-router-dom"
import axios from '../../api/axios'
  
import LateralBar from '../../components/lateralBar'
import UploadImagem from '../../components/uploadImagem'


const EmpreendimentosScreen = () => {
  const [email, setEmail]= useState('')
  const [nome, setNome]= useState('')
  const [cnpj, setCnpj]= useState('')
  const [contato, setContato]= useState('')
  const [telefone, setTelefone]= useState('')
  const [ativo, setAtivo]= useState(true)
  const [inativo, setInativo]= useState(false)
  const [logo, setLogo]= useState('')
  const [EmpreendimentosStyled, setEmpreendimentosStyled]= useState(null)
  const [screen, setScreen] =useState('a')
  const [Empreendimentos, setEmpreendimentos] =useState(null)
  const [toggleLogOut, setToggleLogOut] = useState(false)
  const [userOptions, setUserOptions] =useState(<div className='text-center text-white -mb-8 mt-2 w-[90%] -ml-[10%] bg-slate-500 z-10' onClick={()=>{localStorage.setItem('token', ''), setScreen('gg')}}>Log Out</div>)

  const navigate = useNavigate()

  const [func, setFunc] =useState('create')




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


  function fetchEmpreendimentos() {

    axios.get('http://127.0.0.1:8000/api/empreendimentos',  {
      withCredentials: true,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        setEmpreendimentos(response.data)
     
    })
    .catch(error => {
        console.error('Erro:', error);
    }); 
 
}

  function deleteCidade(id) {

    axios.delete(`http://127.0.0.1:8000/api/empreendimentos/${id}`,  {
      withCredentials: true,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
      setScreen(prevScreen => prevScreen + 'a');
     
    })
    .catch(error => {
        console.error('Erro:', error);
    }); 
 
}

useEffect(() => {
    fetchEmpreendimentos()
  }, [screen])


  useEffect(() => {

    if (Empreendimentos != null && Empreendimentos) {
      setEmpreendimentosStyled(Empreendimentos.map((item) => {
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
            <td className='w-[31%]'>
              <div className='w-[70%] ml-[30%]'>      
                <button className='w-[60%] mr-[2%] border border-[#70AD47]' onClick={()=>{navigate(`/EmpreendimentosBairros/editEmpreendimentos/${item.id}`);}}>Editar</button>
                <button className='w-[10%] text-red-500 font-bold  ' onClick={()=>{deleteCidade(item.id)}}>X</button>
              </div>
            </td>
          </tr>
        );
      }));
    }
    
  }, [Empreendimentos, screen]);

 
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
              <button className='w-[20%] mr-[2%] border border-[#70AD47]' onClick={()=>{navigate('/Empreendimentos/infoBasica');}}>Novo Empreendimento</button>
            </div>
            <div className='flex flex-col items-center justify-evenly w-[100%]'>    
                    <table className='w-[90%] max-h-[50vh] min-h-[15vh]'>
                      <thead>
                        <tr className=''>
                          <th className='w-[23%]'>Nome</th>
                          <th className='w-[23%]'>Data de inclusão</th>
                          <th className='w-[31%]'>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {EmpreendimentosStyled}
                      </tbody>
                    </table>     
            </div>
          </div>
        </div>
             
      </div>
 
  )
}

export default EmpreendimentosScreen