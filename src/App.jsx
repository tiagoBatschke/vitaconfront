import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes} from "react-router-dom"
import LoginScreen from './screens/LoginScreen.jsx'
import ClienteScreen from './screens/ClienteScreen.jsx'
import RegisterScreen from './screens/RegisterScreen.jsx'
import { AuthContextProvedor } from './context/context.jsx'
import ProjetosScreen from './screens/ProjetosScreen.jsx'

function App() {

  return (
    <>
    <AuthContextProvedor>
      <Routes>
        <Route path ='/' element={<LoginScreen/>}/>
        <Route path ='/Clientes' element={<ClienteScreen/>}/>
        <Route path ='/Projetos' element={<ProjetosScreen/>}/>
        <Route path ='/Register' element={<RegisterScreen/>}/>
      </Routes>
    </AuthContextProvedor>
     </>
  )
}

export default App
