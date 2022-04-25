from selenium import webdriver
from bs4 import BeautifulSoup
import time


# title = input("input title : ") # 종목 명 입력

driver = webdriver.Chrome('C:/Users/epicl/Documents/chdr/chromedriver.exe')

url = f'https://coinmarketcap.com/currencies/tether/historical-data/'
driver.get(url)
html = driver.page_source
soup = BeautifulSoup(html, 'lxml')

driver.implicitly_wait(time_to_wait=5)

trs = soup.select('tr > td')

for i in trs:
  print(i)

time.sleep(3)

driver.quit()

info = dict()
# info['title'] = 'ethereum-classic'
cat = ['date', 'open', 'high', 'low', 'close', 'vol', 'marcket cap']
# 7개 - 날짜, open, high, low, close, vol, marcket cap

