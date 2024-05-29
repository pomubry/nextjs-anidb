import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import SectionHeader from "@/components/generic/SectionHeader";
import Relations from "./Relations";
import Characters from "./Characters";
import Themes from "./Themes";
import Staff from "./Staff";
import StatusDistribution from "./StatusDistribution";
import Watch from "./Watch";
import Recommendations from "./Recommendations";
import InfoHeadTitle from "../InfoHeadTitle";

import { type FragmentType, useFragment } from "@/lib/gql";
import { RightInfoFragment } from "@/lib/query/queryAnime";
import { cleanStaffQuery, objToUrlSearchParams } from "@/lib/utils";
import { staffSchema, themeSchema } from "@/lib/validation";
import type { StaffSchemaType } from "@/lib/types";

interface PropType {
  anime: FragmentType<typeof RightInfoFragment>;
  isPlaceholderData: boolean;
}

export default function RightInfo(props: PropType) {
  const router = useRouter();
  const pathname = usePathname();
  const anime = useFragment(RightInfoFragment, props.anime);
  const { data } = useQuery({
    refetchOnWindowFocus: false,
    retry: 1,
    queryKey: ["idMal", anime.idMal],
    queryFn: async () => {
      if (!anime.idMal) return null;

      const res = await fetch(
        `https://api.jikan.moe/v4/anime/${anime.idMal}/themes`,
      );

      return themeSchema.parse(await res.json());
    },
  });

  function staffHandler(query: keyof StaffSchemaType, forward: boolean) {
    const staff = staffSchema.parse(router.query);
    forward ? staff[query]++ : staff[query]--;

    const cleanQuery = cleanStaffQuery(staff);
    const href = pathname + objToUrlSearchParams(cleanQuery);

    router.push(href, undefined, { shallow: true, scroll: false });
  }

  const isNotReversed =
    anime.streamingEpisodes &&
    anime.streamingEpisodes[0]?.title?.includes("Episode 1 ");

  const sortedEpisodes = isNotReversed
    ? anime.streamingEpisodes
    : anime.streamingEpisodes?.reverse();

  return (
    <>
      {/* This component contains 6 parts:
                Relations, Characters, Staff, StatusDistribution, Watch, Trailer, & Recommendations */}
      {!!anime.relations?.edges?.length && (
        <section>
          <InfoHeadTitle title="Relations" />
          <Relations relations={anime.relations} />
        </section>
      )}

      {!!anime.characters?.edges?.length && (
        <section>
          <SectionHeader
            title="Characters"
            total={anime.characters.pageInfo?.total}
            currentPage={anime.characters.pageInfo?.currentPage}
            hasNextPage={anime.characters.pageInfo?.hasNextPage}
            isPlaceholderData={props.isPlaceholderData}
            forwardHandler={() => staffHandler("cp", true)}
            previousHandler={() => staffHandler("cp", false)}
          />
          <Characters
            characters={anime.characters}
            isPlaceholderData={props.isPlaceholderData}
          />
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
          <SectionHeader
            title="Staff"
            total={anime.staff.pageInfo?.total}
            currentPage={anime.staff.pageInfo?.currentPage}
            hasNextPage={anime.staff.pageInfo?.hasNextPage}
            isPlaceholderData={props.isPlaceholderData}
            forwardHandler={() => staffHandler("sp", true)}
            previousHandler={() => staffHandler("sp", false)}
          />
          <Staff
            staff={anime.staff}
            isPlaceholderData={props.isPlaceholderData}
          />
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
}
