import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";
import { useFragment, type FragmentType } from "@/lib/gql";
import { VAHeaderFragment } from "@/lib/query/queryVoiceActor";

interface PropType {
  staff: FragmentType<typeof VAHeaderFragment>;
}

interface TagType {
  tag: string;
  tagValue: string;
}

function Tag({ tag, tagValue }: TagType) {
  if (tagValue.length === 0) return null;

  return (
    <p>
      <strong className="font-extrabold">{tag}:</strong> {tagValue}
    </p>
  );
}

export default function VAHeader(props: PropType) {
  const staff = useFragment(VAHeaderFragment, props.staff);

  function getDate(date: typeof staff.dateOfBirth) {
    if (!date) return "";

    const rawDate = new Date(
      Date.UTC(date.year || 0, date.month ? date.month - 1 : 0, date.day || 0),
    );

    const formattedDate = new Intl.DateTimeFormat(undefined, {
      ...(date.year && { year: "numeric" }),
      ...(date.month && { month: "long" }),
      ...(date.day && { day: "numeric" }),
    }).format(rawDate);

    if (formattedDate.includes("/") || formattedDate.length < 3) return "";
    return formattedDate;
  }

  const dateOfBirth = getDate(staff.dateOfBirth);
  const dateOfDeath = getDate(staff.dateOfDeath);
  const yearsActive =
    (staff.yearsActive &&
      staff.yearsActive[0] !== null &&
      (staff.yearsActive?.length > 1
        ? `${staff.yearsActive[0] || "N/A"} ~ ${staff.yearsActive[1] || "N/A"}`
        : `${staff.yearsActive[0] || "N/A"} ~ Present`)) ||
    "";

  const alternativeNames = staff.name?.alternative
    ?.filter((name) => name !== null && !!name.length)
    .join(", ");

  marked.setOptions({
    breaks: true,
    gfm: true,
  });

  marked.use({
    renderer: {
      paragraph(text) {
        return `<p 
        class="mb-5"
        >${text}</p>`;
      },
      strong(text) {
        return `<strong 
        class="font-extrabold"
        >${text}</strong>`;
      },
      link(href, _, text) {
        return `<a 
        href="${href}" 
        rel="nooopener noreferrer" 
        target="_blank" 
        class="text-blue hover:underline"
        >${text}</a>`;
      },
    },
  });

  const cleanHtml = DOMPurify.sanitize(
    marked.parse(
      staff.description?.replace(/:\s+__/g, ":__ ") ||
        "<i>There are no descriptions for this staff yet.</i>",
    ),
    { USE_PROFILES: { html: true } },
  );

  return (
    <header className="relative overflow-y-scroll bg-slate-300 duration-300 dark:bg-slate-700 md:max-h-[30rem] md:min-h-[30rem]">
      <div className="grid grid-rows-[auto_1fr] gap-5 bg-slate-100 bg-gradient-to-b from-[rgb(241_245_249)_40%] to-[rgb(203_213_225)_40%] p-5 duration-300 dark:bg-slate-900/80 dark:from-[rgb(15_23_42_/_0.1)_40%] dark:to-[rgb(51_65_85)_40%] md:grid-cols-[1fr_2fr] md:grid-rows-[auto] md:bg-none">
        <picture className="order-2 grid place-items-center md:order-1">
          <img
            src={staff.image?.large || "N/A"}
            alt={staff.name?.full || "N/A"}
            className="rounded-lg object-cover shadow-xl shadow-slate-900 md:absolute md:top-5 md:h-[70%]"
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
          <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />
        </div>
      </div>
    </header>
  );
}
