import React, { useEffect, useState } from 'react'
import { Link, Route, Routes, useNavigate} from "react-router-dom"
import axios from '../api/axios'


const HomeScreen = () => {
  const [email, setEmail]= useState('')
  const [password, setPassword]= useState('')
  const navigate = useNavigate()
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
          <div className='flex flex-col  h-[90vh] w-[17%] bg-[#283138]'>
            <div className=' bg-[#2c4267b6] hover:cursor-pointer  hover:font-bold flex items-center justify-between  w-[100%] h-[5rem]'>
              <div className='flex items-center ml-[10%] w-[80%]'>
                <img src="https://github.com/tiagoBatschke/vitaconfront/blob/main/src/assets/icon-Png.png?raw=true" className='w-[3rem] h-[3rem]' alt="" />
                <Link  className=' text-white text-[1.3rem] ml-[5%]'>Fernando</Link>
              </div>
            </div>
            <div className=' hover:cursor-pointer  hover:font-bold flex items-center justify-between  w-[100%] h-[3rem]'>
              <div className='flex items-center ml-[10%] w-[80%]'>
                <img src="https://github.com/tiagoBatschke/vitaconfront/blob/main/src/assets/ship_icon.png?raw=true" className='w-[2rem] h-[2rem] ml-[0.5rem]' alt="" />
                <Link  className=' text-[#ffffff93] ml-[10%]'>Dashboard</Link>
              </div>
            </div>
            <div className='flex flex-col bg-[#ffffff1e]  w-[100%]  h-[80%]   items-center'>
              <div className='flex flex-col  h-[60%]  w-[90%]  justify-evenly '>
                <Link  className=' hover:cursor-pointer hover:font-bold text-white'>Institucional</Link>
                <div className='flex flex-col'>
                  <Link  className=' hover:cursor-pointer hover:font-bold text-white'>Cidades / Bairros</Link>
                  <Link  className=' hover:cursor-pointer hover:font-bold text-white'>POI(localizações)</Link>
                  <Link  className=' hover:cursor-pointer hover:font-bold text-white'>Diferenciais</Link>
                  <Link  className=' hover:cursor-pointer hover:font-bold text-white'>Tipos de uso</Link>
                </div>
                <Link  className=' hover:cursor-pointer hover:font-bold text-white'>Empreendimentos</Link>
                <div className='flex flex-col'>
                  <Link  className=' hover:cursor-pointer hover:text-[1.4rem]  text-white text-[1.3rem] font-bold'>CLIENTES *</Link>
                  <Link  className=' hover:cursor-pointer hover:font-bold text-white text-[1.3rem] font-semibold'>PROJETOS</Link>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col items-center w-[83%] bg-[#F9F9F9]'>
            <div className='flex items-center justify-between w-[90%] h-[10vh]'>
              <h2 className='w-[10%] ml-[2%]'>Clientes</h2>
              <button className='w-[10%] mr-[2%] border border-[#70AD47]'>Novo Cliente</button>
            </div>
          </div>
        </div>
             
      </div>
 
  )
}

export default HomeScreen