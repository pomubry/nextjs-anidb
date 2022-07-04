import dummy from "../dummy.json";
import Head from "next/head";
import CardAni from "../components/Mui/CardAni";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import SearchForm from "../components/SearchForm";

export async function getServerSideProps({ query }) {
  const { season, seasonYear, searchStr } = query;

  return {
    props: {
      queryProp: query,
    },
  };
}

const Search = ({ queryProp }) => {
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

      <Container maxWidth="lg" sx={{ paddingTop: (theme) => theme.spacing(7) }}>
        <SearchForm queryProp={queryProp} />
        <Grid container spacing={2}>
          {dummy.map((anime) => (
            <CardAni anime={anime} key={anime.id} />
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Search;
