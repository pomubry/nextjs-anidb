import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { Staff } from "../../lib/interface/IQueryId";
import useExpander from "../../lib/useExpander";

const Staff: React.FC<{ staff: Staff }> = ({ staff }) => {
  const { sliceEnd, ExpandButton } = useExpander({
    arr: staff.edges,
    maxNumber: 10,
  });
  return (
    <>
      {staff.edges.slice(0, sliceEnd).map((obj, index) => {
        return (
          <Card
            elevation={3}
            key={index}
            sx={{
              display: "flex",
              borderRadius: 3,
            }}
          >
            <CardMedia
              component="img"
              image={obj.node.image.large}
              alt={obj.node.name.full}
              sx={{ flex: 2 }}
            />
            <CardContent
              sx={{ display: "flex", flexDirection: "column", flex: 8 }}
            >
              <Typography
                gutterBottom
                component="h4"
                variant="subtitle2"
                color="text.secondary"
                sx={{ flex: 1 }}
              >
                {obj.node.name.full}
              </Typography>
              <Typography component="h5" variant="body2" color="info.main">
                {obj.role}
              </Typography>
            </CardContent>
          </Card>
        );
      })}
      <ExpandButton />
    </>
  );
};

export default Staff;
