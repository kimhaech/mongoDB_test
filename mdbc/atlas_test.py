from pymongo import MongoClient
import pandas as pd

cluster = MongoClient("mongodb+srv://dongle:tkfkdgksek1@cluster0.fqkie.mongodb.net/test?retryWrites=true&w=majority")

db = cluster["test"]
collection = db["temps"]

# temp = {
#   "name" : "양파"
# }

# collection.insert_one(temp)


df = pd.read_csv('C:/Users/epicl/Documents/GitHub/mongoDB_test/config/fixedfake.csv',encoding = 'utf-8', dtype = {
    'greed_fear_score': float,
    'date': str,
    'Open': float,
    'High': float,
    'Low': float,
    'Close': float,
    'Volume': float
})

# dataframe의 컬럼 명
cols = df.columns 

for i in range(len(df)):
  temp = {
    cols[0] : df.iloc[i][cols[0]],
    cols[1] : df.iloc[i][cols[1]],
    cols[2] : df.iloc[i][cols[2]],
    cols[3] : df.iloc[i][cols[3]],
    cols[4] : df.iloc[i][cols[4]],
    cols[5] : df.iloc[i][cols[5]],
    cols[6]: df.iloc[i][cols[6]]
  }
  collection.insert_one(temp)
  print(f"{i} add")

print('finish')

