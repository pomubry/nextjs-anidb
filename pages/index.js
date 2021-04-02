import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Anime from '../components/Anime';
import fetchQuery from '../lib/fetchQuery';
import styles from '../styles/Home.module.css';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core';

export async function getServerSideProps() {
  const data = await fetchQuery();

  if (!data) {
    return {
      notFound: true,
    };
  }
  const { pageInfo, media } = data.data.Page;

  return {
    props: {
      pageInfo,
      media,
    },
  };
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function Home({ media, pageInfo }) {
  const [animeArr, setAnimeArr] = useState(media);
  const [pageDetails, setPageDetails] = useState(pageInfo);
  const [isLoading, setIsLoading] = useState(false);
  const { query, push } = useRouter();
  const { page, season, seasonYear } = query;
  const classes = useStyles();

  const keywords = animeArr.map((anime) => anime.title.romaji);

  const fetchMore = async () => {
    if (!pageDetails.hasNextPage) return;
    setIsLoading(true);

    const data = await fetchQuery(
      pageDetails.currentPage + 1,
      season,
      seasonYear
    );

    if (!data) {
      setIsLoading(false);
      return;
    }

    const { pageInfo, media } = data.data.Page;
    let newArr = [...animeArr];

    media.forEach((animeToAdd) => {
      let isUnique = newArr.every(
        (includedAnime) => includedAnime.id !== animeToAdd.id
      );
      if (isUnique) newArr.push(animeToAdd);
    });

    setAnimeArr(newArr);
    setPageDetails(pageInfo);
    setIsLoading(false);
  };

  useEffect(async () => {
    if (!Object.keys(query).length) return;

    setIsLoading(true);
    const data = await fetchQuery(page, season, seasonYear);
    if (!data) {
      setIsLoading(false);
      return;
    }

    const { pageInfo, media } = data.data.Page;
    setAnimeArr(media);
    setPageDetails(pageInfo);
    setIsLoading(false);
  }, [page, season, seasonYear]);

  const seasonLink = (value) => {
    let str = '/?';
    if (seasonYear) str += `seasonYear=${seasonYear}&`;
    str += `season=${value}`;
    push(str);
  };

  const seasonYearLink = (value) => {
    let str = '/?';
    if (season) str += `season=${season}&`;
    str += `seasonYear=${value}`;
    push(str);
  };

  const yearList = () => {
    let arr = [];
    let start = new Date().getFullYear() + 1;
    for (let i = start; i >= 1940; i--) {
      let jsx = (
        <MenuItem value={i} key={i}>
          {i}
        </MenuItem>
      );
      arr.push(jsx);
    }
    return arr;
  };

  return (
    <div className={styles.container}>
      <Head>
        <meta name="description" content="Anime list database" />
        <meta
          name="keywords"
          content={`anime list,anime database,${keywords}`}
        />
        <meta name="author" content="pomubry" />
        <title>Next.js Ani-Database</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className={styles.title}>Trending Anime</h1>

      <form>
        <FormControl className={classes.formControl}>
          <InputLabel id="seasonLabel">Season</InputLabel>
          <Select
            labelId="seasonLabel"
            id="season"
            value={season || animeArr[0].season}
            onChange={(e) => seasonLink(e.target.value)}
          >
            <MenuItem value="WINTER">Winter</MenuItem>
            <MenuItem value="SPRING">Spring</MenuItem>
            <MenuItem value="SUMMER">Summer</MenuItem>
            <MenuItem value="FALL">Fall</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id="seasonYearLabel">Year</InputLabel>
          <Select
            labelId="seasonYearLabel"
            id="seasonYear"
            value={seasonYear || animeArr[0].seasonYear}
            onChange={(e) => seasonYearLink(e.target.value)}
          >
            {yearList()}
          </Select>
        </FormControl>
      </form>

      <section className={styles.animeContainer}>
        {animeArr &&
          animeArr.map((anime) => <Anime anime={anime} key={anime.id} />)}
      </section>
      {isLoading && <p>Loading. . .</p>}
      {!isLoading && pageDetails.hasNextPage && (
        <button onClick={fetchMore}>fetchMore</button>
      )}
    </div>
  );
}
