import { Button } from "@mui/material";
import { ExternalLink } from "../../lib/IQueryId";

const bgColor = (site: string) => {
  switch (site.toLowerCase()) {
    case "animelab":
    case "funimation":
    case "hbo max":
      return "secondary";
    case "amazon":
    case "crunchyroll":
    case "vrv":
      return "warning";
    case "hulu":
      return "success";
    case "netflix":
    case "youtube":
      return "error";
    default:
      return "primary";
  }
};
const StreamLinks: React.FC<{ links: ExternalLink[] }> = ({ links }) => {
  return (
    <div>
      {links.map((link, index) => (
        <Button
          variant="contained"
          color={bgColor(link.site)}
          href={link.url}
          target="_blank"
          rel="noopener"
          sx={{
            display: "block",
            textAlign: "center",
            my: 1,
            borderRadius: 3,
          }}
          key={index}
        >
          {link.site}
        </Button>
      ))}
    </div>
  );
};

export default StreamLinks;
