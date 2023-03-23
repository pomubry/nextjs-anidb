import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: "/",
      permanent: true,
    },
  };
};

const VoiceActor = () => {
  return <></>;
};

export default VoiceActor;
