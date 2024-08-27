export type SentimentalData = {
  title: string;
  score: number;
};

export type TimeseriesData = {
  ds: string;
  y: number;
  predicted: string;
};

export type StockData = {
  name: string;
  code: string;
  timeseriesDatas: TimeseriesData[];
  sentimentalDatas: SentimentalData[];
};
