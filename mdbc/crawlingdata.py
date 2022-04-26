from selenium import webdriver
from bs4 import BeautifulSoup
import time


# title = input("input title : ") # 종목 명 입력

driver = webdriver.Chrome('C:/Users/epicl/Documents/chdr/chromedriver.exe')

url = f'https://coinmarketcap.com/currencies/bitcoin/historical-data/'
driver.get(url)
html = driver.page_source
soup = BeautifulSoup(html, 'lxml')

driver.implicitly_wait(time_to_wait=5)

trs = soup.select('tr > td')

# for i in trs:
#   print(i)

time.sleep(3)

driver.quit()

info = list()
# info['title'] = 'ethereum-classic'
cat = ['date', 'open', 'high', 'low', 'close', 'vol', 'marcket cap']
# 7개 - 날짜, open, high, low, close, vol, marcket cap

tn = 0
for i in trs:
  index = tn%7
  if tn != 0 and index == 0:
    # 제작한 딕셔너리 넣기
    temp['_id'] = tn//7
    print(temp)
    info.append(temp)
  else:
    if index == 0:  # 새로운 딕셔너리 생성
      temp = dict()
      temp[cat[index]] = i.string
    else:
      temp[cat[index]] = i.string
  tn += 1

# print(info)