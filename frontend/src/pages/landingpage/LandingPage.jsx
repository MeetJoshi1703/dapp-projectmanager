import React from 'react';
import './landingpage.css';  // Adjust the path as needed
import home from './home.png'

const LandingPage = () => {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li><a href="#section1" className="logo" >TECHGURUS</a></li>
            <li><a href="#container4">CONTACT</a></li>
            <li><a href="#section2">TEAM</a></li>
            <li><a href="login.html" id="loginLink">LOGIN</a></li>
          </ul>
        </nav>
      </header>

      <div id="section2">
        <h3 className="team-heading">TEAM</h3>
        <section className="about-us">
          <div className="member">
            <div className="member-upper">
              <img src="m.jpg" alt="Member 1" className="member-img" />
            </div>
            <div className="member-lower">
              <h2>Meet Joshi</h2>
            </div>
          </div>
          <div className="member">
            <div className="member-upper">
              <img src="d.jpg" alt="Member 2" className="member-img" />
            </div>
            <div className="member-lower">
              <h2>Dev Jhamtani</h2>
            </div>
          </div>
          <div className="member">
            <div className="member-upper">
              <img src="v.jpg" alt="Member 3" className="member-img" />
            </div>
            <div className="member-lower">
              <h2>Vibhu Patel</h2>
            </div>
          </div>
          <div className="member">
            <div className="member-upper">
              <img src="s.jpg" alt="Member 4" className="member-img" />
            </div>
            <div className="member-lower">
              <h2>Sarthak Nair</h2>
            </div>
          </div>
        </section>
      </div>

      <div className="container1" id="section1">
        <div className="home">
          <h1>Welcome to <strong>Mindful</strong> Manager</h1>
          <h2>Productivity Tool With WEB3</h2>
          <p className="para_home">
            Web3 Productivity, Reimagined for the Future of WorWeb3 Productivity, Reimagined for the Future of Wor
          </p>
          <a href="/login" className="btn-get-started"><span>Get Started</span></a>
        </div>
        <div className="home1">
          <img src={home} />
        </div>
      </div>

      

      <div id="container4">
        <div>
          <h2>About</h2>
          <p>Welcome to our Web3 Productivity Development Tool! This platform leverages the power of decentralized technologies to enhance your productivity and streamline your workflows.</p>
        </div>
        <div>
          <h2>Key Features</h2>
          <ul>
            <li>Secure Data Storage on IPFS</li>
            <li>Token Generation</li>
            <li>Chat-Bot</li>
            <li>Log</li>
          </ul>
        </div>
      </div>

      <footer className="footer">
        <p>ALL RIGHTS ARE RESERVED BY TECHGURUS @2024</p>
      </footer>
    </div>
  );
};

export default LandingPage;