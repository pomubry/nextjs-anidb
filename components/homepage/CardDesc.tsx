import DOMPurify from "dompurify";
import { FragmentType, useFragment } from "../../lib/gql";
import { CardDescFragment } from "../../lib/query/queryHome";

interface PropType {
  anime: FragmentType<typeof CardDescFragment>;
}

const Spacer = () => <span> • </span>;

const SpanDetails = ({ children }: { children: React.ReactNode }) => (
  <span className="text-xs text-blue-700 dark:text-blue-300 min-[767px]:text-sm">
    {children}
  </span>
);

const CardDesc = (props: PropType) => {
  const anime = useFragment(CardDescFragment, props.anime);

  const cleanHtml = DOMPurify.sanitize(
    anime.description ?? "<i>There are no descriptions for this anime yet.</i>",
    { USE_PROFILES: { html: true } }
  );

  return (
    <div className="flex flex-col overflow-x-scroll p-3">
      <h4 className="text-sm font-bold text-purple-700 dark:text-purple-300 min-[767px]:text-base">
        {anime.season} {anime.seasonYear}
      </h4>
      <div>
        {!!anime.format && (
          <>
            <SpanDetails>
              {anime.format === "TV" ? "TV Show" : anime.format}
            </SpanDetails>
            <Spacer />
          </>
        )}

        {!!anime.episodes && (
          <>
            <SpanDetails>{`${anime.episodes} episodes`}</SpanDetails>
            <Spacer />
          </>
        )}

        <SpanDetails>Trend Score: {anime.trending ?? "N/A"}</SpanDetails>
      </div>
      <p
        className="flex-1 overflow-y-scroll pt-3 text-sm min-[767px]:text-base"
        dangerouslySetInnerHTML={{
          __html: cleanHtml,
        }}
      />
      <ul className="flex gap-2 overflow-x-scroll pt-3">
        {anime.genres?.map((genre) => {
          if (!genre) return null;
          return (
            <li
              key={genre}
              className="whitespace-nowrap rounded-md bg-slate-900 px-2 text-xs text-blue-400 dark:bg-slate-800 min-[767px]:text-sm"
            >
              {genre}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CardDesc;
