import { Paper, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Ranking } from "../../lib/interface/IQueryId";

const Rankings: React.FC<{ rankings: Ranking[] }> = ({ rankings }) => {
  return (
    <>
      {rankings.map((rank, index) => {
        return (
          <Paper
            key={index}
            elevation={3}
            sx={{
              mb: 2,
              p: 1,
              borderRadius: 3,
              display: "grid",
              placeContent: "center",
            }}
          >
            <Typography
              variant="subtitle2"
              align="center"
              textTransform="capitalize"
            >
              {rank.type === "RATED" ? (
                <StarIcon color="warning" sx={{ mr: 1 }} />
              ) : (
                <FavoriteIcon color="error" sx={{ mr: 1 }} />
              )}
              #{rank.rank} {rank.context}
              {!rank.allTime && " of "}
              {rank?.season} {rank?.year}
            </Typography>
          </Paper>
        );
      })}
    </>
  );
};

export default Rankings;
