import Image from "next/image";
import { BiLinkExternal } from "react-icons/bi";
import { FragmentType, useFragment } from "../../../lib/gql";
import { StreamingEpisodesFragment } from "../../../lib/query/queryAnime";

interface PropType {
  episode: FragmentType<typeof StreamingEpisodesFragment>;
}

const Watch = (props: PropType) => {
  const episode = useFragment(StreamingEpisodesFragment, props.episode);

  return (
    <li className="relative aspect-video" key={episode.url}>
      <Image
        src={episode.thumbnail ?? "Image source: N/A"}
        alt={episode.title ?? "Image alt: N/A"}
        fill
        className="object-cover"
      />
      <div className="absolute bottom-0 w-full bg-slate-900/70 p-2 text-slate-100">
        <h3 className="flex items-center text-sm hover:underline md:text-base">
          <a
            title={episode.title ?? "Title: N/A"}
            href={episode.url ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 truncate"
          >
            {episode.title ?? "Title: N/A"}
          </a>
          <BiLinkExternal className="text-lg" />
        </h3>
      </div>
    </li>
  );
};

export default Watch;
