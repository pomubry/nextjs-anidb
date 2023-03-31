import { ClientError } from "graphql-request";

const GQLError = ({ err }: { err: ClientError }) => {
  let errorList: React.ReactNode[];

  if ((err.response.errors?.length ?? 0) > 0) {
    errorList =
      err.response.errors?.map((err, i) => (
        <li className="my-1" key={i}>
          - {err.message}
        </li>
      )) || [];
  } else {
    errorList = [
      <li className="my-1" key="err.message">
        - {err.message}
      </li>,
    ];
  }
  return (
    <div className="container mx-auto p-3">
      <h2 className="font-bold text-red-600">Anilist Errors:</h2>
      <ul className="ml-3">{errorList}</ul>
    </div>
  );
};
export default GQLError;
