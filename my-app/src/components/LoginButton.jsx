// import React from 'react';
// import { NavLink as RouterNavLink } from "react-router-dom";
// import {  Nav } from "react-bootstrap";


// //creation of a simple button for login
// const Button = () => (
//     <button type="button" class="btn btn-outline-primary">
//         Login
//     </button>
//   );

// //Wrapping the previously created button in Nav. This allows it to link to a specified url.
// //React is unique in that it does not constantly refresh. It re-renders what changes and keeps what is the same.
// //Nav enables this behavior. Works with the <Switch> and <Router> our components are wrapped in (see App.js)
// const LoginButton = () => (
    
//     <Nav className="mr-auto">
//       <Nav.Link
//       // clicking on the button send the user to url / login
//         as={RouterNavLink}
//         to="/login"
//         exact
//         activeClassName="router-link-exact-active"
//       >
//         <Button />
//       </Nav.Link>
//     </Nav>
    
//     );


//     export default LoginButton;


// src/components/login-button.js

import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button
      className="btn btn-primary btn-block"
      onClick={() => loginWithRedirect()}
    >
      Log In
    </button>
  );
};

export default LoginButton;