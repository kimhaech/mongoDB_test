from tokenize import String
from turtle import pd
import pandas as pd

df = pd.read_csv('C:/Users/epicl/Documents/GitHub/mongoDB_test/config/temp.CSV', encoding='utf-8',dtype ={
  'greed_fear_score' : float,
  'date' : str,
  'Open' : float,
  'High' : float,
  'Low' : float,
  'Close' : float,
  'Volume' : float
})

df.to_csv('C:/Users/epicl/Documents/GitHub/mongoDB_test/config/fixedfake.csv',header=True,index=False)
