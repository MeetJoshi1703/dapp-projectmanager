import './App.css'
import Login from './pages/login/Login'
import SignUp from './pages/signup/SignUp'
import Home from './pages/home/Home'
import Ipfs from './pages/Ipfs/Ipfs'
import Chatbot from './pages/chatbot/Chatbot'
import { Routes,Route, Navigate } from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import { useAuthContext } from './context/AuthContext'
import Task from './pages/taskpage/Task'
import LandingPage from './pages/landingpage/LandingPage'
import Header from './components/header/Header'; 
import Log from './pages/log/Log';


function App() {

  const {authUser} = useAuthContext();
  return (
    <>
    <div className="flex flex-col min-h-screen">
    <Header />
      <div className='p-4 h-screen flex items-center justify-center'>
        <Routes>
          <Route path='/chat' element={authUser?<Home />:<Navigate to="/login"/>} />
          <Route path='/login' element={authUser?<Navigate to="/chat"/>:<Login />} />
          <Route path='/signup'element={authUser?<Navigate to="/"/>:<SignUp />} />
          <Route path='/upload'element={authUser?<Ipfs/>:<SignUp />} />
          <Route path='/chatbot'element={authUser?<Chatbot/>:<SignUp />} />
          <Route path='/task'element={authUser?<Task/>:<SignUp />} />
          <Route path='/'element={<LandingPage/>} />
          <Route path='/logs'element={authUser?<Log/>:<Login/>} />


          
          

        </Routes>
        <Toaster/>
        </div>
      </div>
    </>
  )
}

export default App
