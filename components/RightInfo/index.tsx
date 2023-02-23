import { FragmentType, useFragment } from "../../lib/gql";
import { RightInfoFragment } from "../../lib/query/queryAnime";
import { Head2 } from "../LeftInfo";
import Relations from "./Relations";
import Characters from "./Characters";
import Staff from "./Staff";
import StatusDistribution from "./StatusDistribution";
import Watch from "./Watch";
import Recommendations from "./Recommendations";

interface BoxType {
  children: React.ReactNode;
  className?: string;
}

interface PropType {
  anime: FragmentType<typeof RightInfoFragment>;
}

const CustomBox = ({ children, className }: BoxType) => {
  return (
    <ul
      className={`relative mb-10 grid grid-cols-[1fr] gap-3 md:grid-cols-[1fr,1fr] ${className}`}
    >
      {children}
    </ul>
  );
};

const RightInfo = (props: PropType) => {
  const anime = useFragment(RightInfoFragment, props.anime);

  let isNotReversed =
    anime.streamingEpisodes &&
    anime.streamingEpisodes[0]?.title?.includes("Episode 1 ");
  let sortedEpisodes = isNotReversed
    ? anime.streamingEpisodes
    : anime.streamingEpisodes?.reverse();

  return (
    <div>
      {/* This component contains 6 parts: 
          Relations, Characters, Staff, StatusDistribution, Watch, Trailer, & Recommendations */}

      {!!anime.relations?.edges?.length && (
        <>
          <Head2 title="Relations" />
          <CustomBox>
            <Relations relations={anime.relations} />
          </CustomBox>
        </>
      )}

      {!!anime.characters?.edges?.length && (
        <>
          <Head2 title="Characters" />
          <CustomBox>
            <Characters characters={anime.characters} />
          </CustomBox>
        </>
      )}

      {!!anime.staff?.edges?.length && (
        <>
          <Head2 title="Staff" />
          <CustomBox className="sm:grid-cols-[1fr,1fr]">
            <Staff staff={anime.staff} />
          </CustomBox>
        </>
      )}

      {!!anime.stats?.statusDistribution?.length && (
        <>
          <Head2 title="Status Distribution" />
          <StatusDistribution stats={anime.stats} />
        </>
      )}

      {!!sortedEpisodes?.length && (
        <>
          <Head2 title="Watch" />
          <ul className="my-2 mb-10 grid max-h-[400px] grid-cols-2 gap-2 overflow-y-scroll md:max-h-[600px]">
            {sortedEpisodes.map((episode) => {
              if (!episode || !episode.url) return null;
              return <Watch episode={episode} key={episode.url} />;
            })}
          </ul>
        </>
      )}

      {anime.trailer?.site === "youtube" && (
        <>
          <Head2 title="Trailer" />
          <iframe
            src={`https://www.${anime.trailer.site}.com/embed/${anime.trailer.id}`}
            title="YouTube video player"
            allowFullScreen
            className="mb-10 aspect-video w-full"
          ></iframe>
        </>
      )}

      {!!anime.recommendations?.nodes?.length && (
        <>
          <Head2 title="Recommendations" />
          <ul className="my-2 grid grid-cols-[1fr,1fr] gap-4 sm:grid-cols-[repeat(3,1fr)] md:grid-cols-[repeat(4,1fr)] lg:grid-cols-[repeat(5,1fr)]">
            <Recommendations rec={anime.recommendations} />
          </ul>
        </>
      )}
    </div>
  );
};

export default RightInfo;
