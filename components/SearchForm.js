import { useRouter } from "next/router";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import queryVariables from "../lib/query";

const SearchForm = () => {
  const { query, push } = useRouter();
  const { season, seasonYear } = query;
  const { variables } = queryVariables();

  const seasonLink = (value) => {
    let str = "/?";
    str += `season=${value}`;
    if (seasonYear) str += `&seasonYear=${seasonYear}`;
    push(str);
  };

  const seasonYearLink = (value) => {
    let str = "/?";
    if (season) str += `season=${season}&`;
    str += `seasonYear=${value}`;
    push(str);
  };

  const yearList = () => {
    let arr = [];
    let start = new Date().getFullYear() + 1;
    for (let i = start; i >= 1940; i--) {
      let jsx = (
        <MenuItem value={i} key={i}>
          {i}
        </MenuItem>
      );
      arr.push(jsx);
    }
    return arr;
  };

  return (
    <Box sx={{ marginBottom: "3rem" }}>
      <FormControl>
        <InputLabel id="seasonLabel-label">Season</InputLabel>
        <Select
          labelId="seasonLabel-label"
          name="season"
          value={season || variables.season}
          label="Season"
          onChange={(e) => seasonLink(e.target.value)}
        >
          <MenuItem value="WINTER">Winter</MenuItem>
          <MenuItem value="SPRING">Spring</MenuItem>
          <MenuItem value="SUMMER">Summer</MenuItem>
          <MenuItem value="FALL">Fall</MenuItem>
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel id="seasonYearLabel">Year</InputLabel>
        <Select
          labelId="seasonYearLabel"
          name="seasonYear"
          value={seasonYear || variables.seasonYear}
          label="Year"
          onChange={(e) => seasonYearLink(e.target.value)}
        >
          {yearList()}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SearchForm;
