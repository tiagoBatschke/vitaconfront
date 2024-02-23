import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes} from "react-router-dom"
import LoginScreen from './screens/LoginScreen.jsx'
import HomeScreen from './screens/HomeScreen.jsx'
import RegisterScreen from './screens/RegisterScreen.jsx'

function App() {

  return (
    <>
    <Routes>
      <Route path ='/' element={<LoginScreen/>}/>
      <Route path ='/Home' element={<HomeScreen/>}/>
      <Route path ='/Register' element={<RegisterScreen/>}/>
    </Routes>
     </>
  )
}

export default App
