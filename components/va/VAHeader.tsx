import ReactMarkdown from "react-markdown";
import { FragmentType, useFragment } from "@/lib/gql";
import { VAHeaderFragment } from "@/lib/query/queryVoiceActor";

interface PropType {
  staff: FragmentType<typeof VAHeaderFragment>;
}

interface TagType {
  tag: string;
  tagValue: string;
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Tag = ({ tag, tagValue }: TagType) => {
  if (tagValue.length === 0) return null;

  return (
    <p>
      <strong className="font-extrabold">{tag}:</strong> {tagValue}
    </p>
  );
};

const VAHeader = (props: PropType) => {
  const staff = useFragment(VAHeaderFragment, props.staff);

  const getDate = (date: typeof staff.dateOfBirth) => {
    if (!date) return "";
    let monthDay = `${date.month ? months[date.month - 1] : ""} ${
      date.day || ""
    }`.trim();
    let year = `${date.year || ""}`;
    if (monthDay.length === 0) {
      return year;
    } else if (year.length === 0) {
      return monthDay;
    } else {
      return monthDay + ", " + year;
    }
  };

  const dateOfBirth = getDate(staff.dateOfBirth);
  const dateOfDeath = getDate(staff.dateOfDeath);
  const yearsActive =
    (staff.yearsActive &&
      staff.yearsActive[0] !== null &&
      (staff.yearsActive?.length > 1
        ? `${staff.yearsActive[0] || "N/A"} - ${staff.yearsActive[1] || "N/A"}`
        : `${staff.yearsActive[0] || "N/A"} - Present`)) ||
    "";

  const alternativeNames = staff.name?.alternative
    ?.filter((name) => name !== null && !!name.length)
    .join(", ");

  return (
    <header className="relative overflow-y-scroll bg-slate-300 duration-300 dark:bg-slate-700 md:max-h-[30rem] md:min-h-[30rem]">
      <div className="grid grid-rows-[auto_1fr] gap-5 bg-slate-100 bg-gradient-to-b from-[rgb(241_245_249)_40%] to-[rgb(203_213_225)_40%] p-5 duration-300 dark:bg-slate-900/80 dark:from-[rgb(15_23_42_/_0.1)_40%] dark:to-[rgb(51_65_85)_40%] md:grid-cols-[1fr_2fr] md:grid-rows-[auto] md:bg-none">
        <picture className="order-2 grid place-items-center md:order-1">
          <img
            src={staff.image?.large || "N/A"}
            alt={staff.name?.full || "N/A"}
            className="rounded-lg object-cover shadow-xl shadow-slate-900 md:absolute md:top-5 md:h-[70%]"
            loading="lazy"
          />
        </picture>
        <div className="order-1 text-center md:order-2 md:text-left">
          <h1 className="text-2xl font-bold">{staff.name?.full}</h1>
          <p className="mt-3 text-sm">
            {staff.name?.native && alternativeNames
              ? staff.name.native + ", "
              : staff.name?.native
              ? staff.name.native
              : ""}
            {alternativeNames}
          </p>
        </div>
      </div>

      <div className="gap-5 p-5 md:grid md:grid-cols-[1fr_2fr]">
        <div></div>
        <div>
          <div className="">
            <Tag tag="Birth" tagValue={dateOfBirth} />
            <Tag tag="Death" tagValue={dateOfDeath} />
            <Tag tag="Age" tagValue={staff.age?.toString() || ""} />
            <Tag tag="Gender" tagValue={staff.gender || ""} />
            <Tag tag="Blood Type" tagValue={staff.bloodType || ""} />
            <Tag tag="Hometown" tagValue={staff.homeTown || ""} />
            <Tag tag="Years Active" tagValue={yearsActive} />
          </div>
          <ReactMarkdown
            className="flex flex-col gap-3"
            components={{
              a: ({ node, ...props }) => (
                <a
                  rel="nooopener noreferrer"
                  target="_blank"
                  className="text-blue-600 hover:underline dark:text-blue-300"
                  {...props}
                />
              ),
              p: ({ node, ...props }) => (
                <p className="whitespace-pre-wrap" {...props} />
              ),
              strong: ({ node, ...props }) => (
                <strong className="font-extrabold" {...props} />
              ),
            }}
          >
            {staff.description || ""}
          </ReactMarkdown>
        </div>
      </div>
    </header>
  );
};
export default VAHeader;
