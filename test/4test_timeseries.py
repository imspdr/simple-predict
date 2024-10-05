import requests
import pandas as pd
from bs4 import BeautifulSoup
from prophet import Prophet

code = "005930"
base_url = f'https://finance.naver.com/item/sise_day.naver?code={code}&page='

result_data = []
for i in range(100):
    result = requests.get(base_url + str(i), headers={"User-agent": "Mozilla/5.0"}).text
    soup = BeautifulSoup(result, "html.parser")

    trs = soup.find_all("tr")

    for tr in trs:
        trtxt = str(tr)
        if "gray03" not in trtxt:
            continue

        day = trtxt.split("03\">")[1].split("<")[0]
        price = trtxt.split("p11\">")[1].split("<")[0]
        result_data.append({
            "ds": day,
            "y": int(price.replace(",", ""))
        })

result_data.reverse()
df = pd.DataFrame(result_data)
print(df)
model = Prophet()
model.fit(df)

future = model.make_future_dataframe(periods=20, include_history=False)
forecast = model.predict(future)
print(forecast)