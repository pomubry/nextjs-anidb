import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { usePathname, useRouter as useNavigation } from "next/navigation";
import { objToUrlSearchParams } from "./utils";
import type { ObjectQuery } from "./types";

export function useNewURL(query: ObjectQuery) {
  const router = useRouter();
  const navigation = useNavigation();
  const pathname = usePathname();

  useEffect(() => {
    // Clean URL search params
    if (!router.isReady) return;

    const newURL = pathname + objToUrlSearchParams(query);

    if (router.asPath !== newURL) {
      navigation.replace(newURL, { scroll: false });
    }
  }, [router, navigation, pathname, query]);
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
