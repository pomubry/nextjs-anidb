import CharacterCard from "./CharacterCard";
import SectionHeader from "./SectionHeader";
import { FragmentType, useFragment } from "@/lib/gql";
import { VACharactersFragment } from "@/lib/query/queryVoiceActor";

interface PropType {
  characterMedia: FragmentType<typeof VACharactersFragment>;
  isPreviousData: boolean;
}

const VACharacters = (props: PropType) => {
  const characterMedia = useFragment(
    VACharactersFragment,
    props.characterMedia
  );

  const chars =
    characterMedia.edges?.reduce((acc, cur) => {
      if (!cur) return acc;
      const year = cur?.node?.startDate?.year || 9999;
      const arr = acc[year];
      return { ...acc, [year]: arr ? [...arr, cur] : [cur] };
    }, {} as { [key: number]: typeof characterMedia.edges }) || {};
  const charsKeys = Object.keys(chars).sort((a, b) => +b - +a);

  if (charsKeys.length < 1) return null;
  if (!characterMedia.pageInfo) return null;

  return (
    <section>
      <SectionHeader
        currentPage={characterMedia.pageInfo.currentPage}
        hasNextPage={characterMedia.pageInfo.hasNextPage}
        total={characterMedia.pageInfo.total}
        heading="Characters"
        isPreviousData={props.isPreviousData}
        query="cp"
      />

      {charsKeys.map((yr) => {
        const year = +yr;
        return (
          <div key={year} className="mb-10">
            <p className="text-right text-2xl">
              {year === 9999 ? "To Be Announced" : year}
            </p>
            <ul className="my-2 flex gap-2 overflow-scroll md:flex-wrap md:gap-5 md:overflow-visible">
              {chars?.[year].map((char) => {
                if (!char) return null;
                const key = char.id || JSON.stringify(char);
                return <CharacterCard char={char} key={key} />;
              })}
            </ul>
          </div>
        );
      })}
    </section>
  );
};
export default VACharacters;
