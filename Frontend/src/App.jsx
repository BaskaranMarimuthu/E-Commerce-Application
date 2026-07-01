import React from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Register from './Pages/Register'
const App = () => {
  return (
   <BrowserRouter>
   <Routes>
    <Route  path="/"    element={<Home/>}/>
    <Route  path="/register"    element={<Register/>}/>
    <Route  path="/about"    element={<About/>}/>
    <Route  path="/contact"    element={<Contact/>}/>
  
   </Routes>
   </BrowserRouter>
  )
}

export default App