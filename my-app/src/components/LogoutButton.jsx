import React from 'react';
import { NavLink as RouterNavLink } from "react-router-dom";
import {  Nav } from "react-bootstrap";
import { useContext } from 'react';
import {MyContext} from '../contexts/MyContext'




//creation of a simple button for logout. It has functionality unlike the login button which functions purely as a link.
//It utilises the logout user function for the MyContext.js parental state.
function Button(){

  //importing the logout user method from the parental context file
  const {logoutUser} = useContext(MyContext);


  // If user Logged in
  {
      return(
              //when button is pressed, logout the user
              <button type="button" class="btn btn-outline-primary" onClick={logoutUser}>Logout</button>

      )
  }
}



//Wrapping the previously created button in Nav. This allows it to link to a specified url.
//React is unique in that it does not constantly refresh. It re-renders what changes and keeps what is the same.
//Nav enables this behavior. Works with the <Switch> and <Router> our components are wrapped in (see App.js)
//When the user is logged out they are brought to the home page
const LogoutButton = () => (
    
    <Nav className="mr-auto">
      <Nav.Link
        as={RouterNavLink}
        
        to="/"
        exact
        activeClassName="router-link-exact-active"
      >
        <Button />
      </Nav.Link>
    </Nav>
    
    );



export default LogoutButton;

