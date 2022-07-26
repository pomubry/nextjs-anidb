import { Media } from "../../lib/IQueryId";
import parse from "html-react-parser";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";

const CardHeaderId: React.FC<{ anime: Media }> = ({ anime }) => {
  return (
    <>
      <Card>
        {anime.bannerImage && (
          <CardMedia
            component="img"
            image={anime.bannerImage}
            alt={anime.title.romaji}
            sx={{
              height: { xs: "10rem", sm: "15rem", md: "20rem", lg: "25rem" },
            }}
          />
        )}
        <CardContent
          sx={{
            display: "grid",
            gap: { sm: 2 },
            gridTemplateColumns: { xs: "1fr", sm: "2fr 2fr", md: "1fr 3fr" },
          }}
        >
          <CardMedia
            component="img"
            image={anime.coverImage.extraLarge}
            alt={anime.title.romaji}
            sx={{
              maxWidth: 300,
              placeSelf: "center",
              transform: {
                md: anime.bannerImage && "translateY(-30%)",
              },
            }}
          />
          <Box sx={{ pr: { md: 2 } }}>
            <Typography component="h1" variant="h4">
              {anime.title.romaji}
            </Typography>
            {anime.description && (
              <Typography variant="body1" mt={2}>
                {parse(anime.description)}
              </Typography>
            )}
          </Box>
        </CardContent>
      </Card>
    </>
  );
};
export default CardHeaderId;
