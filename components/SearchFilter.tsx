import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const yearList = () => {
  let arr = [
    <MenuItem value="ANY" key="yearMenuItem">
      Any
    </MenuItem>,
  ];
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

interface SeasonPropType {
  season: string;
  setSeason: React.Dispatch<React.SetStateAction<string>>;
}

interface SeasonYearPropType {
  seasonYear: number | string;
  setSeasonYear: React.Dispatch<React.SetStateAction<number | string>>;
}

interface SearchFilterProp {
  seasonProp: SeasonPropType;
  seasonYearProp: SeasonYearPropType;
}

const SearchFilter: React.FC<SearchFilterProp> = ({
  seasonProp,
  seasonYearProp,
}) => {
  return (
    <Box mb={2}>
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel id="seasonLabel-label">Season</InputLabel>
        <Select
          labelId="seasonLabel-label"
          name="season"
          value={seasonProp.season}
          label="Season"
          onChange={(e) => seasonProp.setSeason(e.target.value)}
        >
          <MenuItem value="ANY">Any</MenuItem>
          <MenuItem value="WINTER">Winter</MenuItem>
          <MenuItem value="SPRING">Spring</MenuItem>
          <MenuItem value="SUMMER">Summer</MenuItem>
          <MenuItem value="FALL">Fall</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 120, marginLeft: 1 }}>
        <InputLabel id="seasonYearLabel">Year</InputLabel>
        <Select
          labelId="seasonYearLabel"
          name="seasonYear"
          value={seasonYearProp.seasonYear}
          label="Year"
          onChange={(e) => seasonYearProp.setSeasonYear(e.target.value)}
        >
          {yearList()}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SearchFilter;
