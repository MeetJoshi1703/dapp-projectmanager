// src/components/header/Header.js
import React, { useContext, useEffect } from 'react';
import Web3 from 'web3';
import { WalletContext } from '../../context/WalletContext';

const Header = () => {
  const { walletAddress, setWalletAddress } = useContext(WalletContext);

  useEffect(() => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      window.ethereum.request({ method: 'eth_accounts' })
        .then(accounts => {
          if (accounts.length) {
            setWalletAddress(accounts[0]);
          }
        });
    } else {
      alert('Please install MetaMask!');
    }
  }, [setWalletAddress]);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const web3 = new Web3(window.ethereum);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.error('User rejected connection request');
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">

    <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li><a>Item 1</a></li>
        <li>
          <a>Parent</a>
          <ul className="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </li>
        <li><a>Item 3</a></li>
      </ul>
    </div>
    <a href='/' className="btn btn-ghost text-xl">TECHgurus</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 gap-4">
      <li><a href='/task'>Tasks</a></li>
      <li><a href='/chatbot'>Chatbot</a></li>
      <li><a href='/upload'>Upload File</a></li>
      <li><a href='/chat'>Interact</a></li>
      <li><a href='/logs'>Logs</a></li>
    </ul>
  </div>
  <div className="navbar-end">
  {!walletAddress ? (
        <button 
          className="px-4 py-2 bg-blue-500 rounded-lg"
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
      ) : (
        <div>
          Connected Account: {walletAddress}
        </div>
      )}

  </div>
</div>









      
      
          </header>
  );
};

export default Header;
