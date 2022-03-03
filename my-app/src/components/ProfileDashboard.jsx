import React, { useContext } from 'react'
import Axios from "axios";
import { MyContext } from '../contexts/MyContext'
import { Component } from 'react';
import { UpdateHorse } from '.';
import { SpecificPrediction } from '.';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { DischargeHorse } from '.';


//This is the main page of the user accounts. It is here that horses can be added, a complete history of predictions can be accessed, a list of all current horses are displayed
//and their specific predictions can be viewed. Additionally horses can be deleted, edited and discharged from service.
class ProfileDashboard extends Component {

  //Importing the MyContext.js state values. We are interested in theUser as we are retrieving data specific to the user account.
  //MyContext is acting as a parental component. It passes its prop values down to this component. React is one directional meaning that props 
  //cannot be passed back up to the parent.
  static contextType = MyContext;

  constructor(props) {
    super(props);

    this.state = {


      //holds the horses that our account has saved
      horses: [],

      //These hold props to be passed to our children components
      //selectedHorseID and selectedHorseNAme passed to SpecificPrediction.jsx component:
      selectedHorseID: "",
      selectedHorseName: "",
      //used to hold and control the horse id of the selected horse to be discharged. This value also triggers a render condition.
      dischargeValue :"",
       //used to hold and control the horse id of the selected horse to be edited. This value also triggers a render condition.
      editHorse: "",
    }

    //allows these methods to alter the state of component
    this.getHorses = this.getHorses.bind(this);
    this.getHorseNameIDValue = this.getHorseNameIDValue.bind(this);
    this.dischargeHorse = this.dischargeHorse.bind(this);
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

  //method receives the loop outputted 'horse_id' from the 'horses' array. This is sent by an onclick event of the rendered output.
  //Each horse has a 'delete' button which passes back the the 'horse_id' to the 'deleteHorse' method parameter 
  deleteHorse = param => e => {

    console.log(param)

    //takes the 'horse_id' from the inputted method parameter and assigns it to an object
    const params = {

      horse_id: param

    };


    //axios makes a post request to our local server API. It passes the above params. This will delete the horse from the sql database.
    Axios.post("http://localhost/php-colicapp/deletehorse.php", (params))
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    this.setState({ isLoading: false });

    //rerun the 'getHorses()' - this updates the display - without you would have to refresh the page
    this.getHorses();

    window.location.reload();


  }


  //This method is used to set the 'selectedHorseID' and 'selectedHorseName' states. 'SelectHorseID' takes the param 'horse_id' and 'SelectHorseName' takes the param 'horse_name'.
  // 'SelectHorseID' creates a render condition and 'SelectedHorseNAme' allows us to output the selected horses name wherever we need. If this is null, the 'editHorse' and 'dischargeHorse' state is null,
  //the horses array will display, showing all of the registered horses to the account. When there is a 'selectHorseID' state value,
  //the render changes and displays the selected horse's predictions that have been made.
  getHorseNameIDValue = (param, param2) => e => {

    console.log(param)


    this.setState({
      selectedHorseID: param,
      selectedHorseName: param2,
    });
    console.log(this.selectedHorseID)

  };

  //Back click set the 'selectedHorseID' state to null, resetting the render from showing the horse-specific predictions to a the default output - the list of registered horses
  handleBackClick = (event) => {
    this.setState({ selectedHorseID: "" });
  }

  //This method is used to set the 'editHorse' state. 'editHorse' takes the param 'horse_id'.
  // 'editHorse' creates a render condition. If this is null, 'dischargeHorse' and the 'selectHorseID' state is null,
  //the horses array will display, showing all of the registered horses to the account. When there is a 'editHorse' state value,
  //the render changes and displays an edit form to change the selected horse information
  editHorseValues = (param) => e => {

    console.log(param)

    this.setState({
      editHorse: param,

    });
    console.log(this.editHorse)

  };

    //This method is used to set the 'dischargeValue' state. 'dischargeValue' takes the param 'horse_id'.
  // 'dischargeValue' creates a render condition. If this is null, 'editHorse" and the 'selectHorseID' state is null,
  //the horses array will display, showing all of the registered horses to the account. When there is a 'dischargeHorse' state value,
  //the render changes and displays 3 buttons to change the current 'status' value of the horses
  dischargeHorse = (param) => e => {

    console.log(param)

    this.setState({
      dischargeValue: param,

    });
    console.log(this.dischargeValue)

  };

  handleBackClick = (event) => {
    this.setState({ selectedHorseID: "", editHorse: "", dischargeValue: "" });
  }



  //componentWillMount() runs before any other code. The 'get account horses' into array is the first process to be carried out.
  componentWillMount() {
    this.getHorses();

  }

  //controls modal displays
  toggleModal() {
    this.state.setIsOpen(!this.state.isOpen);
  }



  render() {


    //creating objects from the current state. This allows access to its values. 
    //This can also be done without declaring an object this.state.value eg. "this.state.horses.map"
    //Both methods are used.
    const selectedHorseID = this.state.selectedHorseID;
    const selectedHorseName = this.state.selectedHorseName;
    const editHorse = this.state.editHorse
    const dischargeValue = this.state.dischargeValue


    // if no horse value is selected render all available user registered horses
    if (selectedHorseID === "" && editHorse === "" && dischargeValue ==="") {


      return (

        <div>
          <div>
            <h1 className="title">YOUR HORSES</h1>
          </div>

          <div class="container-fluid">
            <div class="row">
              <div class="col-sm  text-center">
                {/* two buttons that redirect to /addhorse and /history url. /addhorse renders 'AddHorse.jsx' and /history' renders 'PredictionHistory.jsx' */}
                <Link to="/addhorse" class="btn spacing btn-default btn btn-dark">Add Horses </Link>
                <Link to="/history" class="btn spacing btn-default btn btn-dark">See Prediction History </Link>
              </div>
            </div>
          </div>

          {/* table headers */}
          <div class="container-fluid">
            <div class="table-responsive-sm ">
              <table class="table table-light">
                <thead class="thead-dark">
                  <tr >
                    <th >Horse Id</th>
                    <th>Horse Name</th>
                    <th>weight (kg)</th>
                    <th>height (cm)</th>
                    <th>Colour</th>
                    <th>HorseBreed</th>
                    <th>Client</th>
                    <th>Status</th>
                    <th>Description</th>
                    <th>Horse Passport Number  </th>
                    <th>  </th>
                    <th>  </th>
                    <th>  </th>
                    <th>  </th>
                  </tr>
                </thead>

                {/* table values */}
                <tbody >
                  {/* A loop is used to output the 'horses' 2D array into the table contents .  */}
                  {this.state.horses.map((item =>
                    <tr key={item.horseloop} >
                      <td >{item.horse_id}</td>
                      <td>{item.horse_name}</td>
                      <td>{item.weight_kg}</td>
                      <td>{item.height_cm}</td>
                      <td>{item.colour}</td>
                      <td>{item.horse_breed}</td>
                      <td>{item.client_name}</td>
                      <td>{item.status}</td>
                      <td>{item.description}</td>
                      <td>{item.passport_no}</td>

                      <td>
                        {/* Button sets the state of 'selectedHorseID', establishing the conditional render of the selected horse's predictions */}
                        <button type="button" class="btn btn-dark" onClick={this.getHorseNameIDValue(item.horse_id, item.horse_name)}>
                          See More
                        </button>
                      </td>

                      <td>
                        {/* Button sets the state of 'editHorse', establishing the conditional render of the edit horse form */}
                        <button type="button" class="btn btn-dark" onClick={this.editHorseValues(item.horse_id)}>
                          Edit Horse
                        </button>
                      </td>

                      <td>
                        {/* Button to take to delete horse */}
                        <button type="button" class="btn btn-dark" onClick={this.deleteHorse(item.horse_id)}>
                          Remove Horse
                        </button>
                      </td>

                      <td>
                        {/* Button to take to change value of the selected horse's discharge status */}
                        <button type="button" class="btn btn-dark" onClick={this.dischargeHorse(item.horse_id)}>
                          Discharge Horse
                        </button>

                      </td>


                    </tr>
                  ))}

                </tbody>
              </table>
            </div>
          </div>



        </div>


      )
    }



    else if (selectedHorseID !== "" && editHorse === "" && dischargeValue === "") {

      return (

        <div>
          <Container>
            {/* render this when the this.state.selectedHorseID has value and this.state.editHorse and this.state.dischargeHorse has no value. It is passing the 'selectHorseID' as a prop to the component*/}
            <SpecificPrediction selectedHorseID={selectedHorseID} selectedHorseName={selectedHorseName} />
            {/* Button resets this.state.selectHorse to "" causing the other condition value to render (list of all horses that are on the account) */}
            <div class="container">
              <div class="row">
                <div class="col text-center">
                  <button onClick={this.handleBackClick} class="btn btn-default btn btn-dark spacing">Back </button>
                </div>
              </div>
            </div>

          </Container>
        </div>

      )
    }

    else if (selectedHorseID === "" && editHorse !== "" && dischargeValue === "") {

      return (

        <div>
          <Container>
            {/* render this when the this.state.selectedHorseID and this.state.dischargeValue has no value and this.state.editHorse has value. It is passing the 'editHorse' as a prop to the component */}
            <UpdateHorse editHorse={editHorse} />
            {/* Button resets this.state.editHorse to "" causing the other condition value to render (list of all horses that are on the account) */}
            <div class="container">
              <div class="row">
                <div class="col text-center">
                  <button onClick={this.handleBackClick} class="btn btn-default btn btn-dark spacing">Back </button>
                </div>
              </div>
            </div>

          </Container>
        </div>

      )




    }

    else if (selectedHorseID === "" && editHorse === "" && dischargeValue !== "") {

      return (

        <div>
          <Container>
            {/* render this when the this.state.selectedHorseID and this.state.editHorse has no value and this.state.dischargeValue has value. It is passing the 'dischargeValue' as a prop to the component */}
            <DischargeHorse dischargeValue={dischargeValue} />
            {/* Button resets this.state.dischargeValue to "" causing the other condition value to render (list of all horses that are on the account) */}
            <div class="container">
              <div class="row">
                <div class="col text-center">
                  <button onClick={this.handleBackClick} class="btn btn-default btn btn-dark spacing">Back </button>
                </div>
              </div>
            </div>

          </Container>
        </div>

      )




    }

  }
}

//establishing context state for user
ProfileDashboard.contextType = MyContext;

export default ProfileDashboard;



