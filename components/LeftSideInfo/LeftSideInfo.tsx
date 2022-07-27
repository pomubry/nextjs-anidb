import Rankings from "./Rankings";
import Data from "./Data";
import Tags from "./Tags";
import StreamLinks from "./StreamLinks";
import { Media } from "../../lib/IQueryId";
import { Typography } from "@mui/material";

const LeftSideInfo: React.FC<{ anime: Media }> = ({ anime }) => {
  return (
    <>
      {/* This component contains 4 parts: Rankings, Data, Tags, and Streaming Links */}

      {!!anime.rankings.length && <Rankings rankings={anime.rankings} />}

      <Data anime={anime} />

      {!!anime.tags.length && (
        <>
          <Typography component="h3" variant="h6" marginY={2}>
            Tags
          </Typography>
          <Tags tags={anime.tags} />
        </>
      )}

      {!!anime.externalLinks.length && (
        <>
          <Typography component="h3" variant="h6" marginY={2}>
            External & Streaming links
          </Typography>
          <StreamLinks links={anime.externalLinks} />
        </>
      )}
    </>
  );
};

export default LeftSideInfo;
