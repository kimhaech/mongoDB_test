from pymongo import MongoClient
import pandas as pd

cluster = MongoClient("mongodb+srv://dongle:tkfkdgksek1@cluster0.fqkie.mongodb.net/test?retryWrites=true&w=majority")

db = cluster["test"]
collection = db["bitcoin_costs"]



df = pd.read_csv('C:/Users/epicl/Documents/GitHub/mongoDB_test/config/bitcoin.csv',encoding = 'utf-8', dtype = {
    'Greed_Fear_Score': float,
    'date': str,
    'close': float,
    'predict_close': float,
    'vol': float
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
  }
  collection.insert_one(temp)
  print(f"{i} add")

print('finish')

