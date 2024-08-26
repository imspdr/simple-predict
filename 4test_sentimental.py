import ssl

from requests.exceptions import SSLError
from transformers import pipeline
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

'''
기사 크롤링 
'''
import requests
from bs4 import BeautifulSoup

search_name = "삼성전자"
STOKE_KEYWORD = "주가"
base_url = "https://search.naver.com/search.naver?where=news&query="

post_url = "&sm=tab_opt&sort=0&photo=3&field=0&pd=0&ds=&de=&docid=&related=0&mynews=0&office_type=0&office_section_code=0&news_office_checked=&nso=so%3Ar%2Cp%3Aall&is_sug_officeid=0&office_category=0&service_area=0"
result = requests.get(base_url + search_name + STOKE_KEYWORD + post_url).text

soup = BeautifulSoup(result, "html.parser")
newss = soup.find_all("div", class_="news_contents")

classifier = pipeline("text-classification", model="matthewburke/korean_sentiment")
for news in newss:
    try:
        title = str(news).split("title=\"")[1].split("\">")[0].replace("&quot;", "\'")
        news_link = str(news).split("href=\"")[1].split("\"")[0].replace("amp;", "")
        print(title)
        print(classifier(title, return_all_scores=True)[0][1])
    except (TypeError, IndexError):
        continue
