import React from 'react';
import "./home.scss";
import LANDINGIMG from "../../Assets/landingimg.png";
import LOGO from "../../Assets/LOGO.png";
import { Link } from 'react-router-dom';


export default function Home() {
  return (
    <div className='home'>
        <div className="navbar">
            <div className="logo">
                <img src={LOGO} alt="" />
            </div>
            <div className="nav_links">
                <Link to ="/login">Login</Link>
                <Link to ="/register">Register</Link>
            </div>
        </div>
          <div className="container">
              <div className="left_container">
                  <h1>Build your best ideas together, in Docs</h1>
                  <p>Create and collaborate on online documents in real-time and from any device.</p>
              </div>
              <div className="right_container">
                  <img src={LANDINGIMG} alt=""/>
              </div>
          </div>
    </div>
  )
}
