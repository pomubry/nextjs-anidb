import { useEffect } from "react";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { useMachine, normalizeProps } from "@zag-js/react";
import * as pagination from "@zag-js/pagination";

import { cleanClientHomeSearchParams, objToUrlSearchParams } from "@/lib/utils";
import { clientHomeSearchParamsSchema } from "@/lib/validation";

interface Props {
  defaultPage: number;
  count: number;
}

export default function Pagination(props: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const [state, send] = useMachine(
    pagination.machine({
      id: "1",
      page: props.defaultPage,
      count: props.count,
      pageSize: 10,
      siblingCount: 2,
    }),
  );

  const api = pagination.connect(state, send, normalizeProps);

  function setPage(pg: number) {
    const { pg: page, ...restQuery } = router.query;
    const res = clientHomeSearchParamsSchema.parse({ pg, ...restQuery });
    const query = cleanClientHomeSearchParams(res);

    const href = pathname + objToUrlSearchParams(query);

    router.push(href, undefined, { shallow: true, scroll: false });
  }

  useEffect(() => {
    api.setPage(props.defaultPage);
    api.setCount(props.count);
  }, [api, props]);

  return (
    api.totalPages > 1 && (
      <nav {...api.rootProps} className="mt-16 grid place-content-center">
        <ul className="flex items-center gap-3">
          {api.pages.map((page, i) => {
            if (page.type === "page")
              return (
                <li key={page.value}>
                  <button
                    {...api.getItemProps(page)}
                    onClick={() => setPage(page.value)}
                    disabled={props.defaultPage === page.value}
                    className={`grid place-content-center rounded-lg p-2 text-xs font-semibold duration-300 sm:h-10 sm:w-10 sm:p-3 sm:text-sm ${
                      props.defaultPage === page.value
                        ? "bg-blue-300 text-slate-900"
                        : "hover:bg-blue-400 hover:text-slate-900"
                    }`}
                  >
                    {page.value}
                  </button>
                </li>
              );
            else
              return (
                <li key={`ellipsis-${i}`}>
                  <span
                    {...api.getEllipsisProps({ index: i })}
                    className="select-none"
                  >
                    &#8230;
                  </span>
                </li>
              );
          })}
        </ul>
      </nav>
    )
  );
}
