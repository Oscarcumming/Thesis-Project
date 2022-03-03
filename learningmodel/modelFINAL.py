
import pandas as pd # data processing, CSV file I/O (e.g. pd.read_csv)


#!import the local datafile used for training
df = pd.read_csv("horse.csv")

#file load check
print ("\nFile Loaded\n")

#See data
print(df.head())
print('\n')

#Show the data type of each column
df.info()




#!Show how much data is missing from our original dataframe (A total of 299 rows)
#!Preprocessing the columns

print('\nMissing Value count in each column')
#get the number of missing data NaN values per column
missing_values_count = df.isnull().sum()

#look at the # of missing points in the  28 columns 
missing_values_count[0:27]

#!Dropping columns having significant number of NaN values
#Those columns with >100 NaN value immediately dropped
df.drop('nasogastric_reflux', axis=1, inplace = True)
df.drop('nasogastric_tube', axis=1, inplace = True)
df.drop('nasogastric_reflux_ph', axis=1, inplace = True)
df.drop('rectal_exam_feces', axis=1, inplace = True)
df.drop('abdomen', axis=1, inplace = True)
df.drop('abdomo_appearance', axis=1, inplace = True)
df.drop('abdomo_protein', axis=1, inplace = True)
print('\nColumns Dropped Successfully!\n')

#Check the total no. of columns and see if they have been dropped - from 28 columns to 21
print(df.head())

#!We need to preprocess the 'outcome' column to numeric data. Currently it is a categorical type.
#prep-process data and change outcome columns to 0,1,2 using label encoder
from sklearn import preprocessing
le = preprocessing.LabelEncoder()
df['outcome'] = le.fit_transform(df.outcome.values)
print('\nOutcomes successfully processed:')
print(df["outcome"])


#!Output the current number of rows in our dataframe
#counting total number of data rows currently
index = df.index

#find length of index
number_of_rows = len(index)

print('\nTotal Number of Rows:')
print(number_of_rows)




#!Several copies of the current preprocessed dataframe are created. --------------------
# The first dataframe df_run01 will be used as is to see how column correlation 
# stands with no further changes and with missing values included.
#This shows how yo ucould process the data with the missing values, but we do not want this.
df_run01 = df.copy()

#The second dataframe will drop the NaN missing values and then run the correlations to
#see how this affect column correlation strength
df_run02 = df.copy()

#We are goign to use the correlation values displayed by the run_02 to inform this dataframe. 
#As run_02 has dropped rows containing NaN values, this gives us a more accurate correlation output.
#It has only been fed non-Nan data. 

# However, as rows are dropped that contain a single NaN value in any column, this can have
#negative consequences on our data quality. A row can be dropped due to rectal_temp having an 
#NaN value. It has the lowest importance to outcome. 
# 
# This means that the otehr columns with the more important data get deleted also.
# You can see how this could quickly add up if there are alot of low importance
# data missing and a lot of high quality present. 
# 
# We want to maximise our small data set with as much hiugh qulity data as possible.
#We will do this by deleting columns that have <0.2 correlative value before we drop NaN.
#This will negate the effects of a low quality missing vlaue deleing a whole row of
#higher quality data.

#We will be using the results found in the correlative test of df_run02.
df_run03 = df.copy()

#df_final will not be encoded and will be a copy of df_run03. This is due to it being
#the dataframe that will be used for our learning model that will be taking real world input.
df_final = df.copy()


print('\nDf copies created\n')
#!This is done to make sure we maintain the highest quality ands highest quantity of learning data
#As there are only 299 rows, we can not be brash with our value deletions.


#RUN_01 ----------------------------------------------------------------------
print('\nProcessing df_run01 :\n')
#Encodes all the data to numeric values - this allows it to be correlated. 
#Can not be run with categorical data type present.
for col in df_run01.columns:
    df_run01[col] = df_run01[col].astype('category').cat.codes

print('\ndf_run01 cat.coded successful\n')

#Finding correlation between features and target variables  
# Categories must be turned into numerical value to appear  
# NUMERICALLY COMPARED

print('\ndf_run01 column outcome correlation :\n')
corr= df_run01.corr()

core = abs(corr.outcome.sort_values(ascending = False))
core.sort_values(ascending = False)



#RUN_02 ------------------------------------------------------------------
print('\nProcessing df_run02 :\n')

#Dropping rows with NaN values before cat coding
df_run02 = df_run02.dropna()
print('\nNan Rows dropped - df_run02 :\n')

#Encodes all the data to numeric values - this allows it to be correlated. 
#Can not be run with categorical data type present.
for col in df_run02.columns:
    df_run02[col] = df_run02[col].astype('category').cat.codes

print('\ndf_run02 cat.coded successful\n')

#Finding correlation between features and target variables  
# Categories must be turned into numerical value to appear  
# NUMERICALLY COMPARED

print('\ndf_run02 column outcome correlation :\n')
corr= df_run02.corr()

core = abs(corr.outcome.sort_values(ascending = False))
core.sort_values(ascending = False)


#See how many rows of data we have
index = df_run02.index
number_of_rows = len(index)
#find length of index

print('\ndf_run02 total rows :\n')
print(number_of_rows)



#RUN_03 ------------------------------------------------------------------
print('\nProcessing df_run03 :\n')

#immediately drop all the columns that are not above 0.2 correlation from run_03
df_run03.drop('age', axis=1, inplace = True)
df_run03.drop('respiratory_rate', axis=1, inplace = True)
df_run03.drop('pain', axis=1, inplace = True)
df_run03.drop('capillary_refill_time', axis=1, inplace = True)
df_run03.drop('peristalsis', axis=1, inplace = True)
df_run03.drop('abdominal_distention', axis=1, inplace = True)
df_run03.drop('hospital_number', axis=1, inplace = True)
df_run03.drop('lesion_2', axis=1, inplace = True)
df_run03.drop('cp_data', axis=1, inplace = True)
df_run03.drop('mucous_membrane', axis=1, inplace = True)
df_run03.drop('rectal_temp', axis=1, inplace = True)
df_run03.drop('lesion_3', axis=1, inplace = True)

#Dropping rows with NaN values before cat coding
df_run03 = df_run03.dropna()
print('\nNan Rows dropped - df_run03 :\n')

#Encodes all the data to numeric values - this allows it to be correlated. 
#Can not be run with categorical data type present.
for col in df_run03.columns:
    df_run03[col] = df_run03[col].astype('category').cat.codes

print('\ndf_run03 cat.coded successful\n')

#Finding correlation between features and target variables  
# Categories must be turned into numerical value to appear  
# NUMERICALLY COMPARED

print('\ndf_run03 column outcome correlation :\n')
corr= df_run03.corr()

core = abs(corr.outcome.sort_values(ascending = False))
core.sort_values(ascending = False)


#See how many rows of data we have
index = df_run03.index
number_of_rows = len(index)
#find length of index

print('\ndf_run03 total rows :\n')
print(number_of_rows)



#FINAL ------------------------------------------------------------------
print('\nProcessing df_final :\n')

#immediately drop all the columns that are not above 0.2 correlation from run_03
df_final.drop('age', axis=1, inplace = True)
df_final.drop('respiratory_rate', axis=1, inplace = True)
df_final.drop('pain', axis=1, inplace = True)
df_final.drop('capillary_refill_time', axis=1, inplace = True)
df_final.drop('peristalsis', axis=1, inplace = True)
df_final.drop('abdominal_distention', axis=1, inplace = True)
df_final.drop('hospital_number', axis=1, inplace = True)
df_final.drop('lesion_2', axis=1, inplace = True)
df_final.drop('cp_data', axis=1, inplace = True)
df_final.drop('mucous_membrane', axis=1, inplace = True)
df_final.drop('rectal_temp', axis=1, inplace = True)
df_final.drop('lesion_3', axis=1, inplace = True)

#Dropping rows with NaN values before cat coding
df_final = df_final.dropna()
print('\nNan Rows dropped - df_final :\n')


#
#get the df_final_dataframe split -assign y to outcome row - For split data
#Iterates over all the columns in the dataframe df and appending the columns 
# (with non-numeric values) to a list categorical.
categoricals = []
for col, col_type in df_final.dtypes.iteritems():
     if col_type == 'O':
          categoricals.append(col)
     

#using one hot encoder .getdummies to process our categorical data into numerical data for our model training.
#A new column is created for each unique categorical value within the columns - for each column/value combiantion
df_ohe = pd.get_dummies(df_final, columns=categoricals, dummy_na=True)

dependent_variable = 'outcome'
x = df_ohe[df_ohe.columns.difference([dependent_variable])]
y = df_ohe[dependent_variable]


#!We will usre SciKit train_test_split to train the data and avoid overfitting
#train_test_split(X, y, train_size=0.*,test_size=0.*, random_state=*)
#To randomly split our data to test both y (outcome data) and X (our input data)
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(x, y, train_size = 0.6, test_size = 0.4, random_state=11)

from sklearn.ensemble import RandomForestClassifier
model = RandomForestClassifier(n_estimators=100, max_depth=5, random_state=1)
model.fit(X_train, y_train)
predictions = model.predict_proba(X_test)
print(predictions)
print(model.score(X_train, y_train))

# # Save your model -pickling
import joblib
joblib.dump(model, 'classifier.joblib')
print("Model dumped!")

#save column number -pickling - this is important to allow our data to be processed
#even if the input data does not contain every possible value/column combination.
#without it, errors would be thrown
model_columns = list(x.columns)
joblib.dump(model_columns, 'model_columns.pkl')



