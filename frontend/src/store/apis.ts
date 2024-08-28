import axios from "axios";

const timeseriesURL = "";
const sentimentURL = "";

export const PredictAPI = {
  getPrediction: async (name: string) => {
    const ret = await axios({
      method: "get",
      url: sentimentURL,
    })
      .then((data: any) => {
        return data.data;
      })
      .catch((e) => undefined);

    if (ret && ret.status === "success") {
      return {};
    } else {
      return undefined;
    }
  },
};
