import { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import kospi200 from "../../../kospi200.json";

type stock = {
  code: string;
  name: string;
};

export default function SelectStock() {
  const [stock, nowStock] = useState<stock | null>(null);

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={kospi200}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="종목" />}
    />
  );
}
