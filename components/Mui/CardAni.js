import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardImg from "./CardImg";
import CardDesc from "./CardDesc";

const CardAni = ({ anime }) => {
  return (
    <Grid item xs={12} md={6}>
      <Card raised sx={{ borderRadius: 5, overflow: "hidden" }}>
        <Grid container columns={20}>
          <Grid item xs={20} sm={9}>
            {/* Image & Title */}
            <CardImg anime={anime} />
          </Grid>
          <Grid
            item
            xs={20}
            sm={11}
            sx={{
              display: "flex",
              flexDirection: "column",
              height: { xs: "none", sm: "30rem" },
              maxHeight: { xs: "max-content", sm: "none" },
            }}
          >
            {/* Description & Genre */}
            <CardDesc anime={anime} />
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default CardAni;
