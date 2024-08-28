import { runInAction, makeAutoObservable } from "mobx";
import { Stock, StockData } from "./types";
import kospi200 from "./kospi200.json";

export class RootStore {
  private __selectedCode: string | undefined;
  private __cacheData: StockData[];
  private __kospi200: Stock[];
  constructor() {
    this.__cacheData = [];
    this.__kospi200 = kospi200;
    makeAutoObservable(this);
  }
  get cacheData() {
    return this.__cacheData;
  }
  get kospi200() {
    return this.__kospi200;
  }
  get selectedCode() {
    return this.__selectedCode;
  }
  set selectedCode(given: string | undefined) {
    this.__selectedCode = given;
  }
  appendCache = (given: StockData) => {
    runInAction(() => {
      this.__cacheData = [given, ...this.cacheData];
    });
  };
  emptyCache = () => {
    runInAction(() => {
      this.__cacheData = [];
    });
  };

  getNewData = ()
}
