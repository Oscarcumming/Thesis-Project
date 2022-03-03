import React, { useContext, useState } from 'react'
import { MyContext } from '../contexts/MyContext'
import './Register.css';

//Functional reference is taken from : https://www.w3jar.com/react-js-php-mysql-db-login-registration-system/

//Used to register an account to the sql database
function Register() {

    //gets the user info from MyContext state.
    //rootstate contains theUser, isAuth, isLoggedIn to control and access the signed in account values.
    //We are interested in the registerUser method.
    const {  registerUser } = useContext(MyContext);

    //an object that declares the initial values : email, name and password
    const initialState = {
        userInfo: {
            name: '',
            email: '',
            password: '',
        },
        errorMsg: '',
        successMsg: '',
    }

    //the 'initialState' object is then turned into a state value that can be accessed. It is done this way because it is not a component but a functional component
    const [state, setState] = useState(initialState);

    // On Submit the Registration Form
    const submitForm = async (event) => {
        event.preventDefault();
        //using the current state of 'userInfo' as a parameter into the 'registerUser' method in 'MyContext.js' 
        //If the post request is successful and the user is added, assign success message to the 'successMsg' state
        const data = await registerUser(state.userInfo);
        if (data.success) {
            setState({
                ...initialState,
                successMsg: data.message,
            });
        }
        //Else if the post request is unsuccessful and the user is not added, assign error message to the 'errorMsg' state
        else {
            setState({
                ...state,
                successMsg: '',
                errorMsg: data.message
            });
        }
    }

    //when data changes live on the input form, this function updates the values of our from data. It extracts the 'name' and 'value' of the input field 
    //and uses this to set the corresponding state values
    const onChangeValue = (e) => {
        setState({
            ...state,
            userInfo: {
                ...state.userInfo,
                [e.target.name]: e.target.value
            }
        });
    }

    // creating the variables to hold the 'successMsg' and 'errorMsg'
    let successMsg = '';
    let errorMsg = '';
    //if errorMsg state has a value, update the errorMsg variable contain a div with the new errorMsg state
    if (state.errorMsg) {
        errorMsg = <div className="error-msg">{state.errorMsg}</div>;
    }
    //if successMsg state has a value, update the successMsg variable contain a div with the new errorMsg state
    if (state.successMsg) {
        successMsg = <div className="success-msg">{state.successMsg}</div>;
    }

    return (

        <div>
            <div>
                <h1 className="title">REGISTER</h1>
            </div>
            <div class="contentR">
                <form onSubmit={submitForm} noValidate>
                    <div class="mb-3">
                        {/* from control name and value is taken to fill out the "userInfo" when the form input select value changes in real time -  name */}
                        <label for="exampleFormControlInput1" class="form-label">Full Name</label>
                        <input class="form-control" name="name" required type="text" value={state.userInfo.name} onChange={onChangeValue} placeholder="Enter your name" />
                    </div>
                    <div class="mb-3">
                        {/* from control name and value is taken to fill out the "userInfo" when the form input select value changes in real time -  email */}
                        <label for="exampleFormControlInput1" class="form-label">Email</label>
                        <input class="form-control" name="email" required type="email" value={state.userInfo.email} onChange={onChangeValue} placeholder="Enter your email" />
                    </div>
                    <div className="mb-3">
                        {/* from control name and value is taken to fill out the "userInfo" when the form input select value changes in real time -  password */}
                        <label class="form-label">Password</label>
                        <input class="form-control" name="password" required type="password" value={state.userInfo.password} onChange={onChangeValue} placeholder="Enter your password" />
                    </div>
                    {/* These will appear if a success message or error message state has value - basically when the information is sent through 'registerUser' */}
                    {errorMsg}
                    {successMsg}

                    {/* Button submits the form and then runs 'submitFrom' method */}
                    <button type="submit" class="btn btn-outline-primary form-control">Sign Up</button>

                </form>

            </div>
            <div className="justify-content-end">

            </div>
        </div>




    )
}

export default Register;