import { useState } from "react";
import { Button } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const useExpander = <T,>({
  arr,
  maxNumber,
}: {
  arr: T[];
  maxNumber: number;
}) => {
  const [expanded, setExpanded] = useState(false);

  return {
    sliceEnd: expanded ? undefined : maxNumber,
    ExpandButton: () =>
      arr.length > maxNumber ? (
        <Button
          variant="outlined"
          sx={{
            gridColumn: { md: "span 2" },
            marginInline: "auto",
          }}
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          {expanded ? "Hide" : "Show More"}
        </Button>
      ) : (
        <></>
      ),
  };
};
export default useExpander;
