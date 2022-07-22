import Image from "next/image";
import Box from "@mui/material/Box";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const CardImg = ({ anime, contentHeight }) => {
  return (
    <CardActionArea>
      <CardMedia
        title={anime.title.romaji}
        sx={{
          position: "relative",
          width: "100%",
          minHeight: contentHeight,
        }}
      >
        <Image
          src={anime.coverImage.extraLarge}
          layout="fill"
          objectFit="cover"
          alt={anime.title.romaji}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            backgroundColor: "rgba(0,0,0,.5)",
            color: "white",
            padding: "1rem",
          }}
        >
          <Typography variant="body2" marginBottom={1}>
            {anime.title.romaji}
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              color: anime.coverImage.color,
            }}
          >
            {anime.studios.edges[0]?.node.name}
          </Typography>
        </Box>
      </CardMedia>
    </CardActionArea>
  );
};

export default CardImg;
