import Head from "next/head";

interface PropType {
  name: string;
}

const StudioHead = ({ name }: PropType) => {
  return (
    <Head>
      <meta name="description" content={`Animation studio ${name}`} />
      <meta
        name="keywords"
        content={`anime list, anime database, nextjs, nextani database, ${name}`}
      />
      <title>{`${name} | NextAni`}</title>
    </Head>
  );
};
export default StudioHead;
