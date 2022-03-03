import React, { useContext, useState } from 'react'
import { MyContext } from '../contexts/MyContext'
import { BrowserRouter as Redirect, Route, Switch } from "react-router-dom";
import InputForm from './InputForm'
import './LoginDisplay.css';
import { Link } from 'react-router-dom';


//Functional reference is taken from : https://www.w3jar.com/react-js-php-mysql-db-login-registration-system/

//Function component to display login form if not logged in, or the prediction form if already logged in.
function LoginDisplay() {

    //Importing the MyContext.js state values. We are interested in isAuth as we are looking to see if the user is signed in. 
    //MyContext is acting as a parental component. It passes its prop values down to this component. React is one directional meaning that props 
    //cannot be passed back up to the parent.
    const { rootState } = useContext(MyContext);
    const { isAuth } = rootState;


    return (


        <Route >

            {/* if the state is Auth = true return input form. If false, show login */}
            {isAuth ? <InputForm /> : <Login />}

        </Route>


    )

};


//This is the login form that takes user input
function Login() {

    //Importing the MyContext.js state values. We are interested in loginUser and isLoggedIn.
    //Login user is a method that sends the userInfo to login.php. If the response is successful a localStorage 'loginToken' is stored.
    //This 'LoginToken' is then to authenticate API requests to our database.
    //MyContext is acting as a parental component. It passes its prop values down to this component. React is one directional meaning that props 
    //cannot be passed back up to the parent.
    const {  loginUser, isLoggedIn } = useContext(MyContext);

     // the initial state of our userInfo. This will change as the user inputs into the form
    const initialState = {
        userInfo: {
            email: '',
            password: '',
        },
        errorMsg: '',
        successMsg: '',
    }

    const [state, setState] = useState(initialState);

     // On change input value (email & password) update the current state of userInfo
    const onChangeValue = (e) => {
        setState({
            ...state,
            userInfo: {
                ...state.userInfo,
                [e.target.name]: e.target.value
            }
        });
    }

    // On Submit Login From - if successful local store a authenticating loginToken. If unsuccessful, return an error message.
    const submitForm = async (event) => {
        event.preventDefault();
        const data = await loginUser(state.userInfo);
        if (data.success && data.token) {
            setState({
                ...initialState,
            });
            localStorage.setItem('loginToken', data.token);
            await isLoggedIn();
        }
        else {
            setState({
                ...state,
                successMsg: '',
                errorMsg: data.message
            });
        }
    }

    // Show Message on Error or Success
    let successMsg = '';
    let errorMsg = '';
    if (state.errorMsg) {
        errorMsg = <div className="error-msg">{state.errorMsg}</div>;
    }
    if (state.successMsg) {
        successMsg = <div className="success-msg">{state.successMsg}</div>;
    }



    return (

        <div>
            <div>
                <h1 className="title">LOGIN</h1>
            </div>
            <div class="contentL">
                <p class=" text-center">To Access Application Please Login</p>
                <form onSubmit={submitForm} noValidate>
                    <div class="mb-3">
                        {/* input name and value is taken to fill out the "userInfo" when the form input select value changes in real time */}
                        {/* used to obtain 'email' */}
                        <label for="exampleFormControlInput1" class="form-label">Email address</label>
                        <input class="form-control" name="email" type="email" required placeholder="Enter your email" value={state.userInfo.email} onChange={onChangeValue} />
                    </div>
                    <div class="mb-3">
                         {/* input name and value is taken to fill out the "userInfo" when the form input select value changes in real time */}
                        {/* used to obtain 'password' */}
                        <label for="exampleFormControlInput1" class="form-label">Password</label>
                        <input class="form-control" name="password" type="password" required placeholder="Enter your password" value={state.userInfo.password} onChange={onChangeValue} />
                    </div>
                     {/* errorMsg and successMsg start off as "" and do not display. Upon form submission these states change and a message outputs */}
                    <p>{errorMsg}</p>
                    {/* Submit type button triggers the form 'onSubmit={SubmitForm}' submitting the current 'userInfo state to login.php*/}
                    <p> {successMsg}</p>
                    {/* Link that is formatted as a button takes us to the register url directory */}
                    <button type="submit" class="btn btn-outline-primary form-control">Login</button>
                    <Link to="/register" type="submit" class=" topSpace btn btn-outline-primary form-control">Register</Link>

                </form>

            </div>

        </div>




    )
}

export default LoginDisplay;