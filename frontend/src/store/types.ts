export type Stock = {
  code: string;
  name: string;
};

export type SentimentalData = {
  title: string;
  score: number;
  link: string;
};

export type TimeseriesData = {
  ds: string;
  y: number;
};

export type PredictionData = {
  ds: string;
  yhat: number;
  yhat_lower: number;
  yhat_upper: number;
  trend: number;
};

export type TimeseriesDatas = {
  given: TimeseriesData[];
  predicted: PredictionData[];
  status: string;
};

export type SentimentalDatas = {
  data: SentimentalData[];
  status: string;
};

export type StockData = Stock & {
  timeseriesDatas: TimeseriesDatas;
  sentimentalDatas: SentimentalDatas;
};
