import parse from "html-react-parser";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Media } from "../../lib/IQuery";

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
        }}
      >
        {/* 1st row */}
        <Typography variant="body1">
          {anime.season} {anime.seasonYear}
        </Typography>

        {/* 2nd row */}
        <Box>
          <Typography variant="subtitle2" component="span">
            {anime.format === "TV" ? "TV Show" : anime.format}
          </Typography>

          <Spacer />

          {anime.episodes && (
            <Typography variant="subtitle2" component="span">
              {anime.episodes > 0 ? anime.episodes + " episodes" : "? episodes"}
            </Typography>
          )}

          <Spacer />

          <Typography variant="subtitle2" component="span">
            Trend Score: {anime.trending}
          </Typography>
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

      <Divider />
      {/* Genre */}
      <CardContent
        sx={{ overflowX: "scroll", display: "flex", flexWrap: "nowrap" }}
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
