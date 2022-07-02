import dummy from "../dummy.json";
import Head from "next/head";
import CardAni from "../components/Mui/CardAni";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

const Search = () => {
  return (
    <>
      <Head>
        <meta name="description" content="Anime list database" />
        <meta
          name="keywords"
          content={`anime list, anime database, nextjs, nextani database`}
        />
        <meta name="author" content="pomubry" />
        <title>NextAni Database | Search</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
