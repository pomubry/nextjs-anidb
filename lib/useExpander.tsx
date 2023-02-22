import { useState } from "react";

const useExpander = ({ maxNumber }: { maxNumber: number }) => {
  const [expanded, setExpanded] = useState(false);
  const handleExpand = () => setExpanded((prev) => !prev);

  return {
    sliceEnd: expanded ? undefined : maxNumber,
    expanded,
    handleExpand,
  };
};
export default useExpander;
