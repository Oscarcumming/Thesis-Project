import React, { Component } from 'react';
import './InputForm.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import { MyContext } from '../contexts/MyContext'
import Axios from 'axios'
import { Link } from 'react-router-dom';





//This template is adapted from our input form, except we edit the input values and syntax to suit the ‘savehorse.php’. 
class AddHorse extends Component {

//Importing the MyContext.js state values. We are interested in theUser as we are adding horses specific to the user account.
//MyContext is acting as a parental component. It passes its prop values down to this component. React is one directional meaning that props 
//cannot be passed back up to the parent.
  static contextType = MyContext;


  //constructor defines the initial state
  constructor(props) {
    super(props);


   //default values form values - starts empty. Values are altered by the rendered input form below.
    this.state = {
      isLoading: false,
      formData: {
        horse_name: '',
        weight_kg: '',
        height_cm: '',
        colour: '',
        description: '',
        horse_breed: '',
        client_name: '',
        user_id: '',
        status: '',
        passport_no :'',
      }

    };

    //this syntax allows the addHorse() method to change the state values.
    this.addHorse = this.addHorse.bind(this);
  }



  //sends the horse information to our database when the 'addhorse' button is clicked
  addHorse = () => {

    //gets the user info from MyContext state. 
    //rootstate contains theUser, isAuth, isLoggedIn to control and access the signed in account values.
    //We are interested in theUser.user_id value
    const { rootState } = this.context;
    const { theUser } = rootState;
    console.log(theUser.user_id)
    this.setState({ isLoading: true });



    //this object takes the values from our current form state. It will be passed to the php code /savehorse.php
    //All horses are saved as 'Under Supervision' by default. 
    // The veterinarian user will change this through the dashboard of the app when the horse is discharged (veterinarian has finished their client services).
    //The discharge parameters are : discharged : dead, discharged : under treatment and discharged : fully recovered.
    const params = {

      horse_name: this.state.formData.horse_name,
      weight_kg: this.state.formData.weight_kg,
      height_cm: this.state.formData.height_cm,
      colour: this.state.formData.colour,
      description: this.state.formData.description,
      horse_breed: this.state.formData.horse_breed,
      client_name: this.state.formData.client_name,
      user_id: theUser.user_id,
      status: 'Under Supervision',
      passport_no : this.state.formData.passport_no



    };


    console.log(params.horse_name, params.weight_kg,
      params.height_cm, params.colour, params.description,
      params.horse_breed, params.client_name, params.user_id,
      params.status, params.passport_no)


    //axios makes a post request to our local server API. It passes the above params. This will add the horse data to the sql database.
    Axios.post("http://localhost/php-colicapp/savehorse.php", (params))
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    this.setState({ isLoading: false });

   

  }




  //when data changes live on the input form, this function updates the values of the form data.
  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    var formData = this.state.formData;
    formData[name] = value;
    this.setState({
      formData
    });
  }




  //Cancel click resets the result state to null.
  handleCancelClick = (event) => {
    this.setState({ result: "" });
  }



  
  render() {


    //creating an object that allows us to access the state of the "isLoading" variable
    const isLoading = this.state.isLoading;
    //creating an object that allows us to access the state of the "formData" variable - the horse values we are to change through form input
    const formData = this.state.formData;
    


//below is what will appear on the screen in browser when loaded
    return (

      <Container>


        
        <div>
          <h1 className="title">Add Horse</h1>
        </div>
        <div className="content">
          <Form>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Horse Name</Form.Label>
                {/* from control name and value is taken to fill out the "formData" when the form input data value changes in real time */}
                {/* used to input the 'horse_name' */}
                <Form.Control
                  type="text"
                  name="horse_name"
                  value={formData.horse_name}
                  onChange={this.handleChange}
                  maxLength="25">
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Horse Passport Number</Form.Label>
                {/* from control name and value is taken to fill out the "formData" when the form input data value changes in real time */}
                {/* used to input the 'passport_no' */}
                <Form.Control
                  type="text"
                  name="passport_no"
                  value={formData.passport_no}
                  onChange={this.handleChange}
                  maxLength="15">
                </Form.Control>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Weight in Kilograms</Form.Label>
                 {/* from control name and value is taken by "handleChange" to fill out the "formData" when the form input data value changes in real time */}
                 {/* used to input the 'weight_kg' */}
                <Form.Control
                  type="text"
                  value={formData.weight_kg}
                  name="weight_kg"
                  onChange={this.handleChange}
                  maxLength="3">
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Height in Centremeters</Form.Label>
                 {/* from control name and value is taken by "handleChange" to fill out the "formData" when the form input data value changes in real time */}
                {/* used to input the 'height_cm' */}
                <Form.Control
                  type="text"
                  value={formData.height_cm}
                  name="height_cm"
                  onChange={this.handleChange}
                  maxLength="3">
                </Form.Control>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Horse Colour</Form.Label>
                 {/* from control name and value is taken by "handleChange" to fill out the "formData" when the form input data value changes in real time */}
                 {/* used to input the 'colour' */}
                <Form.Control
                  type="text"
                  value={formData.colour}
                  name="colour"
                  onChange={this.handleChange}
                  maxLength="10">
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Horse Description</Form.Label>
                 {/* from control name and value is taken by "handleChange" to fill out the "formData" when the form input data value changes in real time */}
                 {/* used to input the 'description' */}
                <Form.Control
                  type="text"
                  value={formData.description}
                  name="description"
                  onChange={this.handleChange}
                  maxLength="200">
                </Form.Control>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Horse Breed</Form.Label>
                 {/* from control name and value is taken by "handleChange" to fill out the "formData" when the form input data value changes in real time */}
                 {/* used to input the 'horse_breed' */}
                <Form.Control
                  type="text"
                  value={formData.horse_breed}
                  name="horse_breed"
                  onChange={this.handleChange}
                  maxLength="20">
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Client Name</Form.Label>
                 {/* from control name and value is taken by "handleChange" to fill out the "formData" when the form input data value changes in real time */}
                  {/* used to input the 'client_name' */}
                <Form.Control
                  type="text"
                  value={formData.client_name}
                  name="client_name"
                  onChange={this.handleChange}
                  maxLength="40">
                </Form.Control>
              </Form.Group>
            </Form.Row>



            <Row>
              <Col>
              {/* when the horse is successfully added, redirect tot the dashboard to see the newly added horse */}
              <Link to="/dashboard" type="submit" class=" topSpace btn btn-outline-primary form-control" onClick={!isLoading ? this.addHorse : null}>Add Horse</Link>
              </Col>
            </Row>
          </Form>




        </div>

        <div>



        </div>

      </Container>
    );
  }


}

//establishing context state for user
AddHorse.contextType = MyContext;



//---------------

export default AddHorse;
