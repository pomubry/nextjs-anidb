import type { ClientError } from "graphql-request";

export default function GQLError({ err }: { err: ClientError }) {
  return (
    <div className="grid place-content-center gap-5">
      <h1 className="text-4xl font-extrabold text-red">Anilist Errors:</h1>
      <ul className="grid gap-3">
        {err.response.errors?.map((error, i) => {
          return (
            <li className="my-1" key={`${i} - ${error.message}`}>
              - {err.message}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
