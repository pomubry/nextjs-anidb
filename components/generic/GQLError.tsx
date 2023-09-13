import type { ClientError } from "graphql-request";

const GQLError = ({ err }: { err: ClientError }) => {
  return (
    <div className="grid place-content-center gap-5">
      <h1 className="text-red text-4xl font-extrabold">Anilist Errors:</h1>
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
};
export default GQLError;
