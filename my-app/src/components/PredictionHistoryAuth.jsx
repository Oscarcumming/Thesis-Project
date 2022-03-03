import React, { useContext } from 'react'
import { MyContext } from '../contexts/MyContext'
import LoginDisplay from './LoginDisplay'
import { PredictionHistory } from '.'


//Applying authentication render conditions to the 'PredictionHistory.jsx' component
function PredictionHistoryAuth() {


    //gets the user info from MyContext state. 
    //rootstate contains theUser, isAuth, isLoggedIn to control and access the signed in account values.
    //We are interested in isAuth state value.
    const { rootState } = useContext(MyContext);
    const { isAuth } = rootState;

    // If user Logged in and authenticated show the user prediction history
    if (isAuth) {
        return (
            <div className="userInfo">

                <div class="container spacingM">
                    <div class="row">
                        <div class="col  text-center text-white">
                            <h1>Prediction History</h1>
                        </div>
                    </div>
                    <PredictionHistory />
                </div>



            </div>
        )
        //else if not logged in, show login form
    } else {
        return (
            <LoginDisplay />
        )

    }



}




export default PredictionHistoryAuth;