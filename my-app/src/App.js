
import React from 'react';
// Importing the Context Provider & Home Component
import MyContextProvider from './contexts/MyContext';
import NavBar from './components/Nav-Bar';
import { InputFormAuth} from './components';
import {PredictionHistoryAuth} from './components';
import { LoginDisplay } from './components';
import { Register } from './components';
import { AddHorseAuth } from './components';
import { ProfileDashboardAuth } from './components';
import './App.css';
import { BrowserRouter as Router, Route, Switch,Redirect } from "react-router-dom";



function App() {

  return (

    //wrap the app in the current context state of the app held in contexts/MyContext (parental component) - allows all other components to access the state values and methods
    //Useful for accessing login state etc
    <MyContextProvider>

      {/* Wrap the App in the Router allows components inside to Route to different URLS */}
      <Router>

        {/* NavBar has no condition to render and it is always displayed. */}
      <NavBar />
      
      <div>

        {/* The Routes are wrapped in a switch which ensures that only the specified component is rendered at each URL */}
            <Switch>

              {/* Route path specifies the URL and which component should render at that address */}
                <Route path="/" component={InputFormAuth} exact/>
                <Route path="/dashboard" component={ProfileDashboardAuth} />
                <Route path="/login" component={LoginDisplay} />
                <Route exact path="/register" component={Register} />
                <Route path="/addhorse" component={AddHorseAuth} />
                <Route path="/history" component={PredictionHistoryAuth} />
               
                <Route component={Error} />
            </Switch>

        </div>

        </Router>
        
    </MyContextProvider>
  );
}

export default App;