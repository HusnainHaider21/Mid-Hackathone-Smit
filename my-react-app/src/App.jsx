import React from 'react'
import SignUp from './pages/SignUp'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Login from './pages/Login';
const App = () => {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/signUp' element={<SignUp/>}></Route>
    <Route path='/login' element={<Login/>}></Route>
   </Routes>
   </BrowserRouter>
  );
}

export default App
