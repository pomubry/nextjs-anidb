import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Relations } from "../../lib/interface/IQueryId";
import useExpander from "../../lib/useExpander";

const Relations: React.FC<{ relations: Relations }> = ({ relations }) => {
  const { sliceEnd, ExpandButton } = useExpander({
    arr: relations.nodes,
    maxNumber: 4,
  });
  return (
    <>
      {relations.nodes.slice(0, sliceEnd).map((anime, index) => (
        <Card
          elevation={3}
          sx={{ display: "flex", borderRadius: 3 }}
          key={index}
        >
          <CardMedia
            component="img"
            image={anime.coverImage.extraLarge}
            alt={anime.title.romaji}
            sx={{ flex: 2, maxWidth: 130 }}
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
      <ExpandButton />
    </>
  );
};

export default Relations;
