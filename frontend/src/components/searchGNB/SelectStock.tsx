import { observer } from "mobx-react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useRootStore } from "@src/store/RootStoreProvider";

function SelectStock() {
  const rootStore = useRootStore();
  return (
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
  );
}

export default observer(SelectStock);
