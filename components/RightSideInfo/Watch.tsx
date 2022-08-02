import Image from "next/image";
import { StreamingEpisodes } from "../../lib/IQueryId";
import {
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Watch: React.FC<{ watch: StreamingEpisodes[] }> = ({ watch }) => {
  let isNotReversed = watch[0].title.includes("Episode 1 ");
  let arr = isNotReversed ? watch : watch.reverse();
  const theme = useTheme();
  const isAboveMedium = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <ImageList
      rowHeight={120}
      cols={2}
      sx={{
        height: isAboveMedium ? 600 : 400,
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
