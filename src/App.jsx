import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes} from "react-router-dom"
import LoginScreen from './screens/LoginScreen.jsx'
import ClienteScreen from './screens/ClienteScreen.jsx'
import RegisterScreen from './screens/RegisterScreen.jsx'

import ProjetosScreen from './screens/ProjetosScreen.jsx'
import AddClienteScreen from './screens/addClienteScreen.jsx'
import EditeClienteScreen from './screens/editeClient.jsx'
import EditProjetoscreen from './screens/editProjetos.jsx'
import AddProjetosScreen from './screens/addProjetosScreen.jsx'
import CidadesBairrosScreen from './screens/cidadesBairrosScreen.jsx'
import BairrosScreen from './screens/BairrosScreen.jsx'
import EditBairroscreen from './screens/editBairrosScreen.jsx'
import AddCidadesScreen from './screens/addCidadesScreen.jsx'
import EditCidadesScreen from './screens/editCidadesScreen.jsx'


function App() {

  return (
    <>
  
      <Routes>
        <Route path ='/' element={<LoginScreen/>}/>
        <Route path ='/Register' element={<RegisterScreen/>}/>

        <Route path ='/Clientes' element={<ClienteScreen/>}/>
        <Route path ='/Clientes/newCliente' element={<AddClienteScreen/>}/>
        <Route path="/Clientes/editCliente/:id" element={<EditeClienteScreen/>} />
        
        <Route path ='/Projetos' element={<ProjetosScreen/>}/>
        <Route path="/Projetos/addProjeto" element={<AddProjetosScreen/>} />
        <Route path="/Projetos/editProjeto/:id" element={<EditProjetoscreen/>} />

        <Route path ='/CidadesBairros' element={<CidadesBairrosScreen/>}/>
        <Route path ='/CidadesBairros/Bairros' element={<BairrosScreen/>}/>
        <Route path ='/CidadesBairros/newCidades' element={<AddCidadesScreen/>}/>
        <Route path ='/CidadesBairros/editCidades/:id' element={<EditCidadesScreen/>}/>
        <Route path ='/CidadesBairros/Bairros/editBairros/:id' element={<EditBairroscreen/>}/>
      </Routes>
    
     </>
  )
}

export default App
