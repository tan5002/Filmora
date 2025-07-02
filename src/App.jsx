import './App.css'
import { useAuth } from './context/AuthsProvider';
import HomeAdmin from './pages/admin/homeAdmin/HomeAdmin'
import HomeClient from './pages/client/homeClient/HomeClient'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
    const { isLogin } = useAuth();

return (
    <div>
    {
      isLogin?.role == "admin" ?  <HomeAdmin/> : <HomeClient />
    }   
    </div>
  )
}

export default App
