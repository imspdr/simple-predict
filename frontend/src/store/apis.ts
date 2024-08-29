import axios from "axios";
import { TimeseriesData, SentimentalData, PredictionData } from "./types";
import inputDataSample from "./inputDataSample.json";
import predictionSample from "./predictionSample.json";
import sentimentalSample from "./sentimentalSample.json";

const timeseriesURL = "";
const sentimentURL = "";

export const predictAPI = {
  getInputData: async (code: string) => {
    // const ret = await axios({
    //   method: "get",
    //   url: timeseriesURL,
    // })
    //   .then((data: any) => {
    //     return data.data;
    //   })
    //   .catch((e) => undefined);

    return inputDataSample.predictions as TimeseriesData[];
  },
  getPrediction: async (data: TimeseriesData[]) => {
    // const ret = await axios({
    //   method: "get",
    //   url: timeseriesURL,
    // })
    //   .then((data: any) => {
    //     return data.data;
    //   })
    //   .catch((e) => undefined);

    return predictionSample.predictions as PredictionData[];
  },
  getSentiment: async (name: string) => {
    // const ret = await axios({
    //   method: "get",
    //   url: sentimentURL,
    // })
    //   .then((data: any) => {
    //     return data.data;
    //   })
    //   .catch((e) => undefined);

    return sentimentalSample.predictions as SentimentalData[];
  },
};
