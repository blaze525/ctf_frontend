import React, { useEffect } from 'react'
import {Route, Routes, Link, useParams} from 'react-router-dom';
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import "./styles/header.css";
import "./styles/cotegories.css";
import "./styles/search.css";
import "./styles/card.css";
import "./styles/card-info.css";
import "./styles/giris.css";
import Giris from "./components/Giris";
import AgzaBol from "./components/AgzaBol";
import Maglumatlar from "./components/Maglumatlar";
import Statistika from "./components/Statistika";
import axiosInstance from "./utils/axiosInstance.jsx";
import Admin from "./components/Admin.jsx"
import CardInfo from './components/CardInfo.jsx';



function App() {
  const [login, setLogin] = React.useState(window.localStorage.getItem("isLogedIn"))
  const realAdmin = "admin"
  const exausted = realAdmin === window.localStorage.getItem("realAdmin")
  useEffect(()=> {setSpecial(exausted)}, [exausted])
  const [special, setSpecial] = React.useState(exausted)
  return (
    <Routes>
      <Route path="/" element={
        <div className="main">
          <Header 
            login = {login}
            setLogin = {setLogin}
          />
          <MainContent 
            login = {login}
            special = {special}
          />
        </div>} />
      <Route path="/giris" element={<Giris 
        login={login}
        setLogin={setLogin}
      />} />
      <Route path='/agza-bol' element={<AgzaBol 
        login={login}
        setLogin={setLogin}
      />} /> {login &&
        <Route path='/maglumatlar' element={<Maglumatlar 
          special = {special}
          login = {login}
          setLogin={setLogin}
        />} />
      }
      {login &&
      <Route path='/statistika' element={<Statistika 
        login={login}
        setLogin={setLogin}
      />} /> }
      <Route path='/admin' element={<Admin login={login} setLogin={setLogin} setSpecial={setSpecial} special={special} realAdmin={realAdmin} />} />
      <Route path='/card-info/:id' element={<CardInfo login={login} />} />
    </Routes>
  )
}

export default App
