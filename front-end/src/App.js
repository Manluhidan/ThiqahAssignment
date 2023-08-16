// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import LoginPage from './Pages/Login';
import RegisterPage from './Pages/Register';
import DashboardPage from './Pages/Dashboard';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/dashboard' element={<DashboardPage />} />
          <Route path='*' element={<LoginPage />} />
        </Routes>
      </Router>
    </div >
  );
}

export default App;
