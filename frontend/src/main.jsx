import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'; 
import { AuthContextProvider } from './context/AuthContext';
import { WalletProvider } from './context/WalletContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider >
        <WalletProvider >
        <App />
        </WalletProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
