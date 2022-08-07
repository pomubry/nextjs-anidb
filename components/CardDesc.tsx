import parse from "html-react-parser";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { Media } from "../lib/interface/IQuery";

const CustomTypo: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Typography variant="subtitle2" component="span" color="secondary">
    {children}
  </Typography>
);

const Spacer = () => (
  <Typography variant="subtitle2" component="span">
    {" "}
    •{" "}
  </Typography>
);

const CardDesc: React.FC<{ anime: Media }> = ({ anime }) => {
  return (
    <>
      <CardContent
        sx={{
          overflow: "scroll",
          flex: 1,
          boxShadow: (theme) => theme.shadows[5],
        }}
      >
        {/* 1st row */}
        <Typography component="h2" variant="body1" color="primary">
          {anime.season} {anime.seasonYear}
        </Typography>

        {/* 2nd row */}
        <Box>
          {anime.format && (
            <>
              <CustomTypo>
                {anime.format === "TV" ? "TV Show" : anime.format}
              </CustomTypo>
              <Spacer />
            </>
          )}

          {anime.episodes && (
            <>
              <CustomTypo>
                {anime.episodes > 0
                  ? anime.episodes + " episodes"
                  : "? episodes"}
              </CustomTypo>
              <Spacer />
            </>
          )}

          <CustomTypo>Trend Score: {anime.trending}</CustomTypo>
        </Box>

        {/* main text */}
        <Typography variant="body1" marginTop={3}>
          {parse(
            anime.description !== null
              ? anime.description
              : "No description was added yet for this anime."
          )}
        </Typography>
      </CardContent>

      {/* Genre */}
      <CardContent
        sx={{
          overflowX: "scroll",
          display: "flex",
          flexWrap: "nowrap",
        }}
      >
        {anime.genres?.map((genre, index) => (
          <Chip
            key={index}
            variant="filled"
            size="small"
            sx={{
              backgroundColor: anime.coverImage.color,
              margin: 0.5,
              color: (theme) =>
                anime.coverImage.color
                  ? theme.palette.getContrastText(anime.coverImage.color)
                  : "gray",
            }}
            label={genre}
          />
        ))}
      </CardContent>
    </>
  );
};

export default CardDesc;
