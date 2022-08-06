import Relations from "./Relations";
import Characters from "./Characters";
import Staff from "./Staff";
import StatusDistribution from "./StatusDistribution";
import Watch from "./Watch";
import Recommendations from "./Recommendations";
import { Media } from "../../lib/interface/IQueryId";
import { Box, Typography } from "@mui/material";
import React from "react";

const CustomTypo = ({ children }: { children: React.ReactNode }) => (
  <Typography component="h2" variant="h6" color="primary.main">
    {children}
  </Typography>
);

const CustomBox = ({ children }: { children: React.ReactNode }) => (
  <Box
    marginY={2}
    display="grid"
    gap={2}
    sx={{
      gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
      transition: "height 1s ease",
    }}
  >
    {children}
  </Box>
);

const RightSideInfo: React.FC<{ anime: Media }> = ({ anime }) => {
  return (
    <Box>
      {/* This component contains 6 parts: 
          Relations, Characters, Staff, StatusDistribution, Watch, Trailer, & Recommendations */}

      {!!anime.relations?.nodes?.length && (
        <>
          <CustomTypo>Relations</CustomTypo>
          <CustomBox>
            <Relations relations={anime.relations} />
          </CustomBox>
        </>
      )}

      {!!anime.characters?.edges?.length && (
        <>
          <CustomTypo>Characters</CustomTypo>
          <CustomBox>
            <Characters characters={anime.characters} />
          </CustomBox>
        </>
      )}

      {!!anime.staff?.edges?.length && (
        <>
          <CustomTypo>Staff</CustomTypo>
          <CustomBox>
            <Staff staff={anime.staff} />
          </CustomBox>
        </>
      )}

      {!!anime.stats?.statusDistribution?.length && (
        <>
          <CustomTypo>Status Distribution</CustomTypo>
          <StatusDistribution stats={anime.stats} />
        </>
      )}

      {!!anime.streamingEpisodes?.length && (
        <>
          <CustomTypo>Watch</CustomTypo>
          <Watch watch={anime.streamingEpisodes} />
        </>
      )}

      {anime.trailer?.site === "youtube" && (
        <>
          <Typography component="h3" variant="h6" color="primary.main" mb={2}>
            Trailer
          </Typography>
          <Box
            component="iframe"
            src={`https://www.${anime.trailer.site}.com/embed/${anime.trailer.id}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            sx={{ width: "100%", aspectRatio: "16 / 9" }}
          ></Box>
        </>
      )}

      {!!anime.recommendations?.nodes?.length && (
        <>
          <CustomTypo>Recommendations</CustomTypo>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr 1fr",
                md: "repeat(4,1fr)",
                lg: "repeat(5,1fr)",
              },
              gap: 2,
              my: 2,
            }}
          >
            <Recommendations rec={anime.recommendations.nodes} />
          </Box>
        </>
      )}
    </Box>
  );
};

export default RightSideInfo;
