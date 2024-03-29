import React, { useState, useContext, useEffect  } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors]= useState('')
  const navigate = useNavigate();
  let contador = 0

  useEffect(() => {

  }, [errors])
  
  useEffect(() => {
    if (contador === 0) {
      localStorage.setItem('token', '');
    }
  }, [])
  


  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', { 'email': email, 'password': password });
      localStorage.setItem('token', '');
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', response.data.user.name);
      localStorage.setItem('userRole', response.data.user.role);
      setEmail('');
      setPassword('');
      contador++
      navigate('/CidadesBairros');
    } catch (error) {
      if (error.response.status == 401) {
         setErrors(error.response.data.message)
        console.log(error.response)
      }
    }
  };

  return (
    <div className='flex justify-evenly w-[100vw]'>
      <div className='h-[100vh] w-[60%]  flex flex-col items-center justify-center'>
        <img className='w-[90%] ' src="https://github.com/tiagoBatschke/vitaconfront/blob/main/src/assets/VitaconLogin.jpg?raw=true" alt="" />
      </div>
      <div className='flex flex-col items-start justify-center w-[35%] h-[100vh] '>
        <h2 className='text-[1rem] font-bold text-[#a0a0a0]'>SIGN IN BELOW:</h2>
        <form className='h-[40vh] w-[100%] flex flex-col justify-evenly' onSubmit={handleLogin}>
          <div className='flex flex-col w-[80%]  p-1 items-start  border-[1px] border-[#C4C4C4]'>
            <label className='text-[0.7rem]' htmlFor="">E-mail</label>
            <input  className='w-[80%] ml-[0%] h-[3vh]   outline-none' placeholder='E-mail' type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}}></input>
          </div>
          <p className={errors ? 'w-[80%] text-red-500 -mt-[2vh]' : 'invisible h-0 w-0 -mt-[2vh]'} >{errors}</p>
          <div className='flex flex-col w-[80%]  p-1 items-start  border-[1px] border-[#C4C4C4]'>
            <label className='text-[0.7rem]' htmlFor="">Password</label>
            <input className='w-[80%] ml-[0%] h-[3vh]   outline-none' placeholder='Password' type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
          </div>
          <p className={errors ? 'w-[80%] text-red-500 -mt-[2vh]' : 'invisible h-0 w-0 -mt-[2vh]'} >{errors}</p>
            <Link to='/Register' className='text-[1rem] text-[#a0a0a0]' htmlFor="">Sign up</Link>
          <button type='submit' className='bg-[#58A5F5] flex justify-center items-center text-white h-[2rem] w-[15%] rounded-sm'>Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginScreen;
