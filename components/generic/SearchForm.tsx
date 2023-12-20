import { useRouter } from "next/router";
import * as Form from "@radix-ui/react-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BiSearchAlt } from "react-icons/bi";

import { formQuerySchema } from "@/lib/validation";
import { cleanClientHomeSearchParams } from "@/lib/utils";
import type { FormQuery, ServerHomeQuery } from "@/lib/types";

interface PropType {
  query: ServerHomeQuery;
}

function YearList() {
  const arr = [
    <option value={"ALL"} key={"ALLKEY"}>
      All
    </option>,
  ];
  const start = new Date().getFullYear() + 1;
  for (let i = start; i >= 1940; i--) {
    const jsx = (
      <option value={i} key={i}>
        {i}
      </option>
    );
    arr.push(jsx);
  }

  return <>{arr}</>;
}

export default function SearchForm({ query }: PropType) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormQuery>({
    resolver: zodResolver(formQuerySchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    const query = cleanClientHomeSearchParams({ ...data, pg: 1 });
    router.push(
      {
        pathname: "/",
        query,
      },
      undefined,
      { shallow: true, scroll: false },
    );
  });

  return (
    <section className="mt-5" key={JSON.stringify(query)}>
      <Form.Root
        onSubmit={onSubmit}
        className="mt-2 grid grid-cols-[1fr] gap-3 text-sm min-[480px]:grid-cols-[repeat(2,1fr)] sm:text-base"
      >
        <Form.Field
          name="sr"
          serverInvalid={!!errors.sr?.message}
          className="group"
        >
          <Form.Label>Search Anime:</Form.Label>
          <div className="relative flex items-center rounded-md border-2 border-purple group-data-[invalid=true]:border-red-300">
            <Form.Submit
              aria-label="Search Button"
              type="submit"
              className="p-2 bg-purple-hover"
            >
              <BiSearchAlt className="text-xl" />
            </Form.Submit>
            <Form.Control asChild>
              <input
                {...register("sr")}
                type="search"
                defaultValue={query.search || ""}
                placeholder="Summer Time Rendering"
                className="w-full border-l-2 border-slate-900 bg-inherit indent-2 duration-300 placeholder:text-slate-600 focus-visible:outline-none dark:border-slate-100 dark:placeholder:text-slate-400"
              />
            </Form.Control>
          </div>
        </Form.Field>

        <div className="ml-auto flex gap-5">
          <Form.Field
            name="ss"
            serverInvalid={!!errors.ss?.message}
            className="grid"
          >
            <Form.Label>Season:</Form.Label>
            <Form.Control asChild>
              <select
                {...register("ss")}
                // placeholder="Pick Season"
                defaultValue={query.season || "ALL"}
                className="cursor-pointer rounded-md border-2 bg-inherit px-4 py-2 border-purple data-[invalid=true]:border-red-300"
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
            </Form.Control>
          </Form.Field>

          <Form.Field
            name="yr"
            serverInvalid={!!errors.yr?.message}
            className="grid"
          >
            <Form.Label>Year:</Form.Label>
            <Form.Control asChild>
              <select
                {...register("yr")}
                // placeholder="Pick Year"
                defaultValue={query.seasonYear || "ALL"}
                className="cursor-pointer rounded-md border-2 bg-inherit px-4 py-2 border-purple  data-[invalid=true]:border-red-300"
              >
                <YearList />
              </select>
            </Form.Control>
          </Form.Field>
        </div>
      </Form.Root>
    </section>
  );
}
