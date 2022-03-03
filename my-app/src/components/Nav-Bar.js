import React, { Component } from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import {useContext} from 'react'
import {MyContext} from '../contexts/MyContext'
import LoginButton from "./LoginButton"
import LogoutButton from "./LogoutButton"





//creation of object - text that links to home url '/'
const MainNav = () => (
  <Nav className="mr-auto">
    <Nav.Link
      as={RouterNavLink}
      to="/"
      exact
      activeClassName="router-link-exact-active"
    >
      Home
    </Nav.Link>
  </Nav>  
);


//creation of object - text that links to the user dashboard '/dashboard'
const Dashboard = () => (
    
<Nav className="mr-auto">
  <Nav.Link
    as={RouterNavLink}
    to="/dashboard"
    exact
    activeClassName="router-link-exact-active"
  >
    Dashboard
  </Nav.Link>
</Nav>

);




//If the user is signed in, 'dashboard' component will appear in the navbar
const ProfileAuth = () => {

  // Get the state of login from the parental MyContext.js
  const {rootState} = useContext(MyContext);
  const {isAuth} = rootState;

  return (
    //if loggedin, render the dashboard component or nothing at all
    <nav className = "justify-content-start">
      {isAuth ? <Dashboard /> : ""}
      
    </nav>

  )

};




//Based on login state, the navbar will wither display 'login' or 'logout' buttons.
const AuthNav = () => {

    // Get the state of login from the parental MyContext.js
    const {rootState} = useContext(MyContext);
    const {isAuth} = rootState;

  return (

    //If logged in, render logout button component on navbar. If NOT logged in, render login button component
    <nav className = "justify-content-end">
      {isAuth ? <LogoutButton /> : <LoginButton /> }
    </nav>

  )

};

//rendering all of the previous objects within a class component
class NavBar extends Component {
  
  render() {

    return(
      <Navbar bg="light" expand="md">
      <Container>
        <Navbar.Brand as={RouterNavLink} className="logo" to="/" />
        <MainNav />
        <ProfileAuth />
        <AuthNav />
      </Container>
    </Navbar>
    )
  
  };
}



export default NavBar;