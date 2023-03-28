import InfoHeadTitle from "../InfoHeadTitle";
import Rankings from "./Rankings";
import Data from "./Data";
import Tags from "./Tags";
import StreamLinks from "./StreamLinks";
import { FragmentType, useFragment } from "@/lib/gql";
import { LeftInfoFragment } from "@/lib/query/queryAnime";

interface PropType {
  anime: FragmentType<typeof LeftInfoFragment>;
}

const LeftInfo = (props: PropType) => {
  const anime = useFragment(LeftInfoFragment, props.anime);

  return (
    <div className="area-anime-id grid items-center gap-4">
      {/* This component contains 4 parts: Rankings, Data, Tags, and Streaming Links */}

      {!!anime.rankings?.length && (
        <section className="area-rankings">
          <InfoHeadTitle title="Rankings" />
          <ul>
            {anime.rankings.map((rank) =>
              rank ? <Rankings rank={rank} key={rank.id} /> : null
            )}
          </ul>
        </section>
      )}

      <section className="area-data">
        <InfoHeadTitle title="Data" />
        <Data anime={anime} />
      </section>

      {!!anime.tags?.length && (
        <section className="area-tags">
          <InfoHeadTitle title="Tags" />
          <ul>
            {anime.tags.map((tag) =>
              tag ? <Tags tags={tag} key={tag.id} /> : null
            )}
          </ul>
        </section>
      )}

      {!!anime.externalLinks?.length && (
        <section className="area-streamlinks">
          <InfoHeadTitle title="External & Streaming links" />
          {anime.externalLinks.map((link) =>
            link ? <StreamLinks link={link} key={link.id} /> : null
          )}
        </section>
      )}
    </div>
  );
};

export default LeftInfo;
