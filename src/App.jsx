import { useState } from 'react'
import './App.css'
import { Route,Routes } from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import "./index.css";
import Contact from './Pages/Contact'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
function App() {
  
  return (
    <div className="w-screen min-h-screen bg-[#000814] flex flex-col font-inter">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
      </Routes>
    </div>
  );
}

export default App
