import { useState } from "react";
import { usePathname, useRouter as useNavigation } from "next/navigation";
import { objToUrlSearchParams } from "./utils";

export function useNewURL() {
  const navigation = useNavigation();
  const pathname = usePathname();

  function replace(currentURL: string, query: URLSearchParams) {
    const newURL =
      pathname + objToUrlSearchParams(query as unknown as URLSearchParams);

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
