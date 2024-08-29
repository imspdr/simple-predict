import { List, ListItem, ListItemText, ListItemAvatar } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import IconButton from "@mui/material/IconButton";
import { SentimentalData } from "@src/store/types";
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
      {Number(props.score.toFixed(2)) * 100}
    </div>
  );
}

export default function SentimentList(props: { givenData: SentimentalData[] }) {
  return (
    <List sx={{ width: "100%", maxWidth: 520, bgcolor: "background.paper" }}>
      {props.givenData.map((sentiment: SentimentalData) => (
        <ListItem
          key={sentiment.title}
          disableGutters
          onClick={() => {
            window.open(sentiment.link, "_blank", "noopener,noreferrer");
          }}
        >
          <ListItemText primary={sentiment.title} />
          <RenderScore score={sentiment.score} />
        </ListItem>
      ))}
    </List>
  );
}
