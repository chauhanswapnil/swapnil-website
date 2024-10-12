# Titanic Disaster Neural Network using Tensorflow and Google Colab and uploading it to Kaggle.

June 26, 2021 

### Setting up Kaggle with Google Colab and uploading the predictions directly from the notebook

In this tutorial we will be making a Deep Learning binary classification neural network model using Tensorflow and train it on the Titanic Disaster Dataset from Kaggle Competitions. We will also look at how to connect Google Colab with Kaggle so that you can do things like download Kaggle datasets and Upload Results from the notebook itself.

### Prerequisites:

*   Google Account
*   Kaggle Account (You can register [here](https://www.kaggle.com/account/login))
*   Basic programming skills in Python
*   Motivation to learn a new thing

### What will be covered in this article


*   Creating a Kaggle API Token
*   Connecting Kaggle with Google Colab Notebook
*   Downloading the Dataset and loading it into Pandas Dataframe
*   Preprocessing the data and getting it ready to load into the model
*   Creating and Training the Model
*   Making Predictions with our trained Model
*   Converting our Predictions into a CSV file
*   Uploading our predictions to Kaggle
*   Tips on what to do next

### 1. Creating a Kaggle API Token

To connect our Kaggle Account with Google Colab we will need to generate an API token.

Go to kaggle.com and signin. After logging in click on the profile icon in the top right and go to ‘Your Account’.

After that scroll down to the API Section and click on ‘ Create New API Token’. This will download a new file called ‘kaggle.json’ on your computer. Keep that file handy.

### 2. Connecting Kaggle with Google Colab Notebook

Now we can make a new Google Colab Notebook. You can do that by going to [https://colab.research.google.com](https://colab.research.google.com) and clicking on create new notebook. We can start coding now.

The first step is to upload the kaggle.json file to our notebook. We will do that with the following code.

```python
from google.colab import files  
files.upload()
```

Click on Choose Files and select the file we downloaded earlier. Once its uploaded you will be able to see ‘kaggle.json’ in the file explorer on the left.

Now we have to connect to kaggle. To do that we have to make a new hidden directory and copy kaggle.json to it. We will do that by running terminal commands. To run terminal commands in colab we prefix the command with exclamation(!) mark.

```python
# Copying kaggle.json to .kaggle directory!mkdir ~/.kaggle  
!cp /content/kaggle.json ~/.kaggle/  
!chmod 600 ~/.kaggle/kaggle.json
```

Run this code and we have connected Google Colab with our Kaggle Account.

### Downloading the Dataset and loading it into Pandas Dataframe

Let’s first join the competiton. You can do this by going to kaggle.com/competions and search Titanic — Machine Learning by Disaster and join that competition. You can read about the competition and look at the dataset directly on the kaggle website.

Now come back to colab and let’s download our dataset.

```bash
# Downloading Titanic Dataset from Kaggle  
!kaggle competitions download -c titanic
```

You can see the downloaded files in the files section on the left. It should look something like this.

Now that our dataset is downloaded, we can start working on it. Let’s start by importing all the required libraries.

```python
import tensorflow as tf  
import matplotlib.pyplot as plt  
import pandas as pd  
import numpy as np
```

We will uses pandas to load our dataset into a pandas DataFrame object.

```python
# Reading test.csv and train.csv  
raw_train = pd.read_csv('train.csv')  
raw_test = pd.read_csv('test.csv')
```

### 4. Preprocessing the data and getting it ready to load into the model

Now that we have our data loaded, we can start processing our data so that we can fit it into our model.

Let’s start by looking at the data.

```python
# Printing the first 5 rows of the data  
raw_train.head()# Description of Training Data  
raw_train.info()
```

We can note that our data has 891 entries and 12 columns. Now we have to preprocess the data. Let’s think now, which of these features are not needed? Name is probably irrelevant as it won’t affect whether someone survived or died. The same way Ticket and Cabin are also not needed. So let’s drop them from both the training and test data.

```python
# Dropping Cabin, Name and Ticket columns from training and test sets  
raw_train = raw_train.drop('Cabin', axis=1)  
raw_train = raw_train.drop('Name', axis=1)  
raw_train = raw_train.drop('Ticket', axis=1)raw_test = raw_test.drop('Cabin', axis=1)  
raw_test = raw_test.drop('Name', axis=1)  
raw_test = raw_test.drop('Ticket', axis=1)
```

Let’s look at the data we printed above. Sex is written as ‘male’ and ‘female’ . Now this would create a problem for the neural network as it won’t be able to work with text. So we will have to convert it into numbers. We can do something called ‘One Hot Encoding’ on it. What this will do is create 2 columns Sex_male and Sex_female. If someone is male they will have male as 1 and female as 0. This way the text data will be remove.

Also look at ‘PClass’ and ‘Embarked’. We can do the same with Embarked as that is also text. We should probably also encoded PClass even though it is in number. Why might we do that? That’s because we don’t want our model to treat as 3>2. We want it to treat it as 3 or 2. PClass is a categorical data. And we generally One hot encode all the categorical data.

We will do the encoding on both training and test data.

```python
# One Hot Encoding Sex, Embarked and PClass in both training and test sets
raw_train = pd.get_dummies(raw_train, columns=["Sex", "Embarked", "Pclass"])
raw_test = pd.get_dummies(raw_test, columns=["Sex", "Embarked", "Pclass"])
```

This how our dataset looks now.

Now we have to do normalisation. Normalisation is basically converting all numerical columns so that the maximum value is 1 and the minimum value is 0. We do that by simply dividing by the maximum value. We do it because normalizing the data generally speeds up learning and leads to faster convergence.

```python
# Normalising Age, SibSp, Fare and Parch in both Training and Test Data
raw_train["Age"] = raw_train["Age"]/raw_train["Age"].max()  
raw_train["SibSp"] = raw_train["SibSp"]/raw_train["SibSp"].max()  
raw_train["Fare"] = raw_train["Fare"]/raw_train["Fare"].max()  
raw_train["Parch"] = raw_train["Parch"]/raw_train["Parch"].max()
raw_test["Age"] = raw_test["Age"]/raw_test["Age"].max()  
raw_test["SibSp"] = raw_test["SibSp"]/raw_test["SibSp"].max()  
raw_test["Fare"] = raw_test["Fare"]/raw_test["Fare"].max()  
raw_test["Parch"] = raw_test["Parch"]/raw_test["Parch"].max()
```

This is how our data looks now.

Now we need to check if our data has any missing values.

```python
#Checking the total missing values in training data
raw_train.isnull().sum()
```

As you can see there are 177 missing values in age. We can either remove those rows or put in median or mean of the values. We will put mean of ages here.

```python
# There is a lot of missing values in Age  
# We will replace it with the mean age  
raw_train['Age'] = raw_train['Age'].fillna(raw_train['Age'].mean())
```

Wonderful now there is no missing values.

We also don’t need PassengerId in the training data. So let’s drop it.

```python
# Dropping the Passenger ID Column as it is not needed in training
raw_train = raw_train.drop('PassengerId', axis=1)
```

Amazing. Now our data is ready. Let’s make X_train and y_train to give to our model.

```python
# Making X_train and y_train
X_train = raw_train.drop("Survived", axis=1)  
y_train = raw_train["Survived"]
```

### 5. Creating and Training the Model

We are now ready to create the model and train it.

We are creating a Sequential Model with 4 layers. The activation function we will use for the hidden layers is relu and for the output layer is sigmoid.

We will use Adam Optimizer and metrics will be accuracy.

Since it is binary classification, the loss function will be Binary Crossentropy.

You can read about the details what everything is on Tensorflow Docs.

```python
# MODEL
# 1. Create the model
model = tf.keras.Sequential([  
tf.keras.layers.Dense(12, activation="relu"),  
tf.keras.layers.Dense(8, activation="relu"),  
tf.keras.layers.Dense(4, activation="relu"),  
tf.keras.layers.Dense(1, activation="sigmoid")  
])
# 2. Compile the Model
model.compile(loss=tf.keras.losses.BinaryCrossentropy(), optimizer=tf.keras.optimizers.Adam(learning_rate=0.01), metrics=["accuracy"])
# 3. Fit the Model
history = model.fit(X_train, y_train, epochs = 250)
```

Running the code will train our model. We are doing 250 epochs. Give it a second to run.

As you can see, we got an accuracy of around 85% while training. That’s pretty good.

We can plot the loss and accuracy to see how they changed.

```python
# Plotting the Loss and Accuracy over 250 epochs
pd.DataFrame(history.history).plot(title="Loss and Accuracy")
```

That seems good to me. Hint: Looking at the data we can see that our accuracy and loss has remained pretty stagnant after around a 100 epochs. If you want you can change the number of epochs to 100.

6. Making Predictions with our trained Model

Now that we have our model we can make predictions on it. First let’s clean up our test data.

```python
# Drop the Passenger id and store it in a new variable
X_test = raw_test.drop("PassengerId", axis=1)  
PassengerId = raw_test["PassengerId"] # X_test still has some missing data  
X_test.isnull().sum()
```

X_test still has some missing data. We need to fix it. Let’s input mean of age as the value of missing age’s.

```python
# Putting Mean of Age and Fare
X_test['Age'] = X_test['Age'].fillna(X_test['Age'].mean())  
X_test['Fare'] = X_test['Fare'].fillna(X_test['Fare'].mean())
```

Now that we don’t have any missing data. We are ready to predict. Yayyy!!

We pass X_test into our model and that will give us probabilities. We will then We will do it like this

```python
# X_test is now ready to go into the model and give us the predictions
y_probs = model.predict(X_test) # probs is prediction probabilities
# Converting all prediction probabilities to integers
y_preds = y_probs.round()
```

Now that we have our predictions, let’s create the dataframe in the format we need to upload on Kaggle.

```python
# We now have the predictions on the test data
# Let's create a gender_submission.csv as mentioned in the Kaggle Website
output_df = pd.DataFrame(data=PassengerId, columns=["PassengerId"])  
output_df["Survived"] = y_preds.astype(int)
```

### 7. Converting our Predictions into a CSV file

We need to convert our ‘output_df’ to a csv file to upload it to kaggle. The format of the required file is same as ‘gender_submission.csv’ that got downloaded as the part of the dataset. You can open and look at the file.

Let’s make csv now:

```python
# Converting the data frame to csv for uploading to Kaggle
output_df.to_csv('gender_submission.csv',index=False)
```

This will give us a csv file named ‘gender_submission.csv’. It contains all our predictions and is now ready to be uploaded.

### 8. Uploading our predictions to Kaggle

Now that we have our csv file you can just download it and upload it through the kaggle website. But that’s too boring and time consuming. So let’s do it through code.

```shell
# Submitting the csv file we created to Kaggle Competition!
kaggle competitions submit -c titanic -f /content/gender_submission.csv -m Submission_1
```

Yep. That’s it. Our Predictions are uploaded to the kaggle website.

Let’s go to the website and see how we did.

A score of 77%. Hmm. It’s not amazing but it works I guess.

30290 rank. Sheeesh! That’s terrible. Keep reading to see how you can improve it!

### 9. Tips on what to do next

Okay so we made a model and uploaded it. Now, since we are not satisfied with the results, we want to improve it.

So, How can we improve it? While making this model we did many straightforward things and didn’t really dove deep into anything. I will give you some points on how we can improve the accuracy of the model.

### In the data preprocessing steps we can do things like:

*   We can apply feature engineering and look at how different features affect the survival rate. We can do that by plotting features vs survival graphs and understand them more.
*   We can engineer new features using the existing feature. For example: Using sibsp and parch features which are pretty useless alone but we can make a new feature called “Single or not” which will be 1 if someone is single and 0 if someone is not single. This new feature might give our model more insights into the data. We can think of more such ideas and make new relevant features.
*   In this model we did not create any evaluation set. We should ideally divide the training data and see how our model does on unseen data before making predictions using it.
*   You can read [this](https://towardsdatascience.com/data-preprocessing-concepts-fa946d11c825) article and learn more about Data Preprocessing.

### Tuning the Hyper Parameters

We can try changing the learning rate, loss function, optimiser, increase or decrease the number of Neurons, increase or decrease the number of hidden layers, change the activation function or change the number of epochs.

We have to try multiple combinations of the above things and see what works best for our model. This is also why we need an evaluation set on which we can test our model before doing the real predictions.

You can look at other people’s Titanic Disaster Code at [https://www.kaggle.com/c/titanic/code](https://www.kaggle.com/c/titanic/code)

You can download the code for this tutorial [here](https://github.com/chauhanswapnil/titanic-disaster-nn)

Follow me on [**twitter**](https://twitter.com/swapstar) to know me

Reach out on [**LinkedIn**](https://www.linkedin.com/in/chauhanswapnil/)

