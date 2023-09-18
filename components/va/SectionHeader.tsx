import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { BsArrowLeftSquareFill } from "react-icons/bs";

import { cleanStaffQuery, objToUrlSearchParams } from "@/lib/utils";
import { staffSchema } from "@/lib/validation";

interface QueryHandlerType {
  cmd: "PREVIOUS" | "NEXT";
  query: "cp" | "sp";
  currentPage: number;
}

interface PropType {
  heading: "Characters" | "Anime Staff Roles";
  currentPage: number | null | undefined;
  hasNextPage: boolean | null | undefined;
  total: number | null | undefined;
  isPreviousData: boolean;
  query: "cp" | "sp";
}

export default function SectionHeader(props: PropType) {
  const router = useRouter();
  const pathname = usePathname();

  function pageHandler({ cmd, query, currentPage }: QueryHandlerType) {
    const staff = staffSchema.parse(router.query);
    staff[query] = cmd === "NEXT" ? currentPage + 1 : currentPage - 1;

    const cleanQuery = cleanStaffQuery(staff);
    const href = pathname + objToUrlSearchParams(cleanQuery);

    router.push(href, undefined, { shallow: true, scroll: false });
  }

  const currentPage = props.currentPage || 1;

  return (
    <div className="my-5 flex items-center gap-5">
      <h2 className="text-2xl font-extrabold">{props.heading}</h2>
      <div className="flex items-center gap-2">
        <button
          onClick={() =>
            pageHandler({
              cmd: "PREVIOUS",
              query: props.query,
              currentPage,
            })
          }
          disabled={props.isPreviousData || currentPage <= 1}
          aria-label={`View previous ${props.heading}`}
          className={`text-3xl font-extrabold duration-300 ${
            currentPage === 1
              ? "opacity-50 text-purple"
              : "opacity-80 text-purple"
          } `}
        >
          <BsArrowLeftSquareFill />
        </button>
        <span>
          {currentPage} / {props.hasNextPage ? props.total : currentPage}
        </span>
        <button
          onClick={() =>
            pageHandler({
              cmd: "NEXT",
              query: props.query,
              currentPage,
            })
          }
          disabled={props.isPreviousData || !props.hasNextPage}
          aria-label={`View more ${props.heading}`}
          className={`rotate-180 text-3xl font-extrabold duration-300 ${
            props?.hasNextPage
              ? "opacity-80 text-purple"
              : "opacity-50 text-purple"
          }`}
        >
          <BsArrowLeftSquareFill />
        </button>
      </div>
    </div>
  );
}
