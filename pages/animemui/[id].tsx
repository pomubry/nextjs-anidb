import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Box, CircularProgress, Container, Grid } from "@mui/material";
import fetchQuery from "../../lib/fetchQueryts";
import fetchQueryId from "../../lib/fetchQueryId";
import { useRouter } from "next/router";
import { Media } from "../../lib/IQueryId";
import CardHeaderId from "../../components/Mui/CardHeaderId";
import LeftSideInfo from "../../components/LeftSideInfo/LeftSideInfo";

export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch the initial top 50 anime
  const { media, error } = await fetchQuery({});

  if (error) {
    console.error("Error in getStaticProps:", error.message);
    return {
      paths: [{ params: { id: "20" } }],
      fallback: true,
    };
  }

  const paths = media.map((anime) => ({ params: { id: anime.id.toString() } }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { media, error } = await fetchQueryId(Number(params!.id));

  if (error) {
    console.error("Error in getStaticProps:", error.message);
    return {
      notFound: true,
      revalidate: 10,
    };
  }

  return {
    props: {
      anime: media,
    },
    revalidate: 10,
  };
};

const Anime: NextPage<{ anime: Media }> = ({ anime }) => {
  const { isFallback } = useRouter();

  if (isFallback)
    return (
      <Box sx={{ display: "grid", placeContent: "center" }}>
        <CircularProgress key="circularKey" />
      </Box>
    );

  return (
    <>
      <CardHeaderId anime={anime} />

      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <LeftSideInfo anime={anime} />
          </Grid>
          <Grid item xs={9}>
            <Box bgcolor="error.main">Left Side</Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Anime;
