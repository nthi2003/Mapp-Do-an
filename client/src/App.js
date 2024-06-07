import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import Home from './pages/Home';
import Loading from './components/Loading';
import Notification from './components/Notification'
import PinDetail from './components/Pins/PinDetail';
const App = () => {
  return (
    <>
    <Loading/>
    <Notification/>
    <BrowserRouter>
       <Routes>
        <Route path='dashboard/*' element={<Dashboard/>}/>
        <Route path="*" element={<Home />} />
       </Routes>
    </BrowserRouter>
    <PinDetail/>
  </>
  )
};

export default App;