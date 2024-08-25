import json
import logging
from typing import Dict

import numpy as np
import kserve
from transformers import pipeline

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

    def load(self) -> bool:
        logging.info(f"use predefined text scoring model")
        self.ready = True
        return self.ready

    def predict(self, payload: Dict, headers: Dict[str, str] = None) -> Dict:
        try:
            given_data = payload["instances"]
        except KeyError:
            return {
                "predictions": []
            }

        sentiment_pipeline = pipeline("sentiment-analysis")

        try:

            predictions = []
            for line in given_data:
                y = sentiment_pipeline(list(line.values()))
                predictions.append(y)
            result = {
                "predictions": np.array(predictions),
            }
            json_result = json.dumps(obj=result, cls=NpEncoder, indent=4, ensure_ascii=False)
            return json.loads(json_result)
        except Exception as e:
            raise Exception("Failed to predict %s" % e)

if __name__ == "__main__":
    model = CustomTransformer("custom-transformer")
    kserve.ModelServer().start([model])