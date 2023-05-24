import { useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import reactLogo from './assets/react.svg'

import './App.css'

//import custom components
import Timer from './components/timer'


//			<ul className="navigation">
//				<li className="nav--list">
//					<Link to="/" className="nav-item">Timer</Link>
//					<Link to="/todo" className="nav-item">TODO</Link>
//				</li>
//			</ul>


function App() {

  return (
    <div className="App">
			<Routes>
				<Route exact path="/" element={<Timer/>} />
				<Route exact path="/todo" element={<p>TODO</p>} />
			</Routes>

    </div>
  )
}

export default App
