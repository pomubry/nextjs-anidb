import { useRouter } from "next/router";
import React, { FormEventHandler } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { QueryHomePageQueryVariables } from "../lib/gql/graphql";

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
  queryProp?: QueryHomePageQueryVariables;
}

const SearchForm = ({ queryProp = {} }: PropType) => {
  const router = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const query = Object.fromEntries(
      formData.entries()
    ) as QueryHomePageQueryVariables;

    if (query["search"]!.length < 1) {
      delete query["search"];
    }

    router.push(
      {
        pathname: "/",
        query: { ...query, page: 1 },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <section
      className="mt-5 dark:text-slate-200"
      key={JSON.stringify(queryProp)}
    >
      <h2>Search Anime</h2>
      <form
        onSubmit={handleSubmit}
        className="mt-2 grid grid-cols-[1fr] gap-3 min-[480px]:grid-cols-[repeat(2,1fr)]"
      >
        <div className="relative flex items-center rounded-md border-2 border-slate-800 dark:border-purple-300">
          <button aria-label="Search Button" type="submit" className="p-2">
            <BiSearchAlt className="text-xl" />
          </button>
          <input
            type="search"
            name="search"
            defaultValue={queryProp.search || ""}
            placeholder="Summer Time Rendering"
            className="w-full border-l-2 border-slate-900 bg-inherit indent-2 placeholder:text-slate-600 focus-visible:outline-none dark:border-slate-300 dark:placeholder:text-slate-400"
          />
        </div>

        <div className="ml-auto flex gap-5 ">
          <select
            name="season"
            placeholder="Pick Season"
            defaultValue={queryProp.season || "ALL"}
            className="cursor-pointer rounded-md border-2 border-slate-800 bg-inherit py-2 px-4 dark:border-purple-300"
          >
            <option value="ALL">All</option>

            <optgroup label="Jan, Feb, Mar">
              <option value="WINTER">WINTER</option>
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
            name="seasonYear"
            placeholder="Pick Year"
            defaultValue={queryProp.seasonYear || "ALL"}
            className="cursor-pointer rounded-md border-2 border-slate-800 bg-inherit py-2 px-4 dark:border-purple-300"
          >
            <YearList />
          </select>
        </div>
      </form>
    </section>
  );
};

export default SearchForm;
