import { useRouter } from 'next/router';
import queryVariables from '../lib/query';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const SearchForm = () => {
  const { query, push } = useRouter();
  const { season, seasonYear } = query;
  const classes = useStyles();
  const { variables } = queryVariables();

  const seasonLink = (value) => {
    let str = '/?';
    str += `season=${value}`;
    if (seasonYear) str += `&seasonYear=${seasonYear}`;
    push(str);
  };

  const seasonYearLink = (value) => {
    let str = '/?';
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
    <form>
      <FormControl className={classes.formControl}>
        <InputLabel id="seasonLabel">Season</InputLabel>
        <Select
          labelId="seasonLabel"
          name="season"
          defaultValue={variables.season}
          value={season || variables.season}
          onChange={(e) => seasonLink(e.target.value)}
        >
          <MenuItem value="WINTER">Winter</MenuItem>
          <MenuItem value="SPRING">Spring</MenuItem>
          <MenuItem value="SUMMER">Summer</MenuItem>
          <MenuItem value="FALL">Fall</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="seasonYearLabel">Year</InputLabel>
        <Select
          labelId="seasonYearLabel"
          name="seasonYear"
          defaultValue={variables.seasonYear}
          value={seasonYear || variables.seasonYear}
          onChange={(e) => seasonYearLink(e.target.value)}
        >
          {yearList()}
        </Select>
      </FormControl>
    </form>
  );
};

export default SearchForm;
