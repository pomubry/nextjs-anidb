import { Box, Typography, Paper } from "@mui/material";
import Image from "next/image";
import { useEffect } from "react";
import { Characters } from "../../lib/IQueryId";
import useExpander from "../../lib/useExpander";

const Characters: React.FC<{ characters: Characters }> = ({ characters }) => {
  const { sliceEnd, ExpandButton } = useExpander({
    arr: characters.edges,
    maxNumber: 10,
  });

  useEffect(() => console.log(sliceEnd), [sliceEnd]);
  return (
    <>
      {characters.edges.slice(0, sliceEnd).map((edge, index) => {
        return (
          <Paper
            key={index}
            sx={{
              minHeight: "7rem",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              borderRadius: 3,
              overflow: "hidden",
            }}
          >
            {/* Anime character on the left */}
            <Box display="grid" gridTemplateColumns="1fr 2fr">
              <Box width="100%" height="100%" position="relative">
                <Image
                  src={edge.node.image.large}
                  alt={edge.node.name.full}
                  layout="fill"
                  objectFit="cover"
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  p: 1,
                }}
              >
                <Typography component="h4" variant="subtitle2" sx={{ flex: 1 }}>
                  {edge.node.name.full}
                </Typography>
                <Typography component="h5" variant="body2">
                  {edge.role}
                </Typography>
              </Box>
            </Box>

            {/* Voice actor on the right */}
            {edge.voiceActors[0] && (
              <Box display="grid" gridTemplateColumns="2fr 1fr">
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    p: 1,
                    textAlign: "end",
                  }}
                >
                  <Typography
                    component="h4"
                    variant="subtitle2"
                    sx={{ flex: 1 }}
                  >
                    {edge.voiceActors[0].name.full}
                  </Typography>
                  <Typography component="h5" variant="body2">
                    JAPANESE
                  </Typography>
                </Box>

                <Box width="100%" height="100%" position="relative">
                  <Image
                    src={edge.voiceActors[0].image.large}
                    alt={edge.voiceActors[0].name.full}
                    layout="fill"
                    objectFit="cover"
                  />
                </Box>
              </Box>
            )}
          </Paper>
        );
      })}
      <ExpandButton />
    </>
  );
};

export default Characters;
