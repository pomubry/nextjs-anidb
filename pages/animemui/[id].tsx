import type { NextPage } from "next";
import { Button } from "@mui/material";
import fetchQuery from "../../lib/fetchQueryts";
import fetchQueryId from "../../lib/fetchQueryID";

const Anime: NextPage = () => {
  const handleFetch = async () => {
    // const { variables, pageInfo, media, error } = await fetchQuery({});
    // if (error) {
    //   return console.log(error.message);
    // } else {
    //   return console.log(variables, pageInfo, media);
    // }
    const { media, error } = await fetchQueryId(124410);
    if (error) {
      return console.error(error.message);
    } else {
      return console.log(media.bannerImage);
    }
  };

  return (
    <div>
      Anime
      <Button variant="outlined" onClick={handleFetch}>
        Fetch
      </Button>
    </div>
  );
};

export default Anime;
