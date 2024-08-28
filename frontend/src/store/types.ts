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

export type StockData = Stock & {
  timeseriesDatas: {
    given: TimeseriesData[];
    predicted: TimeseriesData[];
  };
  sentimentalDatas: SentimentalData[];
};
