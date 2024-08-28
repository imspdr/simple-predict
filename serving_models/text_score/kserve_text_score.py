import json
import logging
from typing import Dict

import numpy as np
import kserve
import requests
from transformers import pipeline
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

class CustomTransformer(kserve.Model):
    def __init__(self, name: str):
        super().__init__(name)
        self.ready = False
        self.model_name = name
        self.model = None

    def load(self) -> bool:
        logging.info(f"use predefined text scoring model")

        self.model = pipeline("text-classification", model="matthewburke/korean_sentiment")
        self.ready = True
        return self.ready

    def predict(self, payload: Dict, headers: Dict[str, str] = None) -> Dict:
        params = try_or_default(payload, "params", {})
        search_name = try_or_default(params, "search_name", "삼성전자")
        base_url = "https://search.naver.com/search.naver?where=news&query="
        post_url = "&sm=tab_opt&sort=0&photo=3&field=0&pd=0&ds=&de=&docid=&related=0&mynews=0&office_type=0&office_section_code=0&news_office_checked=&nso=so%3Ar%2Cp%3Aall&is_sug_officeid=0&office_category=0&service_area=0"

        try:
            result = requests.get(base_url + search_name + post_url).text

            soup = BeautifulSoup(result, "html.parser")
            newss = soup.find_all("div", class_="news_contents")

            predictions = []
            for news in newss:
                try:
                    title = str(news).split("title=\"")[1].split("\">")[0].replace("&quot;", "\'")
                    score = self.model(title, return_all_scores=True)[0][1]["score"]
                    news_link = str(news).split("href=\"")[1].split("\"")[0].replace("amp;", "")
                    predictions.append({
                        "title": title,
                        "score": score,
                        "link": news_link
                    })
                except (TypeError, IndexError):
                    continue

            result = {
                "predictions": np.array(predictions),
            }
            json_result = json.dumps(obj=result, cls=NpEncoder, indent=4, ensure_ascii=False)
            return json.loads(json_result)
        except Exception as e:
            return {
                "predictions": []
            }

if __name__ == "__main__":
    model = CustomTransformer("custom-transformer")
    kserve.ModelServer().start([model])