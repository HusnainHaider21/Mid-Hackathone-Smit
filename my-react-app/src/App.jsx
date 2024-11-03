import React from 'react'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
const App = () => {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<SignUp/>}></Route>
    <Route path='/Home' element={<Home></Home>}></Route>
   </Routes>
   </BrowserRouter>
  );
}

export default App
