from turtle import pd
import pandas as pd

df = pd.read_csv('C:/Users/epicl/Documents/GitHub/mongoDB_test/config/fake.CSV', encoding='utf-8',dtype ={
  'greed_fear_score' : float,
  'Open' : float,
  'High' : float,
  'Low' : float,
  'Close' : float,
  'Volume' : float
})

df.to_csv('C:/Users/epicl/Documents/GitHub/mongoDB_test/config/fixedfake.csv',header=True,index=False)
