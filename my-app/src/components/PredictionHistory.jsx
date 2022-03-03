import React from 'react'
import Axios from "axios";
import { MyContext } from '../contexts/MyContext'
import { Component } from 'react';
import { CSVLink } from 'react-csv';




//Component displays the complete history of predictions made by the user across all horses 
class PredictionHistory extends Component {

  //Importing the MyContext.js state values. We are interested in theUser as we are retrieving predictions specific to the user account.
  //MyContext is acting as a parental component. It passes its prop values down to this component. React is one directional meaning that props 
  //cannot be passed back up to the parent.
  static contextType = MyContext;

  //constructor defines the initial state
  constructor(props) {
    super(props);

    //predictions state hold all the user predictions
    this.state = {
      predictions: [],
    }

    //this syntax allows the getPredict() method to change the state values.
    this.getPredict = this.getPredict.bind(this);
  }



  //Cancel click resets our result state to null.
  handleCancelClick = (event) => {

  }




  //method gets all of the of the predictions registered to the account and adds them to the state of the 'predictions' array
  //this is handled in componentWillMount() meaning before any process or rendering begins, getPredict will run. This ensures our array 
  //has the prediction values before anything else happens
  getPredict = async () => {

    //gets the login token cookie from our browser local storage. This will only be present if successfully logged in. It is a JWT token.
    const loginToken = localStorage.getItem('loginToken');

    // If inside the local-storage has the the JWT token (and is therefore logged in)
    if (loginToken) {

      //Adding JWT token to axios default header - this allows access to the database. For security and access purposes. You need the token to be able 
      //to request the API for database information.
      Axios.defaults.headers.common['Authorization'] = 'bearer ' + loginToken;

      // Fetching the user information
      const { data } = await Axios.get('http://localhost/php-colicapp/user-predictions.php');
      console.log(data)


      console.log(data.user)

      // If user information is successfully received, add the predictions to the 'predictions' array in state
      if (data.success && data.user) {
        this.setState({
          ...this.state,
          isAuth: true,
          predictions: data.user

        });
      }

    }

  }



  //componentWillMount() runs before any other code. The account prediction array is the first process to be carried out.
  componentWillMount() {
    this.getPredict();

  }


  render() {

    return (

      //table headers
      <div class="container-fluid">
        <div class="table-responsive-sm ">
          <table class="table table-light">
            <thead class="thead-dark">
              <tr>
                <th>Horse Name</th>
                <th>Survival Chance</th>
                <th>Date</th>
                <th>Time</th>
                <th>Packed Cell volume</th>
                <th>Pulse</th>
                <th>Surgical Lesion</th>
                <th>Temperature of Extremities</th>
                <th>Total Protein</th>
                <th>Peripheral Pulse</th>
                <th>Lesion 1</th>
                <th>Surgery</th>

              </tr>
            </thead>

            {/* table values */}
            <tbody>
              {/* A loop is used to output the 'predictions' 2D array into the table contents .  */}
              {this.state.predictions.map((item =>
                <tr key={item.horseID} >
                  <td>{item.horse_name}</td>
                  <td><b>{item.prediction}</b>%</td>
                  <td>{item.date}</td>
                  <td>{item.time}</td>
                  <td>{item.packed_cell_volume}</td>
                  <td>{item.pulse}</td>
                  <td>{item.surgical_lesion}</td>
                  <td>{item.temp_of_extremities}</td>
                  <td>{item.total_protein}</td>
                  <td>{item.peripheral_pulse}</td>
                  <td>{item.lesion_1}</td>
                  <td>{item.surgery}</td>
                </tr>
              ))}
              <tr>

              </tr>

            </tbody>
          </table>
        </div>

        {/* Allows download of output data in csv format */}
        <CSVLink data={this.state.predictions} >Download me</CSVLink>


      </div>


    )



  }
}

//establishing context state for user
PredictionHistory.contextType = MyContext;

export default PredictionHistory;