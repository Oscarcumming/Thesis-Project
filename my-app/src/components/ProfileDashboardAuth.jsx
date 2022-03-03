import React, { useContext } from 'react'
import { MyContext } from '../contexts/MyContext'
import LoginDisplay from './LoginDisplay'
import { ProfileDashboard } from '.'


//Applying authentication render conditions to the 'ProfileDashboard.jsx' component
function ProfileDashboardAuth() {


    //gets the user info from MyContext state. 
    //rootstate contains theUser, isAuth, isLoggedIn to control and access the signed in account values.
    //We are interested in isAuth state value.
    const { rootState } = useContext(MyContext);
    const { isAuth } = rootState;

    // If user Logged in and authenticated show the user profile dashboard
    if (isAuth) {
        return (


            <div className="userInfo">
                    <ProfileDashboard />
                </div>



        )
        //else if not logged in, show login form
    } else {
        return (
            <LoginDisplay />
        )

    }



}

export default ProfileDashboardAuth;
