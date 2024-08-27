import axios from "axios";

const BASEURL = "";

export const PredictAPI = {
  getPrediction: async (name: string) => {
    const ret = await axios({
      method: "get",
      url: BASEURL,
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
