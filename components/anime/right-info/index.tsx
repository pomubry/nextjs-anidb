import { useQuery } from "@tanstack/react-query";
import InfoHeadTitle from "../InfoHeadTitle";
import Relations from "./Relations";
import Characters from "./Characters";
import Themes from "./Themes";
import Staff from "./Staff";
import StatusDistribution from "./StatusDistribution";
import Watch from "./Watch";
import Recommendations from "./Recommendations";

import { FragmentType, useFragment } from "../../../lib/gql";
import { RightInfoFragment } from "../../../lib/query/queryAnime";

interface MALThemes {
  data: {
    openings: string[];
    endings: string[];
  };
}

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
  const { data } = useQuery({
    refetchOnWindowFocus: false,
    retry: 1,
    queryKey: ["idMal", anime.idMal],
    queryFn: async () => {
      const res = await fetch(
        `https://api.jikan.moe/v4/anime/${anime.idMal}/themes`
      );
      return (await res.json()) as MALThemes;
    },
  });

  let isNotReversed =
    anime.streamingEpisodes &&
    anime.streamingEpisodes[0]?.title?.includes("Episode 1 ");
  let sortedEpisodes = isNotReversed
    ? anime.streamingEpisodes
    : anime.streamingEpisodes?.reverse();

  return (
    <>
      {/* This component contains 6 parts: 
          Relations, Characters, Staff, StatusDistribution, Watch, Trailer, & Recommendations */}

      {!!anime.relations?.edges?.length && (
        <section>
          <InfoHeadTitle title="Relations" />
          <CustomBox>
            <Relations relations={anime.relations} />
          </CustomBox>
        </section>
      )}

      {!!anime.characters?.edges?.length && (
        <section>
          <InfoHeadTitle title="Characters" />
          <CustomBox>
            <Characters characters={anime.characters} />
          </CustomBox>
        </section>
      )}

      {(!!data?.data.openings.length || !!data?.data.endings.length) && (
        <section>
          <InfoHeadTitle title="Themes" />
          <div className="mb-10 flex gap-3">
            {!!data.data.openings.length && (
              <Themes themes={data.data.openings} heading="Openings" />
            )}
            {!!data.data.endings.length && (
              <Themes themes={data.data.endings} heading="Endings" />
            )}
          </div>
        </section>
      )}

      {!!anime.staff?.edges?.length && (
        <section>
          <InfoHeadTitle title="Staff" />
          <CustomBox className="sm:grid-cols-[1fr,1fr]">
            <Staff staff={anime.staff} />
          </CustomBox>
        </section>
      )}

      {!!anime.stats?.statusDistribution?.length && (
        <section>
          <InfoHeadTitle title="Status Distribution" />
          <StatusDistribution stats={anime.stats} />
        </section>
      )}

      {!!sortedEpisodes?.length && (
        <section>
          <InfoHeadTitle title="Watch" />
          <ul className="my-2 mb-10 grid max-h-[400px] grid-cols-2 gap-2 overflow-y-scroll md:max-h-[600px]">
            {sortedEpisodes.map((episode) => {
              if (!episode || !episode.url) return null;
              return <Watch episode={episode} key={episode.url} />;
            })}
          </ul>
        </section>
      )}

      {anime.trailer?.site === "youtube" && (
        <section>
          <InfoHeadTitle title="Trailer" />
          <iframe
            src={`https://www.${anime.trailer.site}.com/embed/${anime.trailer.id}`}
            title="YouTube video player"
            allowFullScreen
            className="mb-10 aspect-video w-full"
          ></iframe>
        </section>
      )}

      {!!anime.recommendations?.nodes?.length && (
        <section>
          <InfoHeadTitle title="Recommendations" />
          <ul className="my-2 grid grid-cols-[1fr,1fr] gap-4 sm:grid-cols-[repeat(3,1fr)] md:grid-cols-[repeat(4,1fr)] lg:grid-cols-[repeat(5,1fr)]">
            <Recommendations rec={anime.recommendations} />
          </ul>
        </section>
      )}
    </>
  );
};

export default RightInfo;
