import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import Image from "next/image";
import { Characters } from "../../lib/IQueryId";
import styles from "../../styles/RightSideInfo/Characters.module.css";

const Characters: React.FC<{ characters: Characters }> = ({ characters }) => {
  return (
    <>
      {characters.edges.slice(0, undefined).map((edge, index) => {
        return (
          <Card
            key={index}
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gridTemplateRows: 100,
            }}
          >
            {/* Anime character on the left */}
            <Box display="grid" gridTemplateColumns="1fr 2fr">
              <CardMedia
                component="img"
                height="100%"
                image={edge.node.image.large}
                alt={edge.node.name.full}
              />
              <CardContent sx={{}}>
                <Typography component="h4" variant="subtitle2" sx={{}}>
                  {edge.node.name.full}
                </Typography>
                <Typography component="h5" variant="body2">
                  {edge.role}
                </Typography>
              </CardContent>
            </Box>

            {/* Voice actor on the right */}
            {edge.voiceActors[0] && (
              <Box display="grid" gridTemplateColumns="2fr 1fr">
                <CardContent sx={{}}>
                  <Typography component="h4" variant="subtitle2" sx={{}}>
                    {edge.voiceActors[0].name.full}
                  </Typography>
                  <Typography component="h5" variant="body2">
                    JAPANESE
                  </Typography>
                </CardContent>

                <CardMedia
                  component="img"
                  height="100%"
                  image={edge.voiceActors[0].image.large}
                  alt={edge.voiceActors[0].name.full}
                />
              </Box>
            )}
          </Card>
        );
      })}
    </>
  );
};

export default Characters;
