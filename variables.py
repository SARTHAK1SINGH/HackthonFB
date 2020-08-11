import os
import pandas as pd
## importing dataset using pandas
df_train = pd.read_csv("/home/saurabh/Downloads/HackthonFB/drug_data/drugsComTrain_raw.csv", parse_dates=["date"])
df_test = pd.read_csv("/home/saurabh/Downloads/HackthonFB/drug_data/drugsComTest_raw.csv", parse_dates=["date"])
drug = list(df_train["drugName"])
disease = list(df_train["condition"])
rating = list(df_train["rating"])
review = list(df_train["review"])
userid = list(df_train["uniqueID"])
l = df_train["date"].dt.year
df_train["year"] = l
years = list(df_train["year"])

## removing "90 useRS </span> found it useful on demand of sarthak singh.."
#count = 0
for i in range(len(disease)):
    if("span" in str(disease[i])):
        #print(dieses[i])
        disease[i] = "nothing"
        rating[i] = 0
        review[i] = "Not a review to view"
       
