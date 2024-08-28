import { css } from "@emotion/react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import TimeseriesChart from "./components/TimeseriesChart";
import { useRootStore } from "@src/store/RootStoreProvider";
import SentimentList from "./components/SentimentList";

function App() {
  const rootStore = useRootStore();
  const selectedData = rootStore.cacheData.find((datas) => datas.code === rootStore.selectedCode);
  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      `}
    >
      <Autocomplete
        disablePortal
        options={rootStore.kospi200.map((stock) => {
          return {
            label: stock.name,
            id: Number(stock.code),
          };
        })}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="종목" />}
      />
      {selectedData && (
        <>
          <SentimentList givenData={selectedData.sentimentalDatas} />
          <TimeseriesChart
            givenData={selectedData.timeseriesDatas.given}
            predictionData={selectedData.timeseriesDatas.predicted}
          />
        </>
      )}
    </div>
  );
}

export default App;
