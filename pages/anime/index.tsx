import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async () => {
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
