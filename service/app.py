from flask import Flask,  request, jsonify, make_response
from flask_restplus import Api, Resource, fields
import joblib
import pandas as pd


# Reference is taken from : https://towardsdatascience.com/create-a-complete-machine-learning-web-application-using-react-and-flask-859340bddb33
# This template is reversed engineered to suit our application needs


#standard FLASK naming convention
flask_app = Flask(__name__)
#API infomation - what is returned when the url is visted
app = Api(app = flask_app, 
		  version = "1.0", 
		  title = "Colic Predictor", 
		  description = "Predict results using a trained model")

name_space = app.namespace('prediction', description='Prediction APIs')

#Parameters to be expected by our prediction API
model = app.model('Prediction params', 
				  {
				 	
				  	'packed_cell_volume': fields.Float(required = True, 
				  							   description="Packed Cell Volume", 
    					  				 	   help="Packed Cell Volume cannot be blank"),
				   	'pulse': fields.Float(required = True, 
				  							   description="Pulse", 
    					  				 	   help="Pulse cannot be blank"),
					'surgical_lesion': fields.String(required = True, 
				  							   description="Surgical Lesion", 
    					  				 	   help="Surgical Lesion cannot be blank"),
					'temp_of_extremities': fields.String(required = True, 
				  							   description="Temperature of Extremities", 
    					  				 	   help="Temperature of Extremities cannot be blank"),
					'total_protein': fields.Float(required = True, 
				  							   description="Total Protein", 
    					  				 	   help="Total Protein cannot be blank"),
					'peripheral_pulse': fields.String(required = True, 
				  							   description="Peripheral Pulse", 
    					  				 	   help="Peripheral Pulse cannot be blank"),
					'lesion_1': fields.Integer(required = True, 
				  							   description="Lesion 1", 
    					  				 	   help="Lesion 1 cannot be blank"),
					'surgery': fields.String(required = True, 
				  							   description="Surgery", 
    					  				 	   help="Surgery cannot be blank")})

#importing the pickeld files for prediction
classifier = joblib.load('classifier.joblib')
model_columns = joblib.load('model_columns.pkl')

#Registering a rule for routing incoming requests - name_space is definted above as /prediction
@name_space.route("/")
class MainClass(Resource):

	#method inputing an instance of itself - returning the output of the lower prediciton model
	#FLASK make_repsonse() is the response object used by default
	def options(self):
		response = make_response()
		response.headers.add("Access-Control-Allow-Origin", "*")
		response.headers.add('Access-Control-Allow-Headers', "*")
		response.headers.add('Access-Control-Allow-Methods', "*")
		return response

	#declared API is to expect the app.model JSON formated data above
	@app.expect(model)		
	def post(self):
		try: 
			#.request gives us access to incoming data. This is the form data that is going to
			#be sent from our front end web app
			formData = request.json
			print("JSON string = ", formData)
			#for json to be turned into dataframe, it has to be given an index
			df = pd.DataFrame(formData, index=[0])
			
			#the incoming data comes in as a string. The numeric values must be parsed to the
			#correct type that our exported model is expecting otherwise it will throw errors
			df ['packed_cell_volume'] = df ['packed_cell_volume'].astype(float)
			df ['pulse'] = df ['pulse'].astype(float)
			df ['total_protein'] = df ['total_protein'].astype(float)
			df ['lesion_1'] = df ['lesion_1'].astype(int)
			
			#assigning the encoded dataframe to query.
			query = pd.get_dummies(df) 
			#reindex and allow for missing data when inputting into our prediction model
			#fill_valueis used to fill existing missing (NaN) values, and any new element needed 
			# for successful DataFrame alignment, with this value before computation.
			query = query.reindex(columns=model_columns, fill_value=0)
			print(query)

			#put query (the incoming dataframe from app) into our imported probability model
			prediction = list(classifier.predict_proba(query))
			print(prediction)	
			#the predict_proba returns a total value of porbaility split from 10. 
			# This means a 55% chance is 5.5. This is easilt solved by multiplication.
			#We obtain survival probabiltty from the 2d array. row 0, column 2.
			percentlive = prediction[0][2]*100
			#chance it to a straight and more usueful int value
			percentlive = int(percentlive)
			#then parse to a string to be returned and process by the front end
			percentlive = str(percentlive)
			print(percentlive)

			#the API response sent back to the app 
			response = jsonify({
				"statusCode": 200,
				"status": "Prediction made",
				"result": percentlive
				})
			response.headers.add('Access-Control-Allow-Origin', '*')
			return response
		except Exception as error:
			return jsonify({
				"statusCode": 500,
				"status": "Could not make prediction",
				"error": str(error)
			})