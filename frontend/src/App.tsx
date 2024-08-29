import { css } from "@emotion/react";
import { observer } from "mobx-react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import TimeseriesChart from "./components/TimeseriesChart";
import { useRootStore } from "@src/store/RootStoreProvider";
import SentimentList from "./components/SentimentList";
import CircularProgress from "@mui/material/CircularProgress";

function App() {
  const rootStore = useRootStore();
  const selectedData = rootStore.cacheData.find((datas) => datas.code === rootStore.selectedCode);
  console.log(selectedData);
  return (
    <div
      css={css`
        display: flex;
        width: 99vw;
        flex-direction: column;
        align-items: center;
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          padding: 30px;
          width: 1500px;
        `}
      >
        <Autocomplete
          disablePortal
          options={rootStore.kospi200.map((stock) => {
            return {
              label: stock.name,
              id: stock.code,
            };
          })}
          sx={{ width: 300, height: 60 }}
          renderInput={(params) => <TextField {...params} label="종목" />}
          onChange={(e, v) => {
            rootStore.selectedCode = v?.id;
          }}
        />
        {selectedData && (
          <div
            css={css`
              display: flex;
              flex-direction: row;
              align-items: center;
              gap: 20px;
            `}
          >
            {selectedData.timeseriesDatas.status === "success" ? (
              <TimeseriesChart
                width={800}
                height={500}
                givenData={selectedData.timeseriesDatas.given}
                predictionData={selectedData.timeseriesDatas.predicted}
              />
            ) : (
              <CircularProgress />
            )}
            {selectedData.sentimentalDatas.status === "success" ? (
              <SentimentList givenData={selectedData.sentimentalDatas.data} />
            ) : (
              <CircularProgress />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default observer(App);
