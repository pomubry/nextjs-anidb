import Head from "next/head";
import CardAni from "../components/Mui/CardAni";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import SearchForm from "../components/SearchForm";
import fetchQuery from "../lib/fetchQuery";

export async function getServerSideProps({ query }) {
  // Fetch data once query was valdiated
  const { pageInfo, media, validatedQueries, error } = await fetchQuery(query);

  if (error) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      pageInfo,
      media,
      queryProp: validatedQueries,
    },
  };
}

const Search = ({ pageInfo, media, queryProp }) => {
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

      <Container maxWidth="lg" sx={{ paddingY: (theme) => theme.spacing(7) }}>
        <SearchForm queryProp={queryProp} />
        <Grid container spacing={2}>
          {media.map((anime) => (
            <CardAni anime={anime} key={anime.id} />
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Search;
