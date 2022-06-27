import dummy from "../dummy.json";
import CardAni from "../components/Mui/CardAni";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

const Search = () => {
  return (
    <>
      <Container maxWidth="lg">
        <Grid container spacing={2} mt={2}>
          {dummy.map((anime) => (
            <CardAni anime={anime} key={anime.id} />
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Search;
