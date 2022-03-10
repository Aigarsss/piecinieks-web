import React  from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import AddQuestion from './Pages/AddQuestion';
import SignUp from "./Pages/SignUp";
import './App.css';

const App: React.FC = () => {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/addQuestion" element={<AddQuestion />} />
          </Routes>
      </Router>
  )
}

export default App
