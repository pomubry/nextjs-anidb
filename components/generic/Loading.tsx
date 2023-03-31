import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = () => {
  return (
    <div className="container mx-auto my-10 p-3">
      <h2 className="text-blue-400">
        <AiOutlineLoading3Quarters className="mx-auto animate-spin text-4xl" />
      </h2>
    </div>
  );
};
export default Loading;
