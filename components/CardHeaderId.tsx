import parse from "html-react-parser";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import { Media } from "../lib/interface/IQueryId";

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
        <Container maxWidth="lg">
          <CardContent
            sx={{
              display: "grid",
              gap: { xs: 5 },
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
                boxShadow:
                  "0px 11px 15px -7px rgba(0,0,0,0.3),0px 24px 38px 3px rgba(0,0,0,0.3),0px 9px 46px 8px rgba(0,0,0,0.3)",
              }}
            />
            <Box>
              <Typography component="h1" variant="h4" color="primary">
                {anime.title.romaji}
              </Typography>
              {anime.description && (
                <Typography variant="body1" mt={2}>
                  {parse(anime.description)}
                </Typography>
              )}
            </Box>
          </CardContent>
        </Container>
      </Card>
    </>
  );
};
export default CardHeaderId;
