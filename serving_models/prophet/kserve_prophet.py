import logging
from typing import Dict
import pandas as pd
import numpy as np
import kserve
import json
from prophet import Prophet
import requests
from bs4 import BeautifulSoup

def try_or_default(dict, key, default_value):
    try:
        ret = dict[key]
    except KeyError:
        ret = default_value
    return ret

def is_number(v):
    try:
        float(v)
        return True
    except (ValueError, TypeError):
        return False

class NpEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.integer):
            return int(obj)
        elif isinstance(obj, np.floating):
            return float(obj)
        elif isinstance(obj, np.ndarray):
            return obj.tolist()
        elif isinstance(obj, np.bool_):
            return bool(obj)
        else:
            return super(NpEncoder, self).default(obj)

def crawl_data(code):
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
    return result_data

class CustomProphet(kserve.Model):
    def __init__(self, name):
        super().__init__(name)
        self.ready = False
        self.model_name = name

    def load(self) -> bool:
        logging.info("load : use prophet model")
        self.ready = True
        return self.ready

    def predict(self, payload: Dict, headers: Dict[str, str] = None) -> Dict:
        '''
        get predict or train_data
        '''
        params = try_or_default(payload, "params", {})

        do_predict = try_or_default(params, "do_predict", 1)
        periods = try_or_default(params, "periods", 20)
        code = try_or_default(params, "code", "005930")

        if do_predict:
            try:
                given_data = payload["instances"]
            except KeyError:
                return {
                    "predictions": []
                }
            model = Prophet()
            try:
                df = pd.DataFrame(given_data)
                model.fit(df)
                future = model.make_future_dataframe(periods=periods, include_history=False)
                forecast = model.predict(future)
                predictions = []
                for line in forecast.iterrows():
                    newObject = {}
                    for k, v in line[1].items():
                        if not is_number(v):
                            v = str(v)
                        newObject[k] = v
                    predictions.append(newObject)
                result = {
                    "predictions": predictions,
                }
                json_result = json.dumps(obj=result, cls=NpEncoder, indent=4, ensure_ascii=False)
                return json.loads(json_result)

            except Exception as e:
                logging.info(f"prediction failed {e}")
                return {
                    "predictions": []
                }
        else:
            return {
                "predictions": crawl_data(code)
            }
if __name__ == "__main__":
    model = CustomProphet("custom-prophet")
    kserve.ModelServer().start([model])