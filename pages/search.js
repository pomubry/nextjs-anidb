import { useEffect, useState } from "react";
import Head from "next/head";
import InfiniteScroll from "react-infinite-scroller";
import fetchQuery from "../lib/fetchQuery";
import CardAni from "../components/Mui/CardAni";
import SearchForm from "../components/SearchForm";
import { Container, Grid, CircularProgress, Box, Button } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";

export async function getServerSideProps({ query }) {
  // If there are no queries, get current season
  if (Object.keys(query).length === 0) {
    query.getCurrentSeason = true;
  }

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
  const [animeArr, setAnimeArr] = useState(media);
  const [pageDetails, setPageDetails] = useState(pageInfo);
  const [isFetchError, setIsFetchError] = useState(false);

  const { season, seasonYear } = queryProp;

  // Keywords for <Head/>
  const keywords = animeArr.map((anime) => anime.title.romaji);

  // To be used by <InfiniteScroll/> package to load more data
  const fetchMore = async () => {
    if (!pageDetails.hasNextPage) return;

    try {
      let query = {
        page: pageDetails.currentPage + 1,
        season,
        seasonYear,
      };
      const { pageInfo, media } = await fetchQuery(query);

      let newArr = [...animeArr];

      // Only add anime not yet in the state
      media.forEach((animeToAdd) => {
        let isUnique = newArr.every(
          (includedAnime) => includedAnime.id !== animeToAdd.id
        );
        if (isUnique) newArr.push(animeToAdd);
      });

      setAnimeArr(newArr);
      setPageDetails(pageInfo);
      setIsFetchError(false);
    } catch (error) {
      setIsFetchError(true);
    }
  };

  useEffect(() => {
    setAnimeArr(media);
    setPageDetails(pageInfo);
  }, [media, pageInfo, queryProp]);

  const Loader = () => (
    <Box sx={{ display: "flex", justifyContent: "center", marginY: 5 }}>
      {!isFetchError ? (
        <CircularProgress key="circularKey" />
      ) : (
        <Button
          color="error"
          variant="outlined"
          startIcon={<ReplayIcon />}
          sx={{ marginInline: "center" }}
          onClick={fetchMore}
        >
          There was an error. Please try again.
        </Button>
      )}
    </Box>
  );

  return (
    <>
      <Head>
        <meta name="description" content="Anime list database" />
        <meta
          name="keywords"
          content={`anime list, anime database, nextjs, nextani database, ${keywords}`}
        />
        <meta name="author" content="pomubry" />
        <title>NextAni Database | Search</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxWidth="lg" sx={{ paddingY: (theme) => theme.spacing(7) }}>
        <SearchForm queryProp={queryProp} />

        <InfiniteScroll
          pageStart={0}
          loadMore={fetchMore}
          hasMore={pageDetails.hasNextPage}
          loader={<Loader key="circularLoaderKey" />}
        >
          <Grid container spacing={2}>
            {animeArr.map((anime) => (
              <CardAni anime={anime} key={anime.id} />
            ))}
          </Grid>
        </InfiniteScroll>
      </Container>
    </>
  );
};

export default Search;
