from flask import Flask,render_template,url_for,request,redirect
import pandas as pd
from statistics import mean
from flask_dance.contrib.google import make_google_blueprint, google
import os
from wit import Wit
from io import StringIO

from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from newsapi import NewsApiClient

import tweepy
from tweepy import OAuthHandler
 
# Your Twittter App Credentials
consumer_key = "IaP4pd9lH0TEkHywsdiYqEMMb"
consumer_secret = "qvM0Q98xsjsspbO9ayVeiWjkaH4rRSMiRffYctZxeY7bGiKNR8"
access_token = "1300109435822505985-4xuf3g1dvlvfz4Dgr41Wnx4vuxjUA4"
access_token_secret = "P3qhYgLemyMJXZgHN7FTrLDg1ShzNfDvDwbBRmTH9BJDW"
 
# Calling API
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth)
 


'''
# data preprocessing part, adding for understanding ... not your job
# from bs4 import BeautifulSoup
# import nltk
# from nltk.corpus import stopwords
# from nltk.stem.snowball import SnowballStemmer
# \r\n : we need to convert html grammer
# ... , ' : deal with not alphabet
# this is most shit part, but have to do it
# stemmer = SnowballStemmer('english')
# def review_to_words(raw_review):
#     # 1. Delete HTML 
#     review_text = BeautifulSoup(raw_review, 'html.parser').get_text()
#     # 2. Make a space
#     letters_only = re.sub('[^a-zA-Z]', ' ', review_text)
#     # 3. lower letters
#     words = letters_only.lower().split()
#     # 5. Stopwords 
#     meaningful_words = [w for w in words if not w in stops]
#     # 6. Stemming
#     stemming_words = [stemmer.stem(w) for w in meaningful_words]
#     # 7. space join words
#     return( ' '.join(stemming_words))
# Almost died in writing this line ;)
# %time df_train['review'] = df_train['review'].apply(review_to_words)
# CPU times: user 5min 33s, sys: 1.66 s, total: 5min 35s
# Wall time: 5min 40s
'''


app=Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
db = SQLAlchemy(app)

#newsapi
newsapi = NewsApiClient(api_key='d81b895c895046279bfbbcad8be288ac')

# /v2/top-headlines



class History(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	email = db.Column(db.String(200), nullable=False)
	name = db.Column(db.String(200), default="Sundaram Dubey")
	condition = db.Column(db.String(200), default="Heart Atack")
	medicine = db.Column(db.String(200), default="apirin")
	date_create = db.Column(db.DateTime, default=datetime.utcnow)

	def __repr__(self):
		return "<task %r> " % self.id

db.create_all()

client = Wit("Y6XVDB4EY4K7RC2QMWAWXQSAZDOR2NOM")

app.secret_key = "Remember hope is a good thing maybe the best of the things and no good thing ever dies"
app.config["GOOGLE_OAUTH_CLIENT_ID"] = "751522856838-vm3cp81av9cbi83ucp454vumhv4ud3bg.apps.googleusercontent.com"
app.config["GOOGLE_OAUTH_CLIENT_SECRET"] = "D3l7vOlgoKPsB_MtgGFWmJcm"
google_bp = make_google_blueprint(scope=["profile", "email"])
app.register_blueprint(google_bp, url_prefix="/login")
os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'
os.environ['OAUTHLIB_RELAX_TOKEN_SCOPE'] = '1'

# https://drive.google.com/file/d/11w3B_ni4u2LvK4OPQ07cS3yeCgIl7re5/view?usp=sharing
## you won't get it, so don't try to understand, it's complicated..


url1 = 'https://drive.google.com/file/d/11w3B_ni4u2LvK4OPQ07cS3yeCgIl7re5/view?usp=sharing'
path1 = 'https://drive.google.com/uc?export=download&id='+url1.split('/')[-2]

url2 = 'https://drive.google.com/file/d/18oXt6odrqNYHGL6cCWltX0DKFahes_gu/view?usp=sharing'
path2 = 'https://drive.google.com/uc?export=download&id='+url2.split('/')[-2]


df_train = pd.read_csv(path1)
df_test = pd.read_csv(path2)


## don't mess with the following code, out of ur reach
df_all = pd.concat([df_train,df_test])

## Not proud of myself after doing this, but it worked..
drug = list(df_all["drugName"])
disease = list(df_all["condition"])
rating = list(df_all["rating"])
review = list(df_all["review"])
userid = list(df_all["uniqueID"])
date = list(df_all["date"])
usefulCount = list(df_all["usefulCount"])
# l = df_all["date"].dt.year
# df_all["year"] = l
# years = list(df_all["year"])

## removing "90 useRS </span> found it useful on demand of sarthak singh.."
#count = 0
for i in range(len(disease)):
    if("span" in str(disease[i])):
        #print(dieses[i])
        disease[i] = "nothing"
        rating[i] = 0
        review[i] = "Not a review to view"


@app.route('/', methods =['GET', 'POST'])
def home():
	if(request.method == 'GET'):
		is_active = True
		if not google.authorized:
			is_active = False
		try:
			resp = google.get("/oauth2/v1/userinfo")
			assert resp.ok, resp.text
		except:  # or maybe any OAuth2Error
			return render_template("index.html", is_active = is_active)

		redirect_url = url_for("google.login")
		resp = google.get("/oauth2/v1/userinfo")
		name=resp.json()["name"]
		picture=resp.json()["picture"]
		return render_template("index.html", redirect_url= redirect_url, is_active = is_active, name = name, picture=picture)
	else:
		if not google.authorized:
			return redirect(url_for("google.login"))
		resp = google.get("/oauth2/v1/userinfo")
		name=resp.json()["name"]
		email=resp.json()["email"]
		picture = resp.json()["picture"]
		condition = request.form['condition']
		meds = request.form['drug']
		new_history = History(email=email, name=name, condition=condition, medicine=meds)
		try:
			db.session.add(new_history)
			db.session.commit()
		except:
			return "there was an error in adding your task"

		search_disease = condition
		search_medicine = meds
		suitable_rating = []
		suitable_other_meds = []
		suitable_other_desease = []
		reviews = []
		review_with_rating = []
		negative_sentiments = 0
		positive_sentiments = 0
		neutral_sentiments = 0
		suitable_other_meds_name=[]
		suitable_other_meds_rating=[]
		for i in range(len(drug)):
			if(str(condition).lower() == str(disease[i]).lower() and str(meds).lower() == str(drug[i]).lower()):
				suitable_rating.append(rating[i])
				review_with_rating.append((rating[i], review[i]))
				review_msg = client.message(review[i][:280])
				sentiment = ""
				score = 1
				#print(review_msg["traits"]['wit$sentiment'])
				if(review_msg["traits"] != {}):
					if(review_msg["traits"]["wit$sentiment"][0]["value"] == 'positive'):
						sentiment = "Positive"
						positive_sentiments += 1
						score = review_msg["traits"]["wit$sentiment"][0]["confidence"]
					if(review_msg["traits"]["wit$sentiment"][0]["value"] == 'negative'):
						sentiment = "Negative"
						negative_sentiments +=1
						score = review_msg["traits"]["wit$sentiment"][0]["confidence"] * (-1)
					if(review_msg["traits"]["wit$sentiment"][0]["value"] == 'neutral'):
						sentiment = "Neutral"
						neutral_sentiments +=1
						score = review_msg["traits"]["wit$sentiment"][0]["confidence"] * 0
					reviews.append((review[i],date[i], sentiment,score))

			if(str(condition).lower() == str(disease[i]).lower() and rating[i] > 7):
				suitable_other_meds_name.append(drug[i])
				suitable_other_meds_rating.append(rating[i])
				suitable_other_meds.append((rating[i], drug[i]))
			if(str(meds).lower() == str(drug[i]).lower() and rating[i] >7):
				suitable_other_desease.append((int(rating[i]),disease[i]))
		if(len(suitable_rating) > 0):
			suitable_rating = mean(suitable_rating)
			suitable_rating = round(suitable_rating, 3)
		else:
			suitable_rating = 0
		suitable_other_desease = list(set(suitable_other_desease))
		suitable_other_meds = list(set(suitable_other_meds))
	#	suitable_other_desease.sort()
	#	suitable_other_meds.sort()
		suitable_other_desease = suitable_other_desease[::-1]
		suitable_other_meds =suitable_other_meds[::-1]
		if(len(suitable_other_desease) > 10):
			suitable_other_desease = suitable_other_desease[:10]
		if(len(suitable_other_meds) > 10):
			suitable_other_meds = suitable_other_meds[::10]
		review_with_rating.sort()
		most_positive_review = "None"
		most_negative_review="None"
		if(len(review_with_rating) > 0):
			most_negative_review = review_with_rating[0][1]
			most_positive_review = review_with_rating[-1][1]
		total_sentiments = neutral_sentiments +positive_sentiments+negative_sentiments
		if(total_sentiments > 0):
			positive_sentiments = (positive_sentiments / total_sentiments)*100
			negative_sentiments = (negative_sentiments/ total_sentiments)*100
			neutral_sentiments = (neutral_sentiments/total_sentiments) * 100
			positive_sentiments= round(positive_sentiments,2)
			neutral_sentiments = round(neutral_sentiments,2)
			negative_sentiments = round(negative_sentiments,2)

		p=[positive_sentiments,negative_sentiments,neutral_sentiments]
		if len(suitable_other_meds_name) >5 :
			suitable_other_meds_name=suitable_other_meds_name[:5]
		if len(suitable_other_meds_rating) >5 :
			suitable_other_meds_rating=suitable_other_meds_rating[:5]
		# print(suitable_other_meds_name)
		# print(suitable_other_meds_rating)
		return render_template("result.html",
                           total_sentiments=total_sentiments, 
                           search_disease = search_disease, 
                           most_positive_review=most_positive_review,
                           most_negative_review=most_negative_review,
                           reviews=reviews,
                           suitable_other_meds=suitable_other_meds,
                           suitable_other_desease=suitable_other_desease, 
                           suitable_rating=suitable_rating,
                           search_medicine=search_medicine,
                           positive_sentiments=positive_sentiments,
                           negative_sentiments= negative_sentiments,
                           neutral_sentiments=neutral_sentiments,
                           email = email,
                           picture = picture,
						   p=p,
                           suitable_other_meds_name=suitable_other_meds_name,
                           suitable_other_meds_rating=suitable_other_meds_rating)

@app.route("/history")
def history():
	if not google.authorized:
		return redirect(url_for("google.login"))
	resp = google.get("/oauth2/v1/userinfo")
	name=resp.json()["name"]
	email=resp.json()["email"]
	picture = resp.json()["picture"]
	tasks = History.query.filter_by(email=email)
	tasks = sorted(tasks, key = lambda i: i.date_create, reverse=True)
	return render_template("history.html", tasks = tasks, picture = picture)


@app.route("/profile")
def profile():
	if not google.authorized:
		return redirect(url_for("google.login"))
	resp = google.get("/oauth2/v1/userinfo")
	name=resp.json()["name"]
	email=resp.json()["email"]
	picture = resp.json()["picture"]
	return render_template('profile.html', name=name, email=email, picture=picture)

"""
@app.route("/explore",methods=['GET','POST'])
def  explore():
	if request.method == 'POST':
		search_word=request.form['search_query']
		print(search_word)
		top_headlines = newsapi.get_everything(q=search_word,sort_by='relevancy',           
                                          language='en',)
		count_of_headlines=top_headlines['totalResults']
		count_of_headlines=int(count_of_headlines)
		title_list=[]
		description_list=[]
		urls_headlines=[]
		for headline in top_headlines['articles']:
			title_list.append(headline['title'])
			description_list.append(headline['description'])
			urls_headlines.append(headline['url'])
		total_elements=len(title_list)
		print(total_elements)
		
		return render_template('explore.html',title_list=title_list,description_list=description_list,
			urls_headlines=urls_headlines,total_elements=total_elements)
	else:
		return render_template("explore.html",nm="saurabh")
			
"""


import datetime
import preprocessor
@app.route("/explore",methods=['GET','POST'])
def  explore():
    if request.method == 'POST':
        search_word=request.form['search_query']
        startfrom = request.form['startfrom']
        startfrom = str(startfrom)
        startfrom_twitter = startfrom
        entered_date = startfrom.split("-")
        current_time = datetime.datetime.now()
        print(startfrom)
        if(int(entered_date[0])!= int(current_time.year) or int(entered_date[1]) != int(current_time.month)):
            startfrom = str(current_time.year) + "-0" + str(current_time.month) + "-" + "01"
        top_headlines = newsapi.get_everything(q=search_word,sort_by='relevancy',           
                                language='en',from_param=str(startfrom))
        count_of_headlines=top_headlines['totalResults']
        count_of_headlines=int(count_of_headlines)
        title_list=[]
        description_list=[]
        urls_headlines=[]
        keyword = search_word
        ##twitter tweets
        tweets = api.search(keyword, count=50, lang='en', exclude='retweets',tweet_mode='extended', since=startfrom_twitter)
        tweet_sentiments = []
        for i in tweets:
            review_msg = client.message(i.full_text[:280]) 
            if(review_msg["traits"] != {}):
                processed_tweet = preprocessor.clean(i.full_text)
                tweet_sentiments.append([processed_tweet, review_msg["traits"]["wit$sentiment"][0]["value"]])
        for headline in top_headlines['articles']:
            title_list.append(headline['title'])
            description_list.append(headline['description'])
            urls_headlines.append(headline['url'])


        total_elements=[]
        for i in range(len(title_list)):
            total_elements.append(i)
        print(total_elements)

        return render_template('explore.html',title_list=title_list,description_list=description_list,
        urls_headlines=urls_headlines,total_elements=total_elements, tweets = tweets, tweet_sentiments=tweet_sentiments)

    else:
        return render_template("explore.html")









@app.route("/compare", methods =['GET', 'POST'])
def compare():
	show_graph = False
	if(request.method == 'GET'):
		return render_template('compare.html', show=show_graph)
	else:
		show_graph = True
		med1 = request.form["med1"]
		med2 = request.form["med2"]
		positive1 = 0
		negative1 = 0
		neutral1 = 0
		positive2 = 0
		negative2 = 0
		neutral2 = 0
		usefulCount1 = 0
		usefulCount2 = 0
		most_positive_review1 = "None"
		most_negative_review1 = "None"
		most_positive_review2 = "None"
		most_negative_review2 = "None"
		side_effect1 ="everything"
		side_effect2 = "sideefft hi side effect"
		max_rating_1 = 0
		max_rating_2 = 0
		for i in range(len(drug)):
			if(drug[i] == med1):
				review_msg = client.message(review[i][:280])
				usefulCount1 += usefulCount[i]
				if(rating[i] > max_rating_1):
					max_rating_1 = rating[i]
				if(review_msg["traits"] != {}):
					if(review_msg["traits"]["wit$sentiment"][0]["value"] == 'positive'):
						positive1 += 1
						most_positive_review1 = review[i]
						score = review_msg["traits"]["wit$sentiment"][0]["confidence"]
					if(review_msg["traits"]["wit$sentiment"][0]["value"] == 'negative'):
						negative1 +=1
						most_negative_review1 = review[i]
						score = review_msg["traits"]["wit$sentiment"][0]["confidence"] * (-1)
					if(review_msg["traits"]["wit$sentiment"][0]["value"] == 'neutral'):
						neutral1 +=1
						score = review_msg["traits"]["wit$sentiment"][0]["confidence"] * 0
			if(drug[i] == med2):
				if(rating[i] > max_rating_2):
					max_rating_2 = rating[i]
				review_msg = client.message(review[i][:280])
				usefulCount2 += usefulCount[i]
				if(review_msg["traits"] != {}):
					if(review_msg["traits"]["wit$sentiment"][0]["value"] == 'positive'):
						positive2 += 1
						most_positive_review2 = review[i]
						score = review_msg["traits"]["wit$sentiment"][0]["confidence"]
					if(review_msg["traits"]["wit$sentiment"][0]["value"] == 'negative'):
						negative2 +=1
						most_negative_review2 = review[i]
						score = review_msg["traits"]["wit$sentiment"][0]["confidence"] * (-1)
					if(review_msg["traits"]["wit$sentiment"][0]["value"] == 'neutral'):
						neutral2 +=1
						score = review_msg["traits"]["wit$sentiment"][0]["confidence"] * 0
			
			med1_data = [positive1, negative1, neutral1]
			med2_data = [positive2, negative2, neutral2]

		return render_template('compare.html',
							show=show_graph,
							med1_data = med1_data,
							med2_data = med2_data,
							med1= med1, med2=med2,
							most_negative_review1 = most_negative_review1,
							most_positive_review1=most_positive_review1,
							most_positive_review2=most_positive_review2,
							most_negative_review2=most_negative_review2,
							usefulCount1=usefulCount1,
							usefulCount2=usefulCount2,
							max_rating_1=max_rating_1,
							max_rating_2=max_rating_2)

if __name__=='__main__':
	app.run(debug=True)    

# I AM IRON-MAN
