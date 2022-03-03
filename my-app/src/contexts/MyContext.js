import React, { createContext,Component } from "react";
import axios from 'axios'
export const MyContext = createContext();


//Reference is taken from : https://www.w3jar.com/react-js-php-mysql-db-login-registration-system/
//This code is unchanged from the above source

// Define the base URL to run the other axios requests from
const Axios = axios.create({
    baseURL: 'http://localhost/php-colicapp/',
});

//this will be the parental class that holds login state. This can then be imported in other components and methods.
class MyContextProvider extends Component{


    constructor(){
        super();
        this.isLoggedIn();
        
    }

    // Root State - Acts as a parental state that can be used in other components and functions to determine if the user is currently logged in or not.
    //Also allows the retrieval of userdata through 'theUser' state which is needed for saving predictions and horses
    state = {
        showLogin:true,
        isAuth:false,
        theUser: null,
        
    }
    
    
    // Toggle between Login & Signup page - not needed
    toggleNav = () => {
        const showLogin = !this.state.showLogin;
        this.setState({
            ...this.state,
            showLogin
        })
    }

    // On Click the Log out button - removes 'logintoken' and set 'isAuth' state to false. Is used to conditionally render ie. reroute to login if trying to access the /dashboard
    logoutUser = () => {
        localStorage.removeItem('loginToken');
        this.setState({
            ...this.state,
            isAuth:false
        })
    }


    registerUser = async (user) => {

        // Sending the user registration request
        const register = await Axios.post('register.php',{
            name:user.name,
            email:user.email,
            password:user.password 
        });

        return register.data;
    }


    loginUser = async (user) => {

        // Sending the user Login request
        const login = await Axios.post('login.php',{
            email:user.email,
            password:user.password
        });
        return login.data;
    }

    // Checking user logged in or not
    isLoggedIn = async () => {
        const loginToken = localStorage.getItem('loginToken');

        // If inside the local-storage has the JWT token
        if(loginToken){

            //Adding JWT token to axios default header
            Axios.defaults.headers.common['Authorization'] = 'bearer '+loginToken;

            // Fetching the user information
            const {data} = await Axios.get('user-info.php');

            // If user information is successfully received
            if(data.success && data.user){
                this.setState({
                    ...this.state,
                    isAuth:true,
                    theUser:data.user
                });
            }

        }
    }

    
 

    render(){

        //creating an object to hold all the states
        const contextValue = {
            rootState:this.state,
            toggleNav:this.toggleNav,
            isLoggedIn:this.isLoggedIn,
            registerUser:this.registerUser,
            loginUser:this.loginUser,
            logoutUser:this.logoutUser,
        }
        return(

            //wrapping the above object values in MyContext.Provider to allow other components and functions use of the states and function.
            //These props can be passed to children
            <MyContext.Provider value={contextValue}>
                {this.props.children}
            </MyContext.Provider>
        )
    }

}

export default MyContextProvider;