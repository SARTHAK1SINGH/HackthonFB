from flask import Flask,render_template,url_for,request,redirect
import pandas as pd
from statistics import mean
from flask_dance.contrib.google import make_google_blueprint, google
import os



app=Flask(__name__)


app.secret_key = "hope is a good thing"
app.config["GOOGLE_OAUTH_CLIENT_ID"] = "751522856838-8gqi8qv7hqcuut62ljpvjfkablnih7jq.apps.googleusercontent.com"
app.config["GOOGLE_OAUTH_CLIENT_SECRET"] = "WN4v33Mx45sgUifN26p1638k"
google_bp = make_google_blueprint(scope=["profile", "email"])
app.register_blueprint(google_bp, url_prefix="/login")
os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'
os.environ['OAUTHLIB_RELAX_TOKEN_SCOPE'] = '1'


## data preprocessing calculations

df_train = pd.read_csv("/home/saurabh/Downloads/DrugData/drugsComTrain_raw.csv")  ###please please add path for your data files
df_test = pd.read_csv("/home/saurabh/Downloads/DrugData/drugsComTest_raw.csv")
## don't mess with the following code, out of ur reach
df_all = pd.concat([df_train,df_test])

drug = list(df_all["drugName"])
disease = list(df_all["condition"])
rating = list(df_all["rating"])
review = list(df_all["review"])
userid = list(df_all["uniqueID"])
date = list(df_all["date"])
# l = df_all["date"].dt.year
# df_all["year"] = l
# years = list(df_all["year"])

## removing "90 users </span> found it useful on demand of sarthak singh.."
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
		email=resp.json()["name"]
		picture = resp.json()["picture"]
		condition = request.form['condition']
		meds = request.form['drug']
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

		for i in range(len(drug)):
			if(condition == disease[i] and meds == drug[i]):
				suitable_rating.append(rating[i])
				review_with_rating.append((rating[i], review[i]))
				sentiment = "Neutral"
				if(rating[i] >7):
					sentiment = "Positive"
					positive_sentiments += 1
				if(rating[i]<5):
					sentiment = "Negative"
					negative_sentiments +=1
				if(rating[i] >=5 and rating[i] <=7):
					neutral_sentiments +=1
				reviews.append((review[i],date[i], sentiment,rating[i]))

			if(condition == disease[i] and rating[i] > 7):
				suitable_other_meds.append((rating[i], drug[i]))
			if(meds == drug[i] and rating[i] >7):
				suitable_other_desease.append((int(rating[i]),disease[i]))
		if(len(suitable_rating) > 0):
			suitable_rating = mean(suitable_rating)
			suitable_rating = round(suitable_rating, 3)
		else:
			suitable_rating = 0
		suitable_other_desease = list(set(suitable_other_desease))
		suitable_other_meds = list(set(suitable_other_meds))
		suitable_other_desease.sort()
		suitable_other_meds.sort()
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
                           picture = picture)

if __name__=='__main__':
	app.run(debug=True)   ##saurabh's favourite part to discuss in views 

