# HackthonFB

## Requirements
**Install these using**  ```pip install```

> Python3 <br>
> Flask==1.0.2 <br>
> Flask-SQLAlchemy==2.4.0 <br>
> pandas <br>
> Flask-Dance <br>
> wit <br>
> newsapi-python==0.2.6 <br>
> tweepy <br>
> tweet-preprocessor 
<hr><hr>

## To Run Server 
```python -m flask run```  <hr><hr>

## See Live on
<a href="https://curemate.herokuapp.com/" target="_blank">Click here: Cure-Mate</a>

<hr><hr>


![Annotation 2020-09-06 153803](https://user-images.githubusercontent.com/44469087/92323506-03839f00-f057-11ea-9cc3-c631f5cffafa.png)


# Cure-Mate 🏥

### Sentiment analysis of user reviews for particular disease and medicine Using Wit.Ai with Covid-19 Chatbot <br><br>
We are trying to give the user fair information about what others think about that medicine he is using and what other <br> best-rated medicines suggested for this particular disease and User can also compare two Medicines to know the best one.<br>
We are using the UCI drug review dataset for getting reviews having more than 2 million reviews.<br>
We have implemented a chatbot for all your queries on Covid-19 and it works on both **Messenger** and **Telegram**.

<hr><hr>

# Aim 🎯 <br>
Our aim is to give a platform that will be useful for both medical professionals and other Users. On this platform, they can study their situation and medicines, they can easily see the reviews for the work of medicine in that condition, and by our monitoring tool, they can get the latest information about the disease and its medicine. It would be really helpful in these pandemic situations like Covid-19 created. These situations create shortages of medicines. So, through our platform medical professionals and users can easily check alternate best medicine for the same situation and much other information that they need.

<hr><hr>

# Features 🌟

### ▶️Search Box <br>
⌨️ 1.**Typing Search**  <br>
You can normally search through our search box and Suggestions will be provided beneath it for better help to get your desired name.<br>
🎙️ 2.**Voice Search** <br> 
An interactive Voice search option is also available. Just click on the MIC icon to trigger voice search and an interactive modulated voice will help you throughout your search. <br>
### ▶️ Search From<br>
At the bottom of the search box, there is an option of selecting a relevant source **( Ex. UCI Dataset, Twitter, Drug.Com(WIP) and other NewsAPI )** from where data is taken and then broken into tokens and Using WIT.AI inbuilt   NLP and Sentiment Analysis the Sentiment is negative, positive or neutral is taken out and displayed in results.<br>
### ▶️ Sentiment Analysis <br>
We get the relevant data from the user-desired platform and then tokens are generated from the data then Using NLP, Sentiment Analysis with the help of Wit.Ai we get the sentiment in each data and the model predicts the average sentiment of all persons and displays them in results.  <br>
### ▶️ Results <br>
Using Sentiment analysis the results for the medicine and disease are shown as written in the previous section.
Now, in results, we also display other medicines that are rated good for the same disease and the other disease that can be cured by the same medicine. You can also download the result as a pdf softcopy.<br>
We also display the Graph to better understand both **Sentiment Analysis** results and other **best-rated medicines.**
![Annotation 2020-08-30 172213](https://user-images.githubusercontent.com/44469087/91658394-733cdb80-eae5-11ea-86da-bd87745ca1fb.png)
<br><br>
### ▶️ Compare meds <br>
You can navigate to this feature from the main page navbar and then you can compare two of your medicines that you are confused in and you will get the results according to other reviews. The result will be in two forms, side by side **Graph** and **Comparison Table** for the full detailed comparison of both in tabular form. <br>

![Annotation 2020-09-03 180959](https://user-images.githubusercontent.com/44469087/92116890-0d689080-ee12-11ea-92dc-ed324bec3d1f.png)

### ▶️ History <br>
From here you can get all the records for your previous search with date and time, name of medicine, and disease.
You can also see the result again by clicking the **See results** Button.

###  ▶️ Monitoring/Query <br>
You can see what's going on recently or the history of medicine. For the section, the application uses NewsAPI and tweets to show the sentiment of the user changing with the time for that medicine or disease.<br>
Available with both  **⌨️Typing Search** &  **🎙️Voice Search**

![Annotation 2020-09-03 181155](https://user-images.githubusercontent.com/44469087/92116657-bcf13300-ee11-11ea-8ec2-7c65519efe95.png)

###  ▶️ COVID Chatbot <br>
A chatbot to solve all your queries regarding the Covid-19 situation and tries to help you in the best possible ways.
The chatbot works on both **Messenger** and **Telegram**.
![Annotation 2020-09-06 143520](https://user-images.githubusercontent.com/44469087/92323387-e9958c80-f055-11ea-94e7-6ddb5ffb71b8.png)

###  ▶️ Speed <br>
Analyzing 2 million of the dataset in just some seconds. That makes it more User-Friendly and Time-Efficient.

<hr><hr>

# Architecture ⚙️ <br>
This is the overall architecture of our application. on the left side, the red-colored sections are those with which the user interacts and on it right the brief internal working of our application is shown.<br> 
![WhatsApp Image 2020-09-06 at 3 18 46 PM](https://user-images.githubusercontent.com/44469087/92323221-91aa5600-f054-11ea-94fa-3eef580ca462.jpeg)
<hr><hr>

# Details of NLP Model 📚 <br>

### ▶️ About Model <br>
Sentiment Analysis is used on the pre-saved dataset (over 2 million) and the fixed data that is being Scraped from Twitter and Drug.com. Then data is broken into tokens and Using this dataset we train our model over **Wit.ai**, Wit.ai Speech API is also used to make our application voice interactive.  <br>
### ▶️ Model's Accuracy <br>
On running our Model on a pre-stored dataset we get the accuracy of about 85% and when the twitter and drug.com dataset is added accuracy increases to 87.05 %.<br>
### ▶️ Future Updated <br>
This project has a very wide area to which we can explore and we can add many new features in it. For the future, We are thinking of adding a feature to suggest the best Doctors and Best hospitals for the searched medicine. and it can be according to the city of the user and also best in his country By getting user location and Analyzing data from different platforms about the best doctors and hospitals for that disease. <hr><hr>

> # Technology Used 💻<br>

> - <b>Frontend & UI :-</b>    ``` HTML ```     ``` CSS ```   ``` Bootstrap ```    ``` Javascript ```

> - <b>Backend :-</b> ``` Flask ```

> - <b>Database :-</b> ``` PostgreSQL ```

> - <b>Voice intraction :-</b> ``` Annayang.js ```

> - <b>Authentication :-</b> ``` Google Auth0 ```

> - <b>Model :-</b> ``` Wit.ai ```

> - <b>Support for Model :-</b>   ``` NLP ```   ``` UCI ```

<hr><hr>

## Overview 💡 <br>
☐ It helps the user to better understand the medicine he is using and provide helpful feedback.<br>
☐ Deep sentiment analysis is performed for over 2 million datasets.<br>
☐ It has the ability to suggest best-rated medicines for that disease.<br>
☐ It also gives the list of other diseases on which the same medicine works.<br>
☐ Both graphical and statistical representations of data for better understanding.<br>
☐ Feature to download your result in Pdf softcopy.<br>
☐ The history section for all your searched results so you can check anytime and revisit.<br>
☐ Compare the Meds section for knowing the best medicine B/W 2 if you are confused.
<hr><hr>

# Fun Fact 👻<br>
🐬 Our Chotu was pretty hard to handle because he has a great sense of Humor. <br>
🐬 Designing a logo took a lot more time than the development of the platform. 😝
<hr><hr>
