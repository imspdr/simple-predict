import axios from "axios";
import { TimeseriesData, SentimentalData, PredictionData } from "./types";
import inputDataSample from "./inputDataSample.json";
import predictionSample from "./predictionSample.json";
import sentimentalSample from "./sentimentalSample.json";

const timeseriesURL = "/api/v1/models/custom-prophet:predict";
const timeseriesHost = "custom-prophet.default.example.com";

const sentimentURL = "/api/v1/models/custom-text-score:predict";
const sentimentHost = "custom-text-score.default.example.com";

export const predictAPI = {
  getInputData: async (code: string) => {
    const ret = await axios
      .post(
        timeseriesURL,
        {
          instances: [],
          params: {
            do_predict: 0,
            code: code,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Kserve-Host": timeseriesHost,
          },
        }
      )
      .then((data: any) => {
        return data.data;
      })
      .catch((e) => {
        return { predictions: [] };
      });
    //const ret = inputDataSample;
    return ret.predictions as TimeseriesData[];
  },
  getPrediction: async (data: TimeseriesData[]) => {
    const ret = await axios
      .post(
        timeseriesURL,
        {
          instances: data,
          params: {
            do_predict: 1,
            periods: 100,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Kserve-Host": timeseriesHost,
          },
        }
      )
      .then((data: any) => {
        return data.data;
      })
      .catch((e) => {
        return { predictions: [] };
      });
    //const ret = predictionSample;
    return ret.predictions as PredictionData[];
  },
  getSentiment: async (name: string) => {
    const ret = await axios
      .post(
        sentimentURL,
        {
          instances: [],
          params: {
            search_name: name,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Kserve-Host": sentimentHost,
          },
        }
      )
      .then((data: any) => {
        return data.data;
      })
      .catch((e) => {
        return { predictions: [] };
      });
    //const ret = sentimentalSample;
    return ret.predictions as SentimentalData[];
  },
};
