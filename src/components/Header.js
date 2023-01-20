import {
    faCar,
    faClock,
    faEarth,
    faPhone,
    faSign,
    faSignIn,
    faUser,
  } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import React, { useEffect, useState } from "react";
  import { Container, Row, Col, Image, NavDropdown } from "react-bootstrap";
  import { Link } from "react-router-dom";
  import "../../assets/css/header.css";
  import navLinks from "../utils/constants/navLinks";
  import { useAuth } from "../../Context/AuthContext";
  import Navbar from "./NavBar";
  import { LinkContainer } from 'react-router-bootstrap'
  
  
  
  const Header = () => {
  
    const [userInfo,setUserInfo] = useState(localStorage.getItem('userInfo'))
    const {logout} = useAuth('')
      const logoutHandler = () => {
       logout()
    }
  
    useEffect(() => {
      const userInfo = localStorage.getItem('userInfo')
    ? setUserInfo(JSON.parse(localStorage.getItem('userInfo'))) : null
    
    },[localStorage.getItem('userInfo')])
  
  
  
   
     const UserMenu = (
      <Image
        src={userInfo?.photo || process.env.REACT_APP_USER_IMAGE}
        alt="UserName profile image"
        roundedCircle={true}
        style={{ width: '30px', height: '30px', border: '1px solid #3b8ac3' }}
      />
    )
  
  
  
  
    return (
      <header className='header'>
        {/* ============ header top ============ */}
        <div className='header__top'>
          <Container>
            <Row>
              <Col lg='6' md='6' sm='6'>
                <div className='header__top__left'>
                  <span>Need Help?</span>
                  <span className='header__top__help'>
                    <FontAwesomeIcon icon={faPhone} /> +212554579699
                  </span>
                </div>
              </Col>
  
              <Col lg='6' md='6' sm='6'>
                <div className='header__top__right d-flex align-items-center justify-content-end gap-3'>
                  {userInfo ? (
                    <NavDropdown title={UserMenu} id='username'>
                      <LinkContainer to='/profile'>
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                      </LinkContainer>
  
                      {userInfo.role == 'proprietaire' && (
                        <LinkContainer to='/owner'>
                          <NavDropdown.Item>Dashboard</NavDropdown.Item>
                        </LinkContainer>
                      )}
  
                      {userInfo.role == 'Administrator' && (
                        <LinkContainer to='/admin'>
                          <NavDropdown.Item>Dashboard</NavDropdown.Item>
                        </LinkContainer>
                      )}
  
                      <LinkContainer to='/settings'>
                        <NavDropdown.Item>Settings</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Item onClick={logoutHandler}>
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  ) : (
                    <>
                      <Link
                        to='/login'
                        className=' d-flex align-items-center gap-1'
                      >
                        <i class='ri-login-circle-line'></i> Login
                      </Link>
  
                      <Link
                        to='/register'
                        className=' d-flex align-items-center gap-1'
                      >
                        <FontAwesomeIcon icon={faUser} /> Register
                      </Link>
                    </>
                  )}
                </div>
              </Col>
            </Row>
          </Container>
        </div>
  
        {/* ========== main navigation =========== */}
  
        <Navbar navLinks={navLinks} />
      </header>
    );
  };
  
  export default Header;
  