import Link from "next/link";
import { useFragment, type FragmentType } from "@/lib/gql";
import { DataFragment } from "@/lib/query/queryAnime";

import ListItem from "./ListItem";
import Heading from "./Heading";
import DateInfo from "./DateInfo";

interface PropType {
  anime: FragmentType<typeof DataFragment>;
}

export default function Data(props: PropType) {
  const anime = useFragment(DataFragment, props.anime);

  const studioGroup = anime.studios?.nodes?.reduce(
    (acc, cur) => {
      if (!cur) return acc;
      cur.isAnimationStudio ? acc.studios.push(cur) : acc.producers.push(cur);
      return acc;
    },
    {
      studios: [],
      producers: [],
    } as {
      studios: typeof anime.studios.nodes;
      producers: typeof anime.studios.nodes;
    },
  );

  return (
    <ul className="flex min-h-full flex-col justify-around rounded-md p-3 shadow-xl bg-card">
      {!!anime.format && (
        <ListItem>
          <Heading>Format</Heading>
          <p>{anime.format}</p>
        </ListItem>
      )}

      {!!anime.episodes && (
        <ListItem>
          <Heading>Episodes</Heading>
          <p>{anime.episodes}</p>
        </ListItem>
      )}

      {!!anime.duration && (
        <ListItem>
          <Heading>Episode Duration</Heading>
          <p>{anime.duration} minutes</p>
        </ListItem>
      )}

      {!!anime.status && (
        <ListItem>
          <Heading>Status</Heading>
          <p>{anime.status}</p>
        </ListItem>
      )}

      {anime.startDate && <DateInfo name="Start Date" date={anime.startDate} />}

      {anime.endDate && <DateInfo name="End Date" date={anime.endDate} />}

      {(!!anime.season || !!anime.seasonYear) && (
        <ListItem>
          <Heading>Season</Heading>
          <p>
            {anime.season} {anime.seasonYear}
          </p>
        </ListItem>
      )}

      {!!anime.averageScore && (
        <ListItem>
          <Heading>Average Score</Heading>
          <p>{anime.averageScore}%</p>
        </ListItem>
      )}

      {!!anime.meanScore && (
        <ListItem>
          <Heading>Mean Score</Heading>
          <p>{anime.meanScore}%</p>
        </ListItem>
      )}

      {!!anime.popularity && (
        <ListItem>
          <Heading>Popularity</Heading>
          <p>{anime.popularity}</p>
        </ListItem>
      )}

      {!!anime.favourites && (
        <ListItem>
          <Heading>Favourites</Heading>
          <p>{anime.favourites}</p>
        </ListItem>
      )}

      {!!studioGroup?.studios.length && (
        <ListItem>
          <Heading>Studios</Heading>
          {studioGroup.studios.map((studio) => {
            if (!studio) return null;
            return (
              <p key={studio.id}>
                <Link
                  className="font-extrabold text-blue hover:underline"
                  href={`/studio/${studio.id}`}
                >
                  {studio.name}
                </Link>
              </p>
            );
          })}
        </ListItem>
      )}

      {!!studioGroup?.studios.length && (
        <ListItem>
          <Heading>Producers</Heading>
          {studioGroup.producers.map((studio) => {
            if (!studio) return null;
            return <p key={studio.id}>{studio.name}</p>;
          })}
        </ListItem>
      )}

      {!!anime.source && (
        <ListItem>
          <Heading>Source</Heading>
          <p>{anime.source}</p>
        </ListItem>
      )}

      {!!anime.genres?.length && (
        <ListItem>
          <Heading>Genres</Heading>
          {anime.genres.join(", ")}
        </ListItem>
      )}

      {!!anime.title?.romaji && (
        <ListItem>
          <Heading>Romaji</Heading>
          <p>{anime.title.romaji}</p>
        </ListItem>
      )}

      {!!anime.title?.english && (
        <ListItem>
          <Heading>English</Heading>
          <p>{anime.title.english}</p>
        </ListItem>
      )}

      {!!anime.title?.native && (
        <ListItem>
          <Heading>Native</Heading>
          <p>{anime.title.native}</p>
        </ListItem>
      )}

      {!!anime.synonyms?.length && (
        <ListItem>
          <Heading>Synonyms</Heading>
          {anime.synonyms.map((synonym) =>
            synonym ? <p key={synonym}>{synonym}</p> : null,
          )}
        </ListItem>
      )}
    </ul>
  );
}
