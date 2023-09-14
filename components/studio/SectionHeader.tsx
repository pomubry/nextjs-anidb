import { useRouter } from "next/router";
import { BsArrowLeftSquareFill } from "react-icons/bs";
import { cleanStudioQuery } from "@/lib/utils";
import { studioQuerySchema } from "@/lib/validation";

interface Props {
  currentPage: number | null | undefined;
  hasNextPage: boolean | null | undefined;
  total: number | null | undefined;
  isPreviousData: boolean;
}

export default function SectionHeader(props: Props) {
  const currentPage = props.currentPage || 1;
  const router = useRouter();

  const pageHandler = ({ forward }: { forward: boolean }) => {
    const res = studioQuerySchema.parse(router.query);
    res["pg"] = forward ? res.pg + 1 : res.pg - 1;

    const cleanQuery = cleanStudioQuery(res);

    router.push(
      {
        pathname: `/studio/${res.id}`,
        query: cleanQuery,
      },
      undefined,
      { shallow: true, scroll: false },
    );
  };

  return (
    <div className="my-5 flex items-center gap-5">
      <h2 className="text-2xl font-extrabold">Anime Works</h2>
      <div className="flex items-center gap-2">
        <button
          onClick={() => pageHandler({ forward: false })}
          disabled={props.isPreviousData || currentPage <= 1}
          aria-label="View previous works"
          className={`text-3xl font-extrabold ${
            currentPage === 1
              ? "opacity-50 text-purple"
              : "text-purple hover:opacity-80"
          } `}
        >
          <BsArrowLeftSquareFill />
        </button>
        <span>
          {currentPage} / {props.hasNextPage ? props.total : currentPage}
        </span>
        <button
          onClick={() => pageHandler({ forward: true })}
          disabled={props.isPreviousData || !props.hasNextPage}
          aria-label="View more works"
          className={`rotate-180 text-3xl font-extrabold ${
            props.hasNextPage
              ? "text-purple hover:opacity-80"
              : "opacity-50 text-purple"
          }`}
        >
          <BsArrowLeftSquareFill />
        </button>
      </div>
    </div>
  );
}
