import { useState } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import {
  Box,
  FormControl,
  InputLabel,
  InputAdornment,
  OutlinedInput,
  ToggleButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SearchFilter from "./Mui/SearchFilter";

const SearchForm = () => {
  const [searchStr, setSearchStr] = useState("");
  const [expanded, setExpanded] = useState(false);

  // To identify if <TextField/> will be `fullWidth` or not
  const theme = useTheme();
  const lessThanSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box>
      <Box mb={2} sx={{ display: "flex" }}>
        <FormControl sx={{ marginRight: "auto" }}>
          <InputLabel htmlFor="outlined-adornment-amount">
            Search Anime
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={searchStr}
            onChange={(e) => setSearchStr(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <SearchRoundedIcon />
              </InputAdornment>
            }
            label="Search Anime"
          />
        </FormControl>

        {lessThanSmall ? (
          <ToggleButton
            sx={{ marginLeft: 1 }}
            value="check"
            selected={expanded}
            onChange={() => setExpanded((e) => !e)}
          >
            {expanded ? <FilterListOffIcon /> : <FilterListIcon />}
          </ToggleButton>
        ) : (
          <SearchFilter />
        )}
      </Box>
      {expanded && lessThanSmall && <SearchFilter />}
    </Box>
  );
};

export default SearchForm;
