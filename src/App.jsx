// import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/Home';
import { TypingProvider } from './context/TypingContext';
function App() {

  return (
    <>
      <TypingProvider>
        <Nav />
        {/* <LogoNav /> */}
        <div className="App">
          <Router>
            <Routes>
              <Route exact path='/' element={<Home />} />
            </Routes>
          </Router>
        </div>
      </TypingProvider>
    </>
  )
}

export default App
