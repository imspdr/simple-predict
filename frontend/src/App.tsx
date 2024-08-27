import { Route, Routes, useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import SelectStock from "./components/searchGNB/SelectStock";
import { RootStoreProvider } from "./store/RootStoreProvider";

function App() {
  return (
    <RootStoreProvider>
      <div>
        <div
          css={css`
            position: absolute;
            top: 0px;
            width: calc(99vw);
            height: 64px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          `}
        >
          <SelectStock />
        </div>
        <div
          css={css`
            margin-top: 64px;
            height: calc(99vh - 64px);
          `}
        >
          MAIN
        </div>
      </div>
    </RootStoreProvider>
  );
}

export default App;
