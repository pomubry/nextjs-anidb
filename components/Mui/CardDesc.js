import parse from "html-react-parser";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";

const CardDesc = ({ anime }) => {
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
          <Typography variant="subtitle2" component="span">
            {" "}
            •{" "}
          </Typography>
          <Typography variant="subtitle2" component="span">
            {anime.episodes > 1 ? anime.episodes + " episodes" : "? episodes"}
          </Typography>
          <Typography variant="subtitle2" component="span">
            {" "}
            •{" "}
          </Typography>
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
      <CardContent>
        {anime.genres.length > 0 &&
          anime.genres.map((genre, index) => (
            <Chip
              key={index}
              onClick={() => {}}
              component="span"
              variant="subtitle2"
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
