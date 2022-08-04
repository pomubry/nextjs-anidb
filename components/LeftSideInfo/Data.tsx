import { Box, Paper, Typography } from "@mui/material";
import { Media, StudiosNode } from "../../lib/interface/IQueryId";

const CustomBox = ({ children }: { children: React.ReactNode }) => (
  <Box marginY={2}>{children}</Box>
);

const CustomTypo = ({ children }: { children: React.ReactNode }) => (
  <Typography component="h3" variant="h6">
    {children}
  </Typography>
);

const Data: React.FC<{ anime: Media }> = ({ anime }) => {
  let studios: StudiosNode[] = [];
  let producers: StudiosNode[] = [];
  anime.studios?.nodes?.forEach((studio) => {
    studio.isAnimationStudio ? studios.push(studio) : producers.push(studio);
  });

  return (
    <Paper
      elevation={3}
      sx={{
        p: { xs: 1, sm: 2 },
        borderRadius: 3,
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
      }}
    >
      {!!anime.format && (
        <CustomBox>
          <CustomTypo>Format</CustomTypo>
          <Typography>{anime.format}</Typography>
        </CustomBox>
      )}

      {!!anime.episodes && (
        <CustomBox>
          <CustomTypo>Episodes</CustomTypo>
          <Typography>{anime.episodes}</Typography>
        </CustomBox>
      )}

      {!!anime.duration && (
        <CustomBox>
          <CustomTypo>Episode Duration</CustomTypo>
          <Typography>{anime.duration} minutes</Typography>
        </CustomBox>
      )}

      {!!anime.status && (
        <CustomBox>
          <CustomTypo>Status</CustomTypo>
          <Typography>{anime.status}</Typography>
        </CustomBox>
      )}

      {/* Check first if every property has a value/truthy */}
      {Object.values(anime.startDate).every(
        (value: number | null) => typeof value === "number"
      ) && (
        <CustomBox>
          <CustomTypo>Start Date</CustomTypo>
          <Typography>
            {new Date(
              // values shouldn't be null anymore
              anime.startDate.year!,
              anime.startDate.month!,
              anime.startDate.day!
            ).toDateString()}
          </Typography>
        </CustomBox>
      )}

      {/* Check first if every property has a value/truthy */}
      {Object.values(anime.endDate).every(
        (value: number | null) => typeof value === "number"
      ) && (
        <CustomBox>
          <CustomTypo>End Date</CustomTypo>
          <Typography>
            {new Date(
              // values shouldn't be null anymore
              anime.endDate.year!,
              anime.endDate.month!,
              anime.endDate.day!
            ).toDateString()}
          </Typography>
        </CustomBox>
      )}

      {(!!anime.season || !!anime.seasonYear) && (
        <CustomBox>
          <CustomTypo>Season</CustomTypo>
          <Typography>
            {anime.season} {anime.seasonYear}
          </Typography>
        </CustomBox>
      )}

      {!!anime.averageScore && (
        <CustomBox>
          <CustomTypo>Average Score</CustomTypo>
          <Typography>{anime.averageScore}%</Typography>
        </CustomBox>
      )}

      {!!anime.meanScore && (
        <CustomBox>
          <CustomTypo>Mean Score</CustomTypo>
          <Typography>{anime.meanScore}%</Typography>
        </CustomBox>
      )}

      {!!anime.popularity && (
        <CustomBox>
          <CustomTypo>Popularity</CustomTypo>
          <Typography>{anime.popularity}</Typography>
        </CustomBox>
      )}

      {!!anime.favourites && (
        <CustomBox>
          <CustomTypo>Favourites</CustomTypo>
          <Typography>{anime.favourites}</Typography>
        </CustomBox>
      )}

      {!!studios.length && (
        <CustomBox>
          <CustomTypo>Studios</CustomTypo>
          {studios.map((studio, index) => (
            <Typography key={index}>{studio.name}</Typography>
          ))}
        </CustomBox>
      )}

      {!!producers.length && (
        <CustomBox>
          <CustomTypo>Producers</CustomTypo>
          {producers.map((studio, index) => (
            <Typography key={index}>{studio.name}</Typography>
          ))}
        </CustomBox>
      )}

      {!!anime.source && (
        <CustomBox>
          <CustomTypo>Source</CustomTypo>
          <Typography>{anime.source}</Typography>
        </CustomBox>
      )}

      {!!anime.genres?.length && (
        <CustomBox>
          <CustomTypo>Genres</CustomTypo>
          {anime.genres.map((genre, index) => (
            <Typography component="span" key={index}>
              {genre}
              {anime.genres.length !== index + 1 ? ", " : ""}
            </Typography>
          ))}
        </CustomBox>
      )}

      <CustomBox>
        <CustomTypo>Romaji</CustomTypo>
        <Typography>{anime.title.romaji}</Typography>
      </CustomBox>

      {!!anime.title?.english && (
        <CustomBox>
          <CustomTypo>English</CustomTypo>
          <Typography>{anime.title.english}</Typography>
        </CustomBox>
      )}

      {!!anime.title?.native && (
        <CustomBox>
          <CustomTypo>Native</CustomTypo>
          <Typography>{anime.title.native}</Typography>
        </CustomBox>
      )}

      {!!anime.synonyms?.length && (
        <CustomBox>
          <CustomTypo>Synonyms</CustomTypo>
          {anime.synonyms.map((synonym, index) => (
            <Typography key={index}>{synonym}</Typography>
          ))}
        </CustomBox>
      )}
    </Paper>
  );
};

export default Data;
