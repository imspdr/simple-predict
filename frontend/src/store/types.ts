export type Stock = {
  code: string;
  name: string;
};

export type SentimentalData = {
  title: string;
  score: number;
};

export type TimeseriesData = {
  ds: string;
  y: number;
  predicted: string;
};

export type StockData = Stock & {
  timeseriesDatas: TimeseriesData[];
  sentimentalDatas: SentimentalData[];
};
