from testcrawling import coin_crawl_his as cch

# 종목명 입력
title = input("input the title : ")
testcr = cch(title)

# 크롬드라이버 실행
testcr.startDriver()

# 데이터 불러오기
testcr.load_page_data()

# 태그 값 가져오기
testcr.get_tag()

# 크롤링한 데이터를 데이터 프레임 형식으로 받기
frame = testcr.get_data()

print(frame)

