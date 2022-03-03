import { Component } from "react";
import React from 'react';
import Axios from "axios";
import {CSVLink} from 'react-csv';



//Outputs the predictions of only the selected horse
class SpecificPrediction extends Component {

    //creating component state
    state = {

      //These hold props that has been passed from the parental file 'ProfileDashboard.jsx'
      //These values are passed to allow us to get the predictions of a specific horse
       selectedHorseID : this.props.selectedHorseID,
       selectedHorseName : this.props.selectedHorseName,

       //array to hold all horse predictions
       predictions: [],

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

      //creating variable to hold the horse_id that has been given to us by the parent list
        const selectedHorseName = this.state.selectedHorseName;

        //creating an array to hold the matching 'horse_id' prediction results. We have to place the mapped array within an array object.
        // We do this to prevent null values being pushed into the array.
        const array = []

        //loop that takes the 'predictions' state and adds matching 'horse_id' predictions to the above array. This will be used to present results below
        const values = this.state.predictions.map((predicition) => {if(predicition.horse_id === this.state.selectedHorseID)
          array.push(predicition)
  })

      


          return(

            

           <div>
             {/* horse name variable used to output the selected horses name that we are viewing the predictions of*/}
              <h3 className="title">{selectedHorseName}</h3>
              

              <div class="container-fluid">
            <div class="table-responsive-sm ">
              <table class="table table-light">
                <thead class="thead-dark">
               <tr>
                  <th>Prediction ID</th>
                 <th>Horse ID</th>
                 <th>Horse Name</th>
                 <th>Survival Chance</th>
                 <th>Date</th>
                 <th>Time</th>
                 <th>Packed Cell Volume</th>
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
                {/* A loop is used to output the 'array' 2D array into the table contents .  */}
               {array.map((item =>
                 <tr key={item.predicition_id} >
                   <td>{item.prediction_id}</td>
                   <td>{item.horse_id}</td>
                   <td>{item.horse_name}</td>
                   <td><b>{item.prediction}%</b></td>
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
               
             </tbody>
 
           </table>
           </div>
           {/* Allows download of output data in csv format */}
           <p>
           <CSVLink data={array} >Download me</CSVLink>
           </p>
            
         </div>





           


            </div>
   
  
  
      
        )
    }
        }



export default SpecificPrediction;