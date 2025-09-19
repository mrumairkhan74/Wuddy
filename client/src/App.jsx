import React from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import Notification from './pages/Notification'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/notification' element={<Notification />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App