import { useMemo, useState } from "react";
import { useRouter } from "next/router";
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
  IconButton,
} from "@mui/material";
import SearchFilter from "./Mui/SearchFilter";

const SearchForm = ({ queryProp }) => {
  const [search, setSearch] = useState(queryProp?.search || "");
  const [season, setSeason] = useState(queryProp?.season || "ANY");
  const [seasonYear, setSeasonYear] = useState(queryProp?.seasonYear || "ANY");
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();

  // To identify where <SearchFilterWithProps/> will render.
  const theme = useTheme();
  const lessThanSmall = useMediaQuery(theme.breakpoints.down("sm"));

  // Wrapped it in a useMemo since the text input would lag when typing or deleting text
  const SearchFilterWithProps = useMemo(() => {
    return function jsxWithProp() {
      return (
        <SearchFilter
          seasonProp={{ season, setSeason }}
          seasonYearProp={{ seasonYear, setSeasonYear }}
        />
      );
    };
  }, [season, seasonYear]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let variables = { season, seasonYear, search };
    const ignoredValues = ["", "ANY"];
    let str = "/search?";

    for (let key in variables) {
      if (!ignoredValues.includes(variables[key])) {
        str += `${key}=${variables[key]}&`;
      }
    }
    router.push(str.slice(0, str.lastIndexOf("&")));
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Box mb={2} sx={{ display: "flex" }}>
        <FormControl sx={{ marginRight: "auto" }}>
          <InputLabel htmlFor="outlined-adornment-amount">
            Search Anime
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            label="Search Anime"
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            startAdornment={
              <InputAdornment position="start" sx={{ marginRight: 0 }}>
                <IconButton aria-label="submit" type="submit">
                  <SearchRoundedIcon />
                </IconButton>
              </InputAdornment>
            }
            sx={{ paddingLeft: 0.5 }}
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
          <SearchFilterWithProps />
        )}
      </Box>
      {expanded && lessThanSmall && <SearchFilterWithProps />}
    </Box>
  );
};

export default SearchForm;
