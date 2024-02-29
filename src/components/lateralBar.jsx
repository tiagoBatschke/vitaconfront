import { useState } from 'react'
import { Link, Route, Routes, useNavigate} from "react-router-dom"


function LateralBar({user, screen }) {
    const role = localStorage.getItem('userRole')
  return (
    <div className='flex flex-col  h-[90vh] w-[17%] bg-[#283138]'>
    <div className=' bg-[#2c4267b6] hover:cursor-pointer  hover:font-bold flex items-center justify-between  w-[100%] h-[5rem]'>
      <div className='flex items-center ml-[10%] w-[80%]'>
        <img src="https://github.com/tiagoBatschke/vitaconfront/blob/main/src/assets/icon-Png.png?raw=true" className='w-[3rem] h-[3rem]' alt="" />
        <Link  className=' text-white text-[1.3rem] ml-[5%]'>{user}</Link>
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
          <Link  className={`hover:cursor-pointer hover:font-bold text-white ${screen === 'Institucional' ? 'font-bold ': 'font-normal'}`}>Institucional</Link>
          <Link  className={`hover:cursor-pointer hover:font-bold text-white ${screen === 'Cidades' ? 'font-bold ': 'font-normal'}`}>Cidades / Bairros</Link>
          <Link  className={`hover:cursor-pointer hover:font-bold text-white ${screen === 'POI' ? 'font-bold ': 'font-normal'}`}>POI(localizações)</Link>
          <Link  className={`hover:cursor-pointer hover:font-bold text-white ${screen === 'Diferenciais' ? 'font-bold ': 'font-normal'}`}>Diferenciais</Link>
          <Link  className={`hover:cursor-pointer hover:font-bold text-white ${screen === 'Tipos de uso' ? 'font-bold ': 'font-normal'}`}>Tipos de uso</Link>
          <Link  className={`hover:cursor-pointer hover:font-bold text-white ${screen === 'Empreendimentos' ? 'font-bold ': 'font-normal'}`}>Empreendimentos</Link>
          {role === 'admin' ? (
            <>
                <Link to={'/Clientes'} className={`hover:cursor-pointer hover:font-bold text-white ${screen === 'Clientes' ? 'font-bold' : 'font-normal'}`}>Clientes</Link>
                <Link to={'/Projetos'} className={`hover:cursor-pointer hover:font-bold text-white ${screen === 'Projetos' ? 'font-bold' : 'font-normal'}`}>Projetos</Link>
            </>
            ) : (
            <div></div>
        )}
      </div>
    </div>
  </div>
  )
}

export default LateralBar;