import { Paper, Typography } from "@mui/material";
import { Tag } from "../../lib/IQueryId";

const Tags: React.FC<{ tags: Tag[] }> = ({ tags }) => {
  return (
    <>
      {tags.map((tag) => (
        <Paper
          elevation={3}
          key={tag.name}
          sx={{
            p: 1.3,
            mb: 2,
            display: "flex",
            borderRadius: 3,
            overflowX: "scroll",
          }}
        >
          <Typography sx={{ flex: 1, mr: 1 }}>{tag.name}</Typography>
          <Typography>{tag.rank}%</Typography>
        </Paper>
      ))}
    </>
  );
};

export default Tags;
