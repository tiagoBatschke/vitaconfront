import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from "react-router-dom";
import axios from '../api/axios';
import { AuthContext } from '../context/context';
import LateralBar from '../components/lateralBar';
import UploadImagem from '../components/uploadImagem';

const EditClienteScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [contato, setContato] = useState('');
  const [telefone, setTelefone] = useState('');
  const [ativo, setAtivo] = useState(true);
  const [inativo, setInativo] = useState(false);
  const [password, setPassword] = useState('');
  const [password_confirmation, setPassword_confirmation] = useState('');

  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(localStorage.getItem('user'));
  const [screen, setScreen] = useState('');
  const [status, setStatus] = useState('ativo');

  const [ativoStyle, setAtivoStyle] = useState('bg-[#127ceee1]');
  const [inativoStyle, setInativoStyle] = useState('bg-[#127ceee1]');

  const fetchCliente = () => {
    axios.get(`https://testevitacon-bd7d417ef875.herokuapp.com/api/clientes/${id}`, {
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      console.log(response);
      // Atualize os estados com os dados do cliente
    })
    .catch(error => {
      console.error('Erro:', error);
    });
  };

  const updateCliente = () => {
    axios.put(`https://testevitacon-bd7d417ef875.herokuapp.com/api/clientes/${id}`, {
      nome: nome,
      cnpj: cnpj,
      contato: contato,
      email: email,
      telefone: telefone,
      celular: '11111',
      status: ativo ? 'ativo' : 'inativo',
    }, {
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      setScreen('');
      // Limpe os campos após a atualização bem-sucedida
      setNome('');
      setCnpj('');
      setContato('');
      setEmail('');
      setTelefone('');
    })
    .catch(error => {
      console.error('Erro:', error);
    });
  };

  useEffect(() => {
    fetchCliente();
  }, [screen]);

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
        <LateralBar user={user} screen={'Clientes'} />
        <div className='flex flex-col items-center w-[83%] bg-[#F9F9F9]'>
          <div className='flex items-center justify-between w-[90%] h-[10vh]'>
            <h2 className='w-[10%] ml-[2%] hover:cursor-pointer' onClick={() => navigate('/Clientes')}>Clientes</h2>
            <button className='w-[10%] mr-[2%] border border-[#70AD47]'>Novo Cliente</button>
          </div>
          <div className='flex flex-col items-center justify-evenly w-[100%]'>
            <div className='w-[100%] h-[10vh]  flex'>
              <div className='w-[50%] h-[60vh] flex flex-col justify-evenly items-center'>
                <input className='w-[80%] p-1 ml-[0%] h-[4vh] border border-black' placeholder='Nome' type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
                <input className='w-[80%] p-1 ml-[0%] h-[4vh] border border-black' placeholder='Cnpj' type="text" value={cnpj} onChange={(e) => setCnpj(e.target.value)} />
                <input className='w-[80%] p-1 ml-[0%] h-[4vh] border border-black' placeholder='Contato' type="text" value={contato} onChange={(e) => setContato(e.target.value)} />
                <input className='w-[80%] p-1 ml-[0%] h-[4vh] border border-black' placeholder='Email' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input className='w-[80%] p-1 ml-[0%] h-[4vh] border border-black' placeholder='telefone celular' type="tel" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
                <input  className='w-[80%] p-1 ml-[0%] h-[4vh] border border-black' placeholder='Password' type="text" value={password} onChange={(e)=> setPassword(e.target.value)} />
                <input  className='w-[80%] p-1 ml-[0%] h-[4vh] border border-black' placeholder='Password confirmation' type="text" value={password_confirmation} onChange={(e)=> setPassword_confirmation(e.target.value)} />
                <UploadImagem />
                <button className='w-[30%] ml-[50%] border border-[#70AD47]' onClick={updateCliente}>Salvar</button>
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

export default EditClienteScreen;