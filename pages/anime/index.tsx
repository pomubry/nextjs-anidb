import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: "/",
      permanent: true,
    },
  };
};

const Anime = () => {
  return <></>;
};

export default Anime;
