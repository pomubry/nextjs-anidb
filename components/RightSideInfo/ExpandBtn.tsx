import { Button } from "@mui/material";

type handleExpand = () => void;

const ExpandBtn: React.FC<{ handleExpand: handleExpand }> = ({
  handleExpand,
}) => {
  return (
    <Button
      variant="outlined"
      sx={{ gridColumn: "1 / 3" }}
      onClick={handleExpand}
    >
      Expand
    </Button>
  );
};

export default ExpandBtn;
