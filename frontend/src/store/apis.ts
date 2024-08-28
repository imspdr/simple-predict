import axios from "axios";
import { TimeseriesData, SentimentalData } from "./types";

const timeseriesURL = "";
const sentimentURL = "";

export const predictAPI = {
  getInputData: async (name: string) => {
    const ret = await axios({
      method: "get",
      url: timeseriesURL,
    })
      .then((data: any) => {
        return data.data;
      })
      .catch((e) => undefined);

    return ret;
  },
  getPrediction: async (name: string) => {
    const ret = await axios({
      method: "get",
      url: timeseriesURL,
    })
      .then((data: any) => {
        return data.data;
      })
      .catch((e) => undefined);

    return ret;
  },
  getSentiment: async (name: string) => {
    const ret = await axios({
      method: "get",
      url: sentimentURL,
    })
      .then((data: any) => {
        return data.data;
      })
      .catch((e) => undefined);

    return ret;
  },
};
