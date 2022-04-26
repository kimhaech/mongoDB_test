from selenium import webdriver
from bs4 import BeautifulSoup
import time

# 종목 명 입력 후 해당 종목에 대한 모든 historical data를 load 후 크롤링 진행
# dictionary 형태로 각 일자별로 정리한다.


# 7개 - 날짜, open, high, low, close, vol, marcket cap
cate = ['date', 'open', 'high', 'low', 'close', 'vol', 'marcket cap']

# 종목 명 입력
# title = input("input title : ")

driver = webdriver.Chrome('C:/Users/epicl/Documents/chdr/chromedriver.exe')

# 입력한 종목의 historical data 페이지로 chromedriver가 열도록 한다
url = f'https://coinmarketcap.com/currencies/bitcoin/historical-data/'
driver.get(url)

# chromedriver가 접속한 페이지의 소스정보를 가져온다
html = driver.page_source
soup = BeautifulSoup(html, 'lxml')

# 페이지가 로드되는 동안 대기
driver.implicitly_wait(time_to_wait=5)

# tr태그 안의 td태그 값을 가져오도록 한다 -> 각 종목 데이터가 담겨있다.
trs = soup.select('tr > td')



# ind = 0

# info = list() # 각 날짜별 데이터를 가질 리스트

# 각 일자별 데이터 저장
# for i in trs:
#   print(i.string)
#   # 7줄마다 일자가 바뀐다
#   t = ind%7
#   if ind != 0 and t == 0: # 첫번째 값이 아니고 7일차인 경우
#     info.append(temp)
#   else:
#     if t == 0:
#       temp = dict() # 저장하기 위한 딕셔너리 생성
#       temp[cate[t]] = i.string
#     else:
#       temp[cate[t]] = i.string
#   ind += 1
print(trs)
time.sleep(3)

driver.quit()

# for j in range(len(info)):
#   print(info[j])


