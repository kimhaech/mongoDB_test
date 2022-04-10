from lib2to3.pgen2 import driver
from selenium import webdriver

driver = webdriver.Chrome('/Users/epicl/Documents/mtest/chromedriver')

driver.get('https://finance.naver.com/')