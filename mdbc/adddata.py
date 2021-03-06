from encodings import utf_8
from operator import index
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from bs4 import BeautifulSoup
from pymongo import MongoClient

# 로컬 호스트 클라이언트 불러오기
client = MongoClient("mongodb://localhost:27017/")

# 로컬의 testdb라는 이름의 데이터베이스
db = client['testdb']

# db 목록 출력
# print(client.list_database_names())

# db의 ctestdata라는 콜렉션을 가져옴
testcol = db.ctestdata

# collection 내의 documents 출력
for d in testcol.find():
  print(d)


# s = Service('C:/Users/epicl/Documents/chdr/chromedriver.exe')
# driver = webdriver.Chrome(service=s)
driver = webdriver.Chrome('C:/Users/epicl/Documents/chdr/chromedriver.exe')
url = 'https://coinmarketcap.com/currencies/ethereum-classic/historical-data/'
driver.get(url)
html = driver.page_source
soup = BeautifulSoup(html, 'lxml')

trs = soup.select('tr > td')

info = dict()
# info['title'] = 'ethereum-classic'
cat = ['date', 'open', 'high', 'low', 'close', 'vol', 'marcket cap']
# 7개 - 날짜, open, high, low, close, vol, marcket cap

tn = 0
for i in trs:
  index = tn%7
  if tn != 0 and index == 0:
    # 제작한 딕셔너리 넣기
    temp['_id'] = tn//7
    testcol.insert_one(temp)
  else:
    if index == 0:  # 새로운 딕셔너리 생성
      temp = dict()
      temp[cat[index]] = i.string
    else:
      temp[cat[index]] = i.string
  tn += 1

# -------------------------------------------------------------------------------------------
# data = {
#   'subject' : 'xxxcoin',
#   'inner' : 'damn coin'
# }

# # ctestdata라는 이름의 collection에 data 삽입
# # 해당 이름의 collection이 없는 경우 생성 후 삽입한다.
# dpInsert = db.ctestdata.insert_one(data)
# data = {
#   'subject' : 'tttcoin',
#   'inner' : 'shit coin'
# }

# db.ctestdata.insert_one(data)

# ctestdat collection에서 subject와 inner값을 불러온다
# for i in db['ctestdata'].find():
#   print(i['subject'], i['inner'])

# subject가 tttcoin인 값의 inner 값을 불러온다
# print(db.ctestdata.find_one({'subject':'tttcoin'})['inner'])

# ctestdata에서 inner컬럼 값을 제외하고 불러온다
# for i in db['ctestdata'].find({}, {'inner' : 0}):
#   print(i)


# subject 가 TtT coin인 것에 대해서 inner 값을 damn it!으로 변경
# db['ctestdata'].update_many(
#   {'subject' : 'TtTcoin'},
#   {'$set' : {'inner' : 'damn it!'}}
# )

# for i in db['ctestdata'].find({},{'_id' : 0}):
#   print(i)

# text 컬럼이 존재하는 데이터에 대해서 text컬럼을 모두 삭제
# db['ctestdata'].update_many(
#   {'text' : {'$exists' : True}},
#   {'$unset' : {'text' : True}}
# )

# for i in db['ctestdata'].find():
#   print(i)

# subject 가 TtTcoin인 데이터 모두 삭제
# db['ctestdata'].delete_many({'subject' : 'TtTcoin'})

# for i in db['ctestdata'].find():
#   print(i)
