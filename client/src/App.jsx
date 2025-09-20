import React, {useState } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Notification from './pages/Notification'
import Loading from './components/Loading'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import { AnimatePresence } from 'framer-motion'
const App = () => {
  const [showSplash, setShowSplash] = useState(true)
  // const [isLoggedIn, setIsLoggedIn] = useState(false)
  // const [user, setUser] = useState(null)

  // useEffect(()=>{
  //   axios.get(

  //   )
  // })
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <AnimatePresence mode='wait'>
          {showSplash ? (
            <Loading key="splash" onFinish={() => setShowSplash(false)} />
          ) : (
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/home' element={<Home />} />
              <Route path='/notification' element={<Notification />} />
            </Routes>
          )}
        </AnimatePresence>
      </BrowserRouter >
    </>
  )
}

export default App