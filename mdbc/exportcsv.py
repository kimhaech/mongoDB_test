from pymongo import MongoClient
import os
import re
import time
import csv

from requests import post

client = MongoClient("mongodb://localhost:27017/")
print('MongoClient 접속 완료')
# 로컬의 testdb라는 이름의 데이터베이스
db = client['testdb']
print('db 객체 할당 완료')
# testdb의 ctestdata라는 collection에 접근
testcol = db.ctestdata

# 경로
path = 'C:/Users/epicl/Documents/GitHub/mongoDB_test/config'
file_name = 'ethereum-classic.csv'

i = 0
posts = testcol.find()

with open(os.path.join(path, file_name), 'w', newline='', encoding='utf-8-sig') as output:
  csvout = csv.DictWriter(output, ['date', 'open', 'high', 'low', 'close', 'vol', 'marcket cap'])
  csvout.writeheader()
  for p in posts:
    wr = csv.writer(output)
    wr.writerow([p['date'],
    p['open'],
    p['high'],
    p['low'],
    p['close'],
    p['vol'],
    p['marcket cap']
    ])

    i += 1
    if i % 100:
      print("{} finished" .format(i))

print('end!')