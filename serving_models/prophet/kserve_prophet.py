import logging
from typing import Dict
import pandas as pd
import numpy as np
import kserve
import json
from prophet import Prophet

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
        try:
            given_data = payload["instances"]
        except KeyError:
            return {
                "predictions": []
            }

        params = try_or_default(payload, "params", {})
        ds = try_or_default(params, "ds", "ds")
        y = try_or_default(params, "y", "y")
        periods = try_or_default(params, "periods", 20)

        model = Prophet()
        try:
            df = pd.DataFrame(given_data)
            df.rename(columns={ds: "ds", y: "y"}, inplace=True)
            model.fit(df)

            future = model.make_future_dataframe(periods=periods, freq=None, include_history=False)
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
            raise Exception("Failed to predict %s" % e)

if __name__ == "__main__":
    model = CustomProphet("custom-prophet")
    kserve.ModelServer().start([model])