import requests
import json
from bs4 import BeautifulSoup

base_url = "https://finance.naver.com/sise/entryJongmok.nhn?&page="

return_list = []
for i in range(20):
    result = requests.get(base_url + str(i + 1)).text
    soup = BeautifulSoup(result, "html.parser")
    stocks = soup.find_all("td", class_="ctg")
    for stock in stocks:
        try:
            code = str(stock).split("code=")[1].split("\"")[0]
            name = str(stock).split("ent\">")[1].split("<")[0]
            return_list.append({
                "code": code,
                "name": name
            })
        except TypeError:
            continue

with open("frontend/src/store/kospi200.json", "w", encoding="utf-8") as result_file:
    json.dump(return_list, result_file, ensure_ascii=False)