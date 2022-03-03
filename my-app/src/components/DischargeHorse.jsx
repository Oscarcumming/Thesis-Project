import { Component } from "react";
import React from 'react';
import Axios from "axios";



//this component presents three buttons that can be clicked to change the 'status' value of the horse.
//This is done when the vet discharges a horse after their services have been rendered.
class DischargeHorse extends Component {

  //creating component state
  state = {

    //These hold props that has been passed from the parental file 'ProfileDashboard.jsx'
    //These values are passed to allow us to adjust the 'status' value of the selected horse
    dischargeValue: this.props.dischargeValue,


    //array to hold all horse predictions
    horses: [],

  }



  //method gets all of the of the horses registered to the account and adds them to the state of the 'horses' array
  //this is handled in componentWillMount() meaning before any process or rendering begins, getHorses will run. This ensures our array 
  //has the horse values before anything else happens
  getHorses = async () => {


    //gets the login token cookie from our browser local storage. This will only be present if successfully logged in. It is a JWT token.
    const loginToken = localStorage.getItem('loginToken');

    // If inside the local-storage has the the JWT token (and is therefore logged in)
    if (loginToken) {

      //Adding JWT token to axios default header - this allows access to the database. For security and access purposes. You need the token to be able 
      //to request the API for database information.
      Axios.defaults.headers.common['Authorization'] = 'bearer ' + loginToken;

      // Fetching the users registered horses
      const { data } = await Axios.get('http://localhost/php-colicapp/user-horses.php');
      console.log(data)


      console.log(data.user)

      // If user information is successfully received, add the horses to the 'horses' array in state
      if (data.success && data.user) {
        this.setState({
          ...this.state,
          isAuth: true,
          horses: data.user

        });
      }

    }

  }

 

  //this method takes the 'dischargeValue' (horse_id) and sends it to the discharge-dead.php API
  //This will update the status of the selected horse to "Discharged : Dead"
  dischargeDead = () => {

    console.log(this.state.dischargeValue)

    const params = {

      horse_id: this.state.dischargeValue,


    };

    //axios makes a post request to our local server API. It will set horse status to 'Discharged : Dead'
    Axios.post("http://localhost/php-colicapp/discharge-dead.php", (params))
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });


    //refreshes the page and brings the user back to the
    window.location.reload();

  }

  //this method takes the 'dischargeValue' (horse_id) and sends it to the discharge-undertreatment.php API
   //This will update the status of the selected horse to "Discharged : Under Treatment"
  dischargeUnderTreatment = () => {

    console.log(this.state.dischargeValue)

    const params = {

      horse_id: this.state.dischargeValue,


    };

    // //axios makes a post request to our local server API. It will set horse status to 'Discharged : Under Treatment'
    Axios.post("http://localhost/php-colicapp/discharge-undertreatment.php", (params))
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });


    //refreshes the page and brings the user back to the
    // window.location.reload();
    window.location.reload();

  }

  //this method takes the 'dischargeValue' (horse_id) and sends it to the discharge-fullyrecovered.php API
  //This will update the status of the selected horse to "Discharged : Fully Recovered"
  dischargeFullyRecovered = () => {

    console.log(this.state.dischargeValue)

    const params = {

      horse_id: this.state.dischargeValue,


    };

    // //axios makes a post request to our local server API. It will set horse status to 'Discharged : Fully Recovered'
    Axios.post("http://localhost/php-colicapp/discharge-fullyrecovered.php", (params))
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });


    //refreshes the page and brings the user back to the
    window.location.reload();

  }



  //componentWillMount() runs before any other code. The account prediction array is the first process to be carried out.
  componentWillMount() {
    this.getHorses();


  }



  render() {




    return (

      <div>
        <div>
          <h1 className="title">DISCHARGE HORSE</h1>
        </div>



        <div class="container-fluid ">
          <div class="row">
            <div class="col-sm  text-center spacing">

              <div class="container-fluid ">
                <h3>Choose Discharge Option</h3>
              </div>

              {/* three buttons that discharge the horse as 'Discharged : Dead', 'Discharged : Under Treatment' & 'Discharged : Fully Recovered' */}
              {/* Button to take to discharge horse as 'Discharged : Dead' */}
              <button type="button" class="btn btn-dark spacing" onClick={this.dischargeDead}>
                Discharge : Dead
              </button>
              {/* Button to take to discharge horse as 'Discharged : Under Treatment' */}
              <button type="button" class="btn btn-dark spacing" onClick={this.dischargeUnderTreatment}>
                Discharge : Under Treatment
              </button>
              {/* Button to take to discharge horse as 'Discharged : Fully Recovered'  */}
              <button type="button" class="btn btn-dark spacing" onClick={this.dischargeFullyRecovered}>
                Discharge : Fully Recovered
              </button>
            </div>
          </div>
        </div>





      </div>



    )
  }
}



export default DischargeHorse;