from selenium import webdriver
from bs4 import BeautifulSoup
import time
import random

title = input("input title : ") # 종목 명 입력

driver = webdriver.Chrome('C:/Users/epicl/Documents/chdr/chromedriver.exe')

url = f'https://coinmarketcap.com/currencies/{title}/historical-data/'
driver.get(url)
time.sleep( random.uniform(2,4) )

html = driver.page_source
soup = BeautifulSoup(html, 'lxml')

driver.implicitly_wait(time_to_wait=5)

trs = soup.select('tr > td')


time.sleep(3)

driver.quit()

info = list()
cat = ['date', 'open', 'high', 'low', 'close', 'vol', 'marcket cap']
# 7개 - date, open, high, low, close, vol, marcket cap

tn = 0
for i in trs:
  if tn%7 == 0:
    if tn == 0:
      temp = dict()
    elif temp['date'] != i.string:
      info.append(temp)
      temp = dict()
    temp[cat[0]] = i.string
  else:
    temp[cat[tn%7]] = i.string
  tn += 1

for i in info:
  print(i)