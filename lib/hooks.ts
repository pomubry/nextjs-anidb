import { useState } from "react";
import { usePathname, useRouter as useNavigation } from "next/navigation";
import { objToUrlSearchParams } from "./utils";
import type { ObjectQuery } from "./types";

export function useNewURL() {
  const navigation = useNavigation();
  const pathname = usePathname();

  function replace(currentURL: string, query: ObjectQuery) {
    const newURL = pathname + objToUrlSearchParams(query);

    if (currentURL !== newURL) {
      navigation.replace(newURL, { scroll: false });
    }
  }

  return { replace, pathname };
}

export function useExpander({ maxNumber }: { maxNumber: number }) {
  const [expanded, setExpanded] = useState(false);

  function handleExpand() {
    return setExpanded((prev) => !prev);
  }

  return {
    sliceEnd: expanded ? undefined : maxNumber,
    expanded,
    handleExpand,
  };
}
