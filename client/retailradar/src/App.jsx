import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import SignIn from './pages/SignIn';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<SignIn/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
