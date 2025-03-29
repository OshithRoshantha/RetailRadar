import './App.css'
import { Routes, Route } from "react-router-dom";
import SignIn from './pages/Landing';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<SignIn/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
    </Routes>
    </>
  )
}

export default App
