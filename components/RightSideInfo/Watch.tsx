import Image from "next/image";
import { StreamingEpisodes } from "../../lib/IQueryId";
import {
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";

const Watch: React.FC<{ watch: StreamingEpisodes[] }> = ({ watch }) => {
  let isNotReversed = watch[0].title.includes("Episode 1 ");
  let arr = isNotReversed ? watch : watch.reverse();
  return (
    <ImageList
      rowHeight={100}
      cols={2}
      sx={{
        height: 400,
        my: 2,
      }}
    >
      {arr.map((item, idx) => (
        <ImageListItem key={idx}>
          <Image
            src={item.thumbnail}
            alt={item.title}
            layout="fill"
            objectFit="cover"
          />
          <ImageListItemBar
            title={item.title}
            actionIcon={
              <IconButton
                aria-label={`Streaming service for ${item.title}`}
                href={item.url}
                target="_blank"
                rel="noopener"
              >
                <LaunchIcon />
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default Watch;
