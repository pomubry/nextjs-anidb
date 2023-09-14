import { useFragment, type FragmentType } from "@/lib/gql";
import { DateFragment } from "@/lib/query/queryAnime";
import ListItem from "./ListItem";
import Heading from "./Heading";

interface Props {
  name: string;
  date: FragmentType<typeof DateFragment>;
}

export default function DateInfo(props: Props) {
  const date = useFragment(DateFragment, props.date);

  const isValidDate = Object.values(date).every(
    (value) => typeof value === "number",
  );

  if (!isValidDate) return null;

  return (
    <ListItem>
      <Heading>{props.name}</Heading>
      <p>
        {new Date(
          // values shouldn't be null anymore
          date.year!,
          date.month!,
          date.day!,
        ).toDateString()}
      </p>
    </ListItem>
  );
}
