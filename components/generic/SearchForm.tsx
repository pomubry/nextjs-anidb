import React, { FormEventHandler } from "react";
import { useRouter } from "next/router";
import { BiSearchAlt } from "react-icons/bi";
import {
  cleanHomeQuery,
  homeSchema,
  homeSchemaType,
} from "@/lib/query/queryHome";

const YearList = () => {
  let arr = [
    <option value={"ALL"} key={"ALLKEY"}>
      All
    </option>,
  ];
  let start = new Date().getFullYear() + 1;
  for (let i = start; i >= 1940; i--) {
    let jsx = (
      <option value={i} key={i}>
        {i}
      </option>
    );
    arr.push(jsx);
  }

  return <>{arr}</>;
};

interface PropType {
  query: homeSchemaType;
}

const SearchForm = ({ query }: PropType) => {
  const router = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const query = Object.fromEntries(formData.entries());

    const res = homeSchema.parse(query);
    res.pg = 1;
    const cleanQuery = cleanHomeQuery(res);

    router.push(
      {
        pathname: "/",
        query: cleanQuery,
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <section className="mt-5 dark:text-slate-200" key={JSON.stringify(query)}>
      <h2>Search Anime</h2>
      <form
        onSubmit={handleSubmit}
        className="mt-2 grid grid-cols-[1fr] gap-3 text-sm min-[480px]:grid-cols-[repeat(2,1fr)] sm:text-base"
      >
        <div className="relative flex items-center rounded-md border-2 border-slate-800 dark:border-purple-300">
          <button aria-label="Search Button" type="submit" className="p-2">
            <BiSearchAlt className="text-xl" />
          </button>
          <input
            type="search"
            name="sr"
            defaultValue={query.sr || ""}
            placeholder="Summer Time Rendering"
            className="w-full border-l-2 border-slate-900 bg-inherit indent-2 placeholder:text-slate-600 focus-visible:outline-none dark:border-slate-300 dark:placeholder:text-slate-400"
          />
        </div>

        <div className="ml-auto flex gap-5 ">
          <select
            name="ss"
            placeholder="Pick Season"
            defaultValue={query.ss || "ALL"}
            className="cursor-pointer rounded-md border-2 border-slate-800 bg-inherit px-4 py-2 dark:border-purple-300"
          >
            <optgroup label="All Seasons">
              <option value="ALL">All</option>
            </optgroup>

            <optgroup label="Jan, Feb, Mar">
              <option value="WINTER">Winter</option>
            </optgroup>

            <optgroup label="Apr, May, Jun">
              <option value="SPRING">Spring</option>
            </optgroup>

            <optgroup label="Jul, Aug, Sep">
              <option value="SUMMER">Summer</option>
            </optgroup>

            <optgroup label="Oct, Nov, Dec">
              <option value="FALL">Fall</option>
            </optgroup>
          </select>

          <select
            name="yr"
            placeholder="Pick Year"
            defaultValue={query.yr || "ALL"}
            className="cursor-pointer rounded-md border-2 border-slate-800 bg-inherit px-4 py-2 dark:border-purple-300"
          >
            <YearList />
          </select>
        </div>
      </form>
    </section>
  );
};

export default SearchForm;
