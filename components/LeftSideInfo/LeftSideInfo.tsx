import { Box, Typography } from "@mui/material";
import Rankings from "./Rankings";
import Data from "./Data";
import Tags from "./Tags";
import StreamLinks from "./StreamLinks";
import { Media } from "../../lib/interface/IQueryId";

const xsTemplate = `
'data rankings'
'data tags'
'data streamlinks'
`;

const LeftSideInfo: React.FC<{ anime: Media }> = ({ anime }) => {
  return (
    <Box
      sx={{
        display: { xs: "grid", sm: "block" },
        gap: "1rem",
        gridTemplateAreas: {
          xs: xsTemplate,
        },
        alignItems: "center",
      }}
    >
      {/* This component contains 4 parts: Rankings, Data, Tags, and Streaming Links */}

      {!!anime.rankings.length && (
        <Box sx={{ gridArea: "rankings" }}>
          <Rankings rankings={anime.rankings} />
        </Box>
      )}

      <Box sx={{ gridArea: "data" }}>
        <Data anime={anime} />
      </Box>

      {!!anime.tags.length && (
        <Box sx={{ gridArea: "tags" }}>
          <Typography component="h2" variant="h6" marginY={2} color="primary">
            Tags
          </Typography>
          <Tags tags={anime.tags} />
        </Box>
      )}

      {!!anime.externalLinks.length && (
        <Box sx={{ gridArea: "streamlinks" }}>
          <Typography component="h2" variant="h6" marginY={2} color="primary">
            External & Streaming links
          </Typography>
          <StreamLinks links={anime.externalLinks} />
        </Box>
      )}
    </Box>
  );
};

export default LeftSideInfo;
