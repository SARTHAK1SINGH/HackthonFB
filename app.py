from flask import Flask,render_template,url_for, request
from variables import disease, drug, rating, review, userid, years
app=Flask(__name__)


@app.route('/', methods = ['GET', 'POST'] )
def home():
	if request.method == 'GET':
		return render_template("index.html")
	elif(request.method == 'POST'):
		condition = request.form['condition']
		drugs      = request.form['drug']
		d = []
		# for i in my_drugs:
		#     if i == drug:
		#         d.append(my_conditions[i])
		#render_template('result.html', data1, data2, data3)
		for i in range(len(disease)):
			if(disease[i] == condition and rating[i] > 8):
				d.append(drug[i])
		d = list(set(d))
		from statistics import mean 
		medicine = drugs
		Disease = condition
		suitable_rating = []
		user_id = []
		answer = ""
		for i in range(len(drug)):
			if(drug[i] == medicine and disease[i] == Disease):
				suitable_rating.append(rating[i])
				user_id.append(userid[i])
		mean_rating_your_medicine = 0
		if(len(suitable_rating) > 0):
			mean_rating_your_medicine = round(mean(suitable_rating),2)
		else:
			answer = "there is no review for this combination of medicine & condition. "
			print("there is no review for this combination of medicine & condition. ")
		if(mean_rating_your_medicine > 6):
			answer = "Your medicine is suitable for your condition with avarage rating of {}".format(mean_rating_your_medicine) 
			print("Your medicine is suitable with avarage rating of {}".format(mean_rating_your_medicine))
		else:
			answer = "your maedicine is not Suitable for ur condition, don't take it"
			print("your medicine is not suitable for this disease.")
		bar_chart_data = []
		for ii in range(len(suitable_rating)):
			x = {"label": user_id[ii], "y": suitable_rating[ii]}
			bar_chart_data.append(x)		
		return render_template('index.html',d = d, length = len(disease), answer = answer, bar_chart_data = bar_chart_data, suitable_rating = suitable_rating, user_id = user_id)



if __name__=='__main__':
	app.run(debug=True)    

