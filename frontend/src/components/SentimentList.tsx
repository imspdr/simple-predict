import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CommentIcon from "@mui/icons-material/Comment";
import IconButton from "@mui/material/IconButton";
import { SentimentalData } from "@src/store/types";

export default function SentimentList(props: { givenData: SentimentalData[] }) {
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {props.givenData.map((sentiment: SentimentalData) => (
        <ListItem
          key={sentiment.title}
          disableGutters
          secondaryAction={
            <IconButton aria-label="comment">
              <CommentIcon />
            </IconButton>
          }
        >
          <ListItemText primary={sentiment.title} />
        </ListItem>
      ))}
    </List>
  );
}
