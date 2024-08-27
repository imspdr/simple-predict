import { runInAction, makeAutoObservable } from "mobx";
import { StockData } from "./types";

export class RootStore {
  private __selectedCode: string | undefined;
  private __cacheData: StockData[];
  constructor() {
    this.__cacheData = [];
    makeAutoObservable(this);
  }
  get cacheData() {
    return this.__cacheData;
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
}
