import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', { 'email': email, 'password': password });
      console.log(response.data); // Imprime a resposta do servidor
      setEmail('');
      setPassword('');
      navigate('/Home');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex justify-evenly w-[100vw]'>
      <div className='h-[100vh] w-[60%]  flex flex-col items-center justify-center'>
        <img className='w-[90%] ' src="src\assets\VitaconLogin.jpg" alt="" />
      </div>
      <div className='flex flex-col items-start justify-center w-[35%] h-[100vh] '>
        <h2 className='text-[1rem] font-bold text-[#a0a0a0]'>SIGN IN BELOW:</h2>
        <form className='h-[40vh] w-[100%] flex flex-col justify-evenly' onSubmit={handleLogin}>
          <div className='flex flex-col w-[80%]  p-1 items-start  border-[1px] border-[#C4C4C4]'>
            <label className='text-[0.7rem]' htmlFor="">E-mail</label>
            <input className='w-[80%] ml-[0%] h-[3vh]   outline-none' placeholder='E-mail' type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} />
          </div>
          <div className='flex flex-col w-[80%]  p-1 items-start  border-[1px] border-[#C4C4C4]'>
            <label className='text-[0.7rem]' htmlFor="">Password</label>
            <input className='w-[80%] ml-[0%] h-[3vh]   outline-none' placeholder='Password' type="text" value={password} onChange={(e) => { setPassword(e.target.value) }} />
          </div>
          <div className=' w-[25%] flex justify-evenly'>
            <input type="checkbox" />
            <label className='text-[1rem] text-[#a0a0a0]' htmlFor="">Remember me</label>
          </div>
          <button type='submit' className='bg-[#58A5F5] flex justify-center items-center text-white h-[2rem] w-[15%] rounded-sm'>Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginScreen;
