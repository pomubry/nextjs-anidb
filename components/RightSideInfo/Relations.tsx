import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useState } from "react";
import { Relations } from "../../lib/IQueryId";
import ExpandBtn from "./ExpandBtn";

const maxNumber = 4;

const Relations: React.FC<{ relations: Relations }> = ({ relations }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      {relations.nodes
        .slice(0, expanded ? undefined : maxNumber)
        .map((anime, index) => (
          <Card
            elevation={3}
            sx={{ display: "flex", borderRadius: 3 }}
            key={index}
          >
            <CardMedia
              component="img"
              image={anime.coverImage.extraLarge}
              alt={anime.title.romaji}
              sx={{ flex: 2 }}
            />
            <CardContent
              sx={{ display: "flex", flexDirection: "column", flex: 6 }}
            >
              <Typography
                gutterBottom
                component="h4"
                variant="subtitle2"
                color="text.secondary"
              >
                {relations.edges[index].relationType.replace(/_/g, " ")}
              </Typography>
              <Typography
                component="h4"
                variant="subtitle2"
                mb="auto"
                color="info.main"
              >
                {anime.title.romaji}
              </Typography>
              <Typography component="h5" variant="body2" color="text.secondary">
                {anime.format} · {anime.status.replace(/_/g, " ")}
              </Typography>
            </CardContent>
          </Card>
        ))}
      {relations.nodes.length < maxNumber && (
        <ExpandBtn handleExpand={() => setExpanded((prev) => !prev)} />
      )}
    </>
  );
};

export default Relations;
