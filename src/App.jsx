import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes} from "react-router-dom"
import LoginScreen from './screens/LoginScreen.jsx'
import ClienteScreen from './screens/show/ClienteScreen.jsx'
import RegisterScreen from './screens/RegisterScreen.jsx'

import ProjetosScreen from './screens/show/ProjetosScreen.jsx'
import AddClienteScreen from './screens/add/addClienteScreen.jsx'
import EditeClienteScreen from './screens/edit/editeClient.jsx'
import EditProjetoscreen from './screens/edit/editProjetos.jsx'
import AddProjetosScreen from './screens/add/addProjetosScreen.jsx'
import CidadesBairrosScreen from './screens/show/cidadesBairrosScreen.jsx'
import BairrosScreen from './screens/show/BairrosScreen.jsx'
import EditBairroscreen from './screens/edit/editBairrosScreen.jsx'
import AddCidadesScreen from './screens/add/addCidadesScreen.jsx'
import EditCidadesScreen from './screens/edit/editCidadesScreen.jsx'
import TiposDeUsoScreen from './screens/show/tiposDeUsoScreen.jsx'
import AddTiposDeUsoScreen from './screens/add/addTiposDeUsoScreen.jsx'
import EditTiposDeUsoScreen from './screens/edit/editTiposDeUso.jsx'
import UserByClientsScreen from './screens/show/UserByClientsScreen.jsx'
import AddUserByClients from './screens/add/addUserByClients.jsx'
import PoiScreen from './screens/show/PoiScreen.jsx'
import CategoriasScreen from './screens/show/CategoriasScreen.jsx'
import EditCategoria from './screens/edit/editCategoria.jsx'


function App() {

  return (
    <>
  
      <Routes>
        <Route path ='/' element={<LoginScreen/>}/>
        <Route path ='/Register' element={<RegisterScreen/>}/>

        <Route path ='/Clientes' element={<ClienteScreen/>}/>
        <Route path ='/Clientes/newCliente' element={<AddClienteScreen/>}/>
        <Route path="/Clientes/editCliente/:id" element={<EditeClienteScreen/>} />
        <Route path ='/Clientes/UserByClientsScreen/:id' element={<UserByClientsScreen/>}/>
        <Route path ='/Clientes/addUserByClientsScreen/:id' element={<AddUserByClients/>}/>

        <Route path ='/TiposDeUso' element={<TiposDeUsoScreen/>}/>
        <Route path ='/TiposDeUso/newTiposDeUso' element={<AddTiposDeUsoScreen/>}/>
        <Route path="/TiposDeUso/editTiposDeUso/:id" element={<EditTiposDeUsoScreen/>} />
        
        <Route path ='/Projetos' element={<ProjetosScreen/>}/>
        <Route path="/Projetos/addProjeto" element={<AddProjetosScreen/>} />
        <Route path="/Projetos/editProjeto/:id" element={<EditProjetoscreen/>} />

        <Route path ='/CidadesBairros' element={<CidadesBairrosScreen/>}/>
        <Route path ='/CidadesBairros/Bairros' element={<BairrosScreen/>}/>
        <Route path ='/CidadesBairros/newCidades' element={<AddCidadesScreen/>}/>
        <Route path ='/CidadesBairros/editCidades/:id' element={<EditCidadesScreen/>}/>
        <Route path ='/CidadesBairros/Bairros/editBairros/:id' element={<EditBairroscreen/>}/>

        <Route path ='/Poi' element={<PoiScreen/>}/>
        <Route path ='/Poi/Categorias' element={<CategoriasScreen/>}/>
        <Route path ='/CidadesBairros/newCidades' element={<AddCidadesScreen/>}/>
        <Route path ='/Poi/editCategorias/:id' element={<EditCategoria/>}/>
        <Route path ='/CidadesBairros/Bairros/editBairros/:id' element={<EditBairroscreen/>}/>

      </Routes>
    
     </>
  )
}

export default App
