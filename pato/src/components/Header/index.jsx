import React from 'react'
import { Link } from 'react-router-dom'
import About from '../../Pages/Menu'
import logo from "./logo.webp";
import "./index.scss"

export default function Header() {
  return (
    <div className='header'>
    
    <div className='container'>
      <img src={logo} alt="logo"/>
    <ul>
      <li>
        <Link to="/">
         Home
        </Link>
      </li>
      <li>
        <Link to="/gallery">
          Gallery
        </Link>
      </li>
      <li>
        <Link to="/blog">
          Blog
        </Link>
      </li>
    </ul>
    </div>
              
    
    </div>
  )
}
