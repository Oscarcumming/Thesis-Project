import React, { Component } from 'react';
import './InputForm.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import { MyContext } from '../contexts/MyContext'
import Axios from 'axios'




//Reference is taken from : https://towardsdatascience.com/create-a-complete-machine-learning-web-application-using-react-and-flask-859340bddb33
//This template is reversed engineered to suit our application needs



//Creation of form select data. Using for loops to generate numeric array for dropdown form select data control
//Highest and lowest values plus a rough margin above and below
//20.0 - 90.0
var packed_cell_volumes = []
for (var i = 20; i <= 90; i = +(i + 1).toFixed(1)) {
  packed_cell_volumes.push(<option key={i} value={i}>{i}</option>);
}

//Creation of form select data. Using for loops to generate numeric array for dropdown form select data control
//Highest and lowest values plus a rough margin above and below
//30.0 to 200.0
var pulses = []
for (var i = 30; i <= 200; i = +(i + 1).toFixed(1)) {
  pulses.push(<option key={i} value={i}>{i}</option>);
}


//Creation of form select data. For the form data to present we need to push the html/jsx into an array. It will not display if it is just an array of strings. 
//It needs to be fully formatted as the 'select' syntax within the array
//contains 'yes' or 'no'
var surgical_lesions_values = ["yes", "no"]
var surgical_lesions = []
for (var i = 0; i <= surgical_lesions_values.length - 1; i++) {
  surgical_lesions.push(<option key={surgical_lesions_values[i]} value={surgical_lesions_values[i]}> {surgical_lesions_values[i]} </option>);
}

//Creation of form select data. For the form data to present we need to push the html/jsx into an array. It will not display if it is just an array of strings. 
//It needs to be fully formatted as the 'select' syntax within the array
//contains 'cool', 'normal', 'cold', 'warm'
var temp_of_extremitiess_values = ["cold", "cool", "normal", "warm"]
var temp_of_extremitiess = []
for (var i = 0; i <= temp_of_extremitiess_values.length - 1; i++) {
  temp_of_extremitiess.push(<option key={temp_of_extremitiess_values[i]} value={temp_of_extremitiess_values[i]}> {temp_of_extremitiess_values[i]} </option>);
}


//Creation of form select data. Using for loops to generate numeric array for dropdown form select data control
//Highest and lowest values plus a rough margin above and below
//1-100
var total_proteins = []
for (var i = 1; i <= 100; i = +(i + 1).toFixed(1)) {
  total_proteins.push(<option key={i} value={i}>{i}</option>);
}

//Creation of form select data. For the form data to present we need to push the html/jsx into an array. It will not display if it is just an array of strings. 
//It needs to be fully formatted as the 'select' syntax within the array
//contains 'reduced', 'normal', 'absent' or 'increased'
var peripheral_pulses_values = ["absent", "reduced", "normal", "increased"]
var peripheral_pulses = []
for (var i = 0; i <= peripheral_pulses_values.length - 1; i++) {
  peripheral_pulses.push(<option key={peripheral_pulses_values[i]} value={peripheral_pulses_values[i]}> {peripheral_pulses_values[i]} </option>);
}

//Creation of form select data. For the form data to present we need to push the html/jsx into an array. It will not display if it is just an array of strings. 
//It needs to be fully formatted as the 'select' syntax within the array
//contains yes or no
var surgerys_values = ["yes", "no"]
var surgerys = []
for (var i = 0; i <= surgerys_values.length - 1; i++) {
  surgerys.push(<option key={surgerys_values[i]} value={surgerys_values[i]}> {surgerys_values[i]} </option>);
}




class InputForm extends Component {

  //Importing the MyContext.js state values. We are interested in theUser as we are adding horses specific to the user account.
  //MyContext is acting as a parental component. It passes its prop values down to this component. React is one directional meaning that props 
  //cannot be passed back up to the parent.
  static contextType = MyContext;


  //constructor defines the initial state
  constructor(props) {
    super(props);



    //default values when app is opened - the default state values
    this.state = {
      //isLoading controls the rendering and method processes
      isLoading: false,
      //horses contains all the horses registered to the logged in account
      horses: [{horse_name : "Kevin",  passport_no : "900000333", client_name : "Donald Trump"}],
      

      //default values form values - starts empty. Values are altered by the rendered input form below.
      formData: {
        horse_name: 'horse',
        packed_cell_volume: 20,
        pulse: 30,
        surgical_lesion: 'no',
        temp_of_extremities: 'cold',
        total_protein: 5,
        peripheral_pulse: 'normal',
        lesion_1: 0,
        surgery: 'no',
      },
      result: "",
      successMsg :""

    };
    //allows these methods to alter the state of component - the 'result' 
    this.handlePredictClick = this.handlePredictClick.bind(this);
    //allows these methods to alter the state of component - the 'horses' array
    this.getHorses = this.getHorses.bind(this);


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






  //sends the prediction to our database
  handlePredictionRecording = () => {

    //gets the user info from mycontext stat.
    const { rootState } = this.context;
    const { theUser } = rootState;
    console.log(theUser.email)
    this.setState({ isLoading: true });

    //get time and date assigned to variable
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

    //the information that will be posted to our database using axios
    const params = {

      horse_id: this.state.formData.horse_id,
      user_id: theUser.user_id,
      horse_name: this.state.formData.horse_name,
      prediction: this.state.result,
      date: date,
      time: time,
      packed_cell_volume: this.state.formData.packed_cell_volume,
      pulse: this.state.formData.pulse,
      surgical_lesion: this.state.formData.surgical_lesion,
      temp_of_extremities: this.state.formData.temp_of_extremities,
      total_protein: this.state.formData.total_protein,
      peripheral_pulse: this.state.formData.peripheral_pulse,
      lesion_1: this.state.formData.lesion_1,
      surgery: this.state.formData.surgery

    };

    console.log(params.horse_id, params.horse_name,
      params.prediction, params.date, params.time,
      params.packed_cell_volume, params.pulse, params.surgical_lesion,
      params.temp_of_extremities, params.total_protein, params.peripheral_pulse,
      params.lesion_1, params.surgery)

    //posting our parameters to the php API which will update the sql database
    Axios.post("http://localhost/php-colicapp/saveprediction.php", (params))
      .then((response) => {
        console.log(response.data.message);
        this.setState({successMsg : response.data.message})
      })
      .catch((error) => {
        console.log(error);
       
      });
    this.setState({ isLoading: false });

  }




  //when data changes live on the input form, this function updates the values of our from data
  //this method handles all form changes apart from 'horse_name' and 'horse_id'
  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    var formData = this.state.formData;
    formData[name] = value;
    this.setState({
      formData
    });
  }


  //The horses array state now holds all of the horses registered to the logged in account.
  //These are then inputted into a selection dropdown in the input form. This controls data & allows us to assign a better architecture to each horses recording.
  //When the form is submitted, this method attains the value and name of the input field (drop down menu of horses)
  //these two values are used to set the 'horse_id' value
  //A for loop is used to run through the 'horses' array and if the 'horse_id' matches, that specific 'horse_name' is retrieved and then used to change the 'formData'.
  //This method is run every time a new selection is made form the 'horse name' field of our input form. It is real time state update.
  handleChangePickingHorse = (event) => {

    //When the name selection changes on the input form, the change event retrieves the value and name of the field.
    //These fields allow us to retrieve the 'horse_id' value
    const value = event.target.value;
    const name = event.target.name;

    console.log(value);
    console.log(name);

    //the 'horse_id' value retrieved by the selection change of the 'horse name' field is put through a loop.
    //this loop runs through the 'horses' array. When the matching horse is found, the 'horse_name' is returned.
    const horseName = this.state.horses.map((horse) => {
      if (horse.horse_id === value)
        return horse.horse_name

    })

    //above code returns the result in a single value array. We need to parse it into a String value.
    let horseNameString = horseName.toString();

    //After changing the horseName to a string, it includes the comma of the array structure. This is removed below.
    var horseNameString_ = horseNameString.replace(/,/g, '');

    console.log(horseNameString_)



    //using the 'user_id' and 'horse_name' values to update our current form state.
    var formData = this.state.formData;
    formData.horse_name = horseNameString_;
    formData.horse_id = value;
    this.setState({
      formData
    });
  }






//This method is called when the 'predict' button is clicked.
//The current state of the form data object is created
//fetch is used to retrieve our prediction API that is house in our FLASK virtual environment
//The form data variable is then posted to the API in JSON format.
//The response is then used to update the 'result' state.
//This gets us the prediction result from our current formData state.

  handlePredictClick = () => {

    const formData = this.state.formData;
    this.setState({ isLoading: true });
    fetch('http://127.0.0.1:5000/prediction/',
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(response => {
        this.setState({
          result: response.result,
          isLoading: false,


        });

      });


  }








  //Cancel click resets our result state to null.
  handleCancelClick = (event) => {
    this.setState({ result: "" });
  }

  //componentWillMount() runs before any other code.  The get account horses into array is the first process to be carried out.
  componentWillMount() {
    this.getHorses();

  }


  //Render of content to browser
  render() {


    //creating objects from the current state. This allows access to its values. 
    //This can also be done without declaring an object this.state.value eg. "this.state.horses.map"
    //Both methods are used.
    const isLoading = this.state.isLoading;
    const formData = this.state.formData;
    const result = this.state.result;




    return (



      <Container>


        <div>
          <h1 className="title">Colic Predictor</h1>
        </div>
        <div className="content">
          <Form>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Horse Name // Passport Number // Client Name</Form.Label>
                {/* from control name and value is taken to fill out the "formData" when the form input select value changes in real time */}
                {/* used to obtain 'horse_id' and 'horse_name' */}
                <Form.Control
                  as="select"
                  value={formData.horse_id}
                  name="horse_id"
                  onChange={this.handleChange, this.handleChangePickingHorse}>
                    {/* A loop is used to output the 'horses' array to a drop-down selection menu. Client name and horse passport number are also displayed to 
                    make sure horses with the same name can be differentiated  */}
                  <option>Pick Horse</option>
                  {this.state.horses.map((horse) => (
                    <option value={horse.horse_id}>{horse.horse_name}   // {horse.passport_no} //  {horse.client_name}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form.Row>



            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Packed Cell Volume</Form.Label>
                {/* from control name and value is taken to fill out the "formData" when the form input select value changes in real time */}
                {/* used to obtain 'packed_cell_volume' */}
                <Form.Control
                  as="select"
                  value={formData.packed_cell_volume}
                  name="packed_cell_volume"
                  onChange={this.handleChange}>
                  {packed_cell_volumes}
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Pulse Rate</Form.Label>
                <Form.Control
                  as="select"
                  value={formData.pulse}
                  name="pulse"
                  onChange={this.handleChange}>
                  {pulses}
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Surgical Lesion</Form.Label>
                {/* from control name and value is taken to fill out the "formData" when the form input select value changes in real time */}
                {/* used to obtain 'surgical_lesion' */}
                <Form.Control
                  as="select"
                  value={formData.surgical_lesion}
                  name="surgical_lesion"
                  onChange={this.handleChange}>
                  {surgical_lesions}
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Temp. of Extremities</Form.Label>
                {/* from control name and value is taken to fill out the "formData" when the form input select value changes in real time */}
                {/* used to obtain 'temp_of_extremities' */}
                <Form.Control
                  as="select"
                  value={formData.temp_of_extremities}
                  name="temp_of_extremities"
                  onChange={this.handleChange}>
                  {temp_of_extremitiess}
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Total Protein Count</Form.Label>
                {/* from control name and value is taken to fill out the "formData" when the form input select value changes in real time */}
                {/* used to obtain 'total_protein' */}
                <Form.Control
                  as="select"
                  value={formData.total_protein}
                  name="total_protein"
                  onChange={this.handleChange}>
                  {total_proteins}
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Peripheral Pulse</Form.Label>
                 {/* from control name and value is taken to fill out the "formData" when the form input select value changes in real time */}
                {/* used to obtain 'peripheral_pulse' */}
                <Form.Control
                  as="select"
                  value={formData.peripheral_pulse}
                  name="peripheral_pulse"
                  onChange={this.handleChange}>
                  {peripheral_pulses}
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Lesion</Form.Label>
                {/* from control name and value is taken to fill out the "formData" when the form input select value changes in real time */}
                {/* used to obtain 'lesion_1' */}
                <Form.Control
                  type="text"
                  name="lesion_1"
                  value={formData.lesion_1}
                  onChange={this.handleChange}
                  maxLength="6">
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Surgery</Form.Label>
                {/* from control name and value is taken to fill out the "formData" when the form input select value changes in real time */}
                {/* used to obtain 'surgery' */}
                <Form.Control
                  as="select"
                  value={formData.surgery}
                  name="surgery"
                  onChange={this.handleChange}>
                  {surgerys}
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Row>
              <Col>
              {/* Button is used to run our prediction API through 'handlePredictClick'. If loading, the button text changes to 'Making Prediction' */}
                <Button
                  block
                  variant="success"
                  disabled={isLoading}
                  onClick={!isLoading ? this.handlePredictClick : null}>
                  {isLoading ? 'Making prediction' : 'Predict'}
                </Button>
              </Col>
              <Col>
              {/* Button is used to reset the 'result' state output to nothing. This resets the forms result. */}
                <Button
                  block
                  variant="danger"
                  disabled={isLoading}
                  onClick={this.handleCancelClick}>
                  Reset prediction
                </Button>
              </Col>
            </Row>
          </Form>

          {/* If the 'result' state is not null render this : */}
          {result === "" ? null :
            (<Row>
              {/* Output result */}
              <Col className="result-container">
                <h5 id="result">Percentage chance of survival : {result}%</h5>

                 {/* These will appear if a success message or error message state has value  */}
                  <h6>{this.state.successMsg}</h6>

                {/* Button when clicked sends the prediction to our database. This is done through 'handlePredictionRecording' */}
                  <Button
                    block
                    variant="warning"
                    disabled={isLoading}
                    onClick={this.handlePredictionRecording}>
                    Record Prediciton
                  </Button>

                
              </Col>
            </Row>)
          }
        </div>


      </Container>




    );
  }


}

//establishing context state for user
InputForm.contextType = MyContext;



//---------------

export default InputForm;
