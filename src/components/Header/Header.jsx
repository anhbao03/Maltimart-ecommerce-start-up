import React, {useRef,useEffect, useState} from 'react'
import './header.css'
import {Link, NavLink, useNavigate} from 'react-router-dom'

import { Container, Row } from 'reactstrap'
import logo from '../../assets/images/eco-logo.png'
import userIcon from '../../assets/images/user-icon.png'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import useAuth from '../../custom-hook/useAuth'
import { signOut } from 'firebase/auth'
import {auth} from "../../firebase.config"
import { toast } from 'react-toastify'

const nav_link =[
  {
    path:'home',
    display:'Home'
  },
  {
    path:'shop',
    display:'Shop'
  },
  {
    path:'cart',
    display:'Cart'
  }
]

const Header = () => {

  const headerRef = useRef(null);
  const totalQuantity = useSelector(state => state.cart.totalQuantity)
  const menuRef = useRef(null);
  // const profileActionRef = useRef(null);

  const navigate = useNavigate();
  const {currentUser} = useAuth();

  const stickyHeaderFunc = () =>{
    window.addEventListener('scroll',() => {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80 ) {
      headerRef.current.classList.add('sticky_header')
    } else {
      headerRef.current.classList.remove('sticky_header')
    }
  });
}

  useEffect(() => {
    stickyHeaderFunc()
    return () => {
      window.removeEventListener("scroll", stickyHeaderFunc)
    };
  });

  const menuToggle = () => menuRef.current.classList.toggle('active_menu')

  const navigateToCart = () => {
    navigate('/cart')
  };

  const [isExpanded, setIsExpanded] = useState(false);

  const handleMouseEnter = () => {
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
  };
  const logout = () => {
    signOut(auth).then(() =>{
      toast.success('Logged out')
      navigate('/home')
    }).catch(err => {
      toast.error(err.message)
    });
  }  

  return (
  <header className='header' ref={headerRef} onClick={handleMouseLeave}>
    <Container>
      <Row>
      <div className='nav_wrapper'>
        <div className='logo'>
          <img src={logo} alt='logo'/>
          <div>
            <h1>MultiMart</h1>
          </div>
        </div>
        
        <div className='navigation' ref={menuRef} onClick={menuToggle}>
          <ul className="menu">
            {
              nav_link.map((item, index)=> (
                <li className='nav_item' key={index}>
                  <NavLink to={item.path} className={(navClass)=> navClass.isActive ? 'nav_active' : ''}>{item.display}</NavLink>
                </li>
              ))
            }
          </ul>
        </div>

        <div className="nav_icons">
          <span className='fav_icon'>
            <i class="ri-heart-line"></i>
            <span className='badge'>1</span>
          </span>
          <span className='cart_icon' onClick={navigateToCart}>
            <i class="ri-shopping-bag-line"></i>
            <span className='badge'>{totalQuantity}</span>
          </span>
          <div className='profile'>
            <motion.img whileTap={{scale: 1.3}} src={currentUser ? currentUser.photoURL : userIcon} 
            alt=''onMouseEnter={handleMouseEnter}/>
            { currentUser ? <span>{currentUser.displayName}</span> 
                          : <span></span>}
            {
              isExpanded &&<div className="profile_action">
              {
                currentUser ? (<span onClick={logout}>Log out</span>) : (<div className='d-flex align-items-center justify-content-center flex-column'>
                  <Link to={'/signup'}>Sign up</Link>
                  <Link to={'/login'}>Log in</Link>
                  <Link to={'/dashboard'}>DashBoard</Link>
                </div>)
              }
            </div>
            } 
          </div>
        </div>

        <div className="mobile_menu">
          <span onClick={menuToggle}>
            <i class="ri-menu-line"></i>
          </span>
        </div>
      </div>
      </Row>
    </Container>
  </header>
  )
}

export default Header
