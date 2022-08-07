import { useEffect, useState } from "react";
import Head from "next/head";
import type { GetServerSideProps, NextPage } from "next";
import InfiniteScroll from "react-infinite-scroller";
import CardAni from "../components/CardAni";
import SearchForm from "../components/SearchForm";
import {
  Container,
  Grid,
  CircularProgress,
  Box,
  Button,
  Typography,
} from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import fetchQuery from "../lib/fetcher/fetchQuery";
import { IQueryCurrentSeason, IVariables } from "../lib/interface/interface";
import { PageInfo, Media } from "../lib/interface/IQuery";

export const getServerSideProps: GetServerSideProps = async (context) => {
  let query: IQueryCurrentSeason = { ...context.query };

  if (Object.keys(query).length === 0) {
    // If there are no queries, get current season
    query.getCurrentSeason = true;
  }

  const res = await fetchQuery(query);

  if (res.error) {
    console.error("Error in getServerSideProps");
    return {
      notFound: true,
    };
  }

  const { pageInfo, media, variables } = res;
  return {
    props: {
      pageInfo,
      media,
      queryProp: variables,
    },
  };
};

interface PropType {
  pageInfo: PageInfo;
  media: Media[];
  queryProp: IVariables;
}

const Home: NextPage<PropType> = ({ media, pageInfo, queryProp }) => {
  const [animeArr, setAnimeArr] = useState(media);
  const [pageDetails, setPageDetails] = useState(pageInfo);
  const [isFetchError, setIsFetchError] = useState(false);

  const { season, seasonYear } = queryProp;

  // Keywords for <Head/>
  const keywords = animeArr.map((anime) => anime.title.romaji);

  // To be used by <InfiniteScroll/> package to load more data
  const fetchMore = async () => {
    if (!pageDetails.hasNextPage) return;

    const query = {
      page: pageDetails.currentPage + 1,
      season,
      seasonYear,
    };
    const res = await fetchQuery(query);
    if (res.error) {
      setIsFetchError(true);
      return console.error("Error fetching more data");
    }

    const { pageInfo, media } = res;

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
          content={`anime list, anime database, nextjs, nextani database, ${keywords.join(
            ", "
          )}`}
        />
        <title>NextAni Database</title>
      </Head>

      <Container maxWidth="lg" sx={{ paddingY: (theme) => theme.spacing(7) }}>
        <Typography component="h1" variant="h4" mb={3} color="primary">
          NextAni Database
        </Typography>

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

export default Home;
