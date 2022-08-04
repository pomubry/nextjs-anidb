import { RecommendationsNode } from "../../lib/interface/IQueryId";
import { Card, CardMedia, CardActions, Button } from "@mui/material";
import Link from "../../src/Link";

const Recommendations: React.FC<{ rec: RecommendationsNode[] }> = ({ rec }) => {
  return (
    <>
      {rec.map(
        ({ mediaRecommendation }) =>
          mediaRecommendation && (
            <Card key={mediaRecommendation.id} sx={{ borderRadius: 3 }}>
              <CardMedia
                component="img"
                height={250}
                image={mediaRecommendation.coverImage.extraLarge}
                alt={mediaRecommendation.title.romaji}
              />
              <CardActions>
                <Button
                  width="100%"
                  href={"/anime/" + mediaRecommendation.id}
                  component={Link}
                  sx={{ textAlign: "center" }}
                >
                  {mediaRecommendation.title.romaji}
                </Button>
              </CardActions>
            </Card>
          )
      )}
    </>
  );
};

export default Recommendations;
