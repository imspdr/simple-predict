import { List, ListItem, ListItemText, CircularProgress } from "@mui/material";
import { SentimentalDatas, SentimentalData } from "@src/store/types";
import { css } from "@emotion/react";

function RenderScore(props: { score: number }) {
  return (
    <div
      css={css`
        width: 40px;
        height: 40px;
        border-radius: 20px;
        border: 2px solid;
        margin-right: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: ${props.score > 0.7
          ? "#94d6c5"
          : props.score > 0.5
          ? "#ffd700"
          : "#e65100"};
      `}
    >
      {(props.score * 100).toFixed()}
    </div>
  );
}

export default function SentimentList(props: {
  width: number;
  selectedCode: string;
  givenData: SentimentalDatas;
}) {
  const givenData = props.givenData;
  return (
    <div
      css={css`
        width: ${props.width}px;
        display: flex;
        align-items: center;
        justify-content: center;
      `}
    >
      {givenData.status === "success" ? (
        <List sx={{ width: "100%", maxWidth: props.width, bgcolor: "background.paper" }}>
          {givenData.data.map((sentiment: SentimentalData) => (
            <ListItem
              key={sentiment.title}
              disableGutters
              onClick={() => {
                window.open(sentiment.link, "_blank", "noopener,noreferrer");
              }}
            >
              <ListItemText
                css={css`
                  max-width: ${props.width - 60}px;
                `}
                primary={sentiment.title}
              />
              <RenderScore score={sentiment.score} />
            </ListItem>
          ))}
        </List>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}
