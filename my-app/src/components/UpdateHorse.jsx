import Axios from "axios";
import React, { Component } from 'react';
import './InputForm.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';


//A form that presents the current values of the selected horse to be changed. 
//The new values are edited in and then saved.
class UpdateHorse extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoading: false,
            preload: true,
            editHorse: this.props.editHorse,
            horses: [],
            selectedHorseInfo: {

                horse_id: "",
                horse_name: "",
                weight_kg: "",
                height_cm: "",
                colour: "",
                description: "",
                horse_breed: "",
                client_name: "",
                status: 'Under Supervision',
                passport_no: "",
            },

        }
    }


    //gets all horses that have been predicted with a matching userid gotten from the loginToken
    getHorses = async () => {



        const loginToken = localStorage.getItem('loginToken');

        // If inside the local-storage has the JWT token
        if (loginToken) {

            //Adding JWT token to axios default header
            Axios.defaults.headers.common['Authorization'] = 'bearer ' + loginToken;

            // Fetching the user information
            const { data } = await Axios.get('http://localhost/php-colicapp/user-horses.php');
            console.log(data)

            //holds the result array
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

        //creating a new array to hold the 2D array of the selected horse
        const horseArray = [];

        //a map loop is run through all of the users horses to match find the selected 'editHorse'. This is then pushed into the above array 'horseArray'
        this.state.horses.map((horse) => {
            if (horse.horse_id === this.state.editHorse)
                horseArray.push(horse)
        })


        console.log(horseArray)

        //using the selected horse's  2D array values to set the 'selectedHorseInfo' state.
        this.setState({
            selectedHorseInfo: {

                horse_id: this.state.editHorse,
                horse_name: horseArray[0].horse_name,
                weight_kg: horseArray[0].weight_kg,
                height_cm: horseArray[0].height_cm,
                colour: horseArray[0].colour,
                description: horseArray[0].description,
                horse_breed: horseArray[0].horse_breed,
                client_name: horseArray[0].client_name,
                status: 'Under Supervision',
                passport_no: horseArray[0].passport_no


            }
        })

        console.log(this.state.selectedHorseInfo)



        this.setState({ preload: false });

    }








    //sends the prediction to our database. If successful, this will update the horse's details.
    updateHorse = () => {


        this.setState({ isLoading: true });


        //the information that will be posted to our database using axios. It reflects the current state of the 'selectedHorseInfo'
        const params = {

            horse_id: this.state.editHorse,
            horse_name: this.state.selectedHorseInfo.horse_name,
            weight_kg: this.state.selectedHorseInfo.weight_kg,
            height_cm: this.state.selectedHorseInfo.height_cm,
            colour: this.state.selectedHorseInfo.colour,
            description: this.state.selectedHorseInfo.description,
            horse_breed: this.state.selectedHorseInfo.horse_breed,
            client_name: this.state.selectedHorseInfo.client_name,
            status: 'Under Supervision',
            passport_no: this.state.selectedHorseInfo.passport_no



        };

        console.log(params.horse_name, params.weight_kg,
            params.height_cm, params.colour, params.description,
            params.horse_breed, params.client_name, params.user_id,
            params.status, params.passport_no)

        //posting our parameters to the php which will update our sql database
        Axios.post("http://localhost/php-colicapp/updatehorse.php", (params))
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
        this.setState({ isLoading: false });

        //refresh the window and bring the user back to the dashboard
        window.location.reload();

    }


    //when data changes live on the input form, this function updates the values of our from data
    //this method handles all form changes apart from 'status'
    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        var selectedHorseInfo = this.state.selectedHorseInfo;
        selectedHorseInfo[name] = value;
        this.setState({
            selectedHorseInfo
        });
    }

    //componentWillMount() runs before any other code. The 'get account horses' into array is the first process to be carried out.
    componentWillMount() {
        this.getHorses();

    }





    render() {

        //creating variables to hold the isLoading and selectedHorseInfo states 
        const isLoading = this.state.isLoading;
        const selectedHorseInfo = this.state.selectedHorseInfo;

        //if the isLoading state is true render this
        if (this.state.preload === true || this.state.isLoading === true) {
            return (
                <h1>loading</h1>
            )
        }

        //if not loading render this:
        else

            return (



                <div>
                    <Container>
                        <div>
                            <h1 className="title">UPDATE HORSE</h1>
                        </div>
                        <div className="content">

                            <Form>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Horse Name</Form.Label>
                                        {/* This updates the selectedHorseInfo state as the input value is changed */}
                                        {/* used to update 'horse_name' state */}
                                        <Form.Control
                                            type="text"
                                            name="horse_name"
                                            value={selectedHorseInfo.horse_name}
                                            onChange={this.handleChange}
                                            maxLength="25">
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>Horse Passport Number</Form.Label>
                                        {/* This updates the selectedHorseInfo state as the input value is changed */}
                                        {/* used to update 'passport_no' state */}
                                        <Form.Control
                                            type="text"
                                            name="passport_no"
                                            value={selectedHorseInfo.passport_no}
                                            onChange={this.handleChange}
                                            maxLength="15">
                                        </Form.Control>
                                    </Form.Group>

                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Weight in Kilograms</Form.Label>
                                        {/* This updates the selectedHorseInfo state as the input value is changed */}
                                        {/* used to update 'weight_kg' state */}
                                        <Form.Control
                                            type="text"
                                            value={selectedHorseInfo.weight_kg}
                                            name="weight_kg"
                                            onChange={this.handleChange}
                                            maxLength="3">
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>Height in Centremetres</Form.Label>
                                        {/* This updates the selectedHorseInfo state as the input value is changed */}
                                        {/* used to update 'height_cm' state */}
                                        <Form.Control
                                            type="text"
                                            value={selectedHorseInfo.height_cm}
                                            name="height_cm"
                                            onChange={this.handleChange}
                                            maxLength="3">
                                        </Form.Control>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Horse Colour</Form.Label>
                                        {/* This updates the selectedHorseInfo state as the input value is changed */}
                                        {/* used to update 'colour' state */}
                                        <Form.Control
                                            type="text"
                                            value={selectedHorseInfo.colour}
                                            name="colour"
                                            onChange={this.handleChange}
                                            maxLength="10">
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>Description</Form.Label>
                                        {/* This updates the selectedHorseInfo state as the input value is changed */}
                                        {/* used to update 'description' state */}
                                        <Form.Control
                                            type="text"
                                            value={selectedHorseInfo.description}
                                            name="description"
                                            onChange={this.handleChange}
                                            maxLength="200">
                                        </Form.Control>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Horse Breed</Form.Label>
                                        {/* This updates the selectedHorseInfo state as the input value is changed */}
                                        {/* used to update 'horse_breed' state */}
                                        <Form.Control
                                            type="text"
                                            value={selectedHorseInfo.horse_breed}
                                            name="horse_breed"
                                            onChange={this.handleChange}
                                            maxLength="20">

                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>Client Name</Form.Label>
                                        {/* This updates the selectedHorseInfo state as the input value is changed */}
                                        {/* used to update 'client_name' state */}
                                        <Form.Control
                                            type="text"
                                            value={selectedHorseInfo.client_name}
                                            name="client_name"
                                            onChange={this.handleChange}
                                            maxLength="40">
                                        </Form.Control>
                                    </Form.Group>
                                </Form.Row>



                                <Row>
                                    <Col>
                                        <Button
                                            block
                                            variant="success"
                                            disabled={isLoading}
                                            onClick={!isLoading ? this.updateHorse : null}>
                                            {/* when the horse is successfully updated, the form will refresh redirecting to the dashboard */}
                                            {isLoading ? 'Update Horse Value' : 'Update Horse Values'}
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>

                        </div>

                    </Container>



                </div>









            )
    }
}



export default UpdateHorse;