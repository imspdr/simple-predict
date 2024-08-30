import { css } from "@emotion/react";
import { observer } from "mobx-react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import TimeseriesChart from "./components/TimeseriesChart";
import { useRootStore } from "@src/store/RootStoreProvider";
import SentimentList from "./components/SentimentList";
import { StockData } from "./store/types";
import { useCallback } from "react";

function App() {
  const rootStore = useRootStore();
  const selectedData = rootStore.cacheData.find((datas) => datas.code === rootStore.selectedCode);
  return (
    <div
      css={css`
        display: flex;
        width: 99vw;
        flex-direction: column;
        align-items: center;
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
        isOptionEqualToValue={(option, value) => {
          return option.id === value.id;
        }}
        sx={{ width: 300, height: 60 }}
        renderInput={(params) => <TextField {...params} label="종목" />}
        onChange={(e, v) => {
          if (v && v.id) {
            rootStore.selectedCode = v.id;
            const useCache = rootStore.cacheData.find((stock) => stock.code === v.id);
            if (useCache) return;
            else {
              rootStore.getNewData(v.id);
            }
          }
        }}
      />
      <div
        css={css`
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 20px;
        `}
      >
        {rootStore.selectedCode && selectedData && (
          <>
            <TimeseriesChart
              width={800}
              height={500}
              selectedCode={rootStore.selectedCode}
              data={selectedData.timeseriesDatas}
            />
            <SentimentList
              width={500}
              selectedCode={rootStore.selectedCode}
              givenData={selectedData.sentimentalDatas}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default observer(App);
