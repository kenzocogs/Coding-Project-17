import { useState } from 'react'
// importing and rendering gallery component
import Gallery from './Gallery'
import './App.css'

function App() {
  return (
    <>
    <div className="App">
      <header>
      <h1>Tour Companion App</h1>
      </header>
      <Gallery/>
    </div>
    </>
  )
}

export default App;
