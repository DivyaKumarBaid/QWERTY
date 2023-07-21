// import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/Home';
import { TypingProvider } from './context/TypingContext';
import Multiplayer from './pages/Multiplayer';
import { MultiplayerProvider } from './context/MultiplayerContext';
function App() {

  return (
    <>
      <MultiplayerProvider>
        <Nav />
        {/* <LogoNav /> */}
        <div className="App">
          <Router>
            <Routes>
              <Route exact path='/' element={
                <TypingProvider>
                  <Home />
                </TypingProvider>
              } />
              <Route exact path='/multiplayer' element={

                <Multiplayer />

              } />
            </Routes>
          </Router>
        </div>
      </MultiplayerProvider >
    </>
  )
}

export default App
