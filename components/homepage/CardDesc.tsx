import { sanitize } from "isomorphic-dompurify";
import { useFragment, type FragmentType } from "@/lib/gql";
import { CardDescFragment } from "@/lib/query/queryHome";

interface PropType {
  anime: FragmentType<typeof CardDescFragment>;
}

function Spacer() {
  return <span> • </span>;
}

function SpanDetails({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-semibold text-blue min-[767px]:text-sm">
      {children}
    </span>
  );
}

export default function CardDesc(props: PropType) {
  const anime = useFragment(CardDescFragment, props.anime);

  const cleanHtml = sanitize(
    anime.description ?? "<i>There are no descriptions for this anime yet.</i>",
    { USE_PROFILES: { html: true } },
  );

  return (
    <div className="flex flex-col overflow-x-scroll p-3">
      <h2 className="text-sm font-semibold text-purple min-[767px]:text-base">
        {anime.season} {anime.seasonYear}
      </h2>
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
        className="flex-1 overflow-y-scroll pt-3 text-sm shadow-xl"
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
              className="whitespace-nowrap rounded-md bg-slate-100 px-2 text-xs font-semibold shadow-lg text-blue dark:bg-slate-800 min-[767px]:text-sm"
            >
              {genre}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
