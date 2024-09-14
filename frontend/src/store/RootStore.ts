import { runInAction, makeAutoObservable } from "mobx";
import { Stock, StockData } from "./types";
import kospi200 from "./kospi200.json";
import { predictAPI } from "./apis";

export class RootStore {
  private _selectedCode: string;
  private _cacheData: StockData[];
  private _kospi200: Stock[];
  constructor() {
    this._cacheData = [];
    this._selectedCode = "000000";
    this._kospi200 = kospi200;
    makeAutoObservable(this);
  }
  get cacheData() {
    return this._cacheData;
  }
  get kospi200() {
    return this._kospi200;
  }
  get selectedCode() {
    return this._selectedCode;
  }
  set selectedCode(given: string) {
    this._selectedCode = given;
  }
  set cacheData(given: StockData[]) {
    this._cacheData = given;
  }
  appendCache = (given: StockData) => {
    this.cacheData = [given, ...this.cacheData];
  };
  updateCache = (given: StockData) => {
    this.cacheData = this.cacheData.map((stockData: StockData) => {
      if (stockData.code === given.code) {
        return given;
      } else {
        return stockData;
      }
    });
  };
  emptyCache = () => {
    runInAction(() => {
      this._cacheData = [];
    });
  };

  getNewData = async (code: string) => {
    const stock: Stock | undefined = this.kospi200.find((stock) => stock.code === code);
    if (!!!stock) return;

    this.appendCache({
      code: code,
      name: stock.name,
      timeseriesDatas: {
        given: [],
        predicted: [],
        status: "loading",
      },
      sentimentalDatas: {
        data: [],
        status: "loading",
      },
    });
    const sentimentData = await predictAPI.getSentiment(stock.name);
    this.updateCache({
      code: code,
      name: stock.name,
      timeseriesDatas: {
        given: [],
        predicted: [],
        status: "loading",
      },
      sentimentalDatas: {
        data: sentimentData,
        status: "success",
      },
    });
    const inputData = await predictAPI.getInputData(code);
    this.updateCache({
      code: code,
      name: stock.name,
      timeseriesDatas: {
        given: inputData,
        predicted: [],
        status: "success",
      },
      sentimentalDatas: {
        data: sentimentData,
        status: "success",
      },
    });
    const predictionData = await predictAPI.getPrediction(inputData);
    this.updateCache({
      code: code,
      name: stock.name,
      timeseriesDatas: {
        given: inputData,
        predicted: predictionData,
        status: "success",
      },
      sentimentalDatas: {
        data: sentimentData,
        status: "success",
      },
    });
  };
}
