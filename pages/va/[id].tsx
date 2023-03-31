import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  dehydrate,
  DehydratedState,
  QueryClient,
  useQuery,
} from "@tanstack/react-query";
import { ClientError } from "graphql-request";

import VAHeader from "@/components/va/VAHeader";
import VACharacters from "@/components/va/VACharacters";
import VAStaffRoles from "@/components/va/VAStaffRoles";
import GQLError from "@/components/generic/GQLError";
import NoData from "@/components/generic/NoData";

import {
  cleanStaffQuery,
  fetchStaff,
  staffSchema,
} from "@/lib/query/queryVoiceActor";

interface GSSP {
  dehydratedState: DehydratedState;
}

export const getServerSideProps: GetServerSideProps<GSSP> = async (context) => {
  const res = staffSchema.safeParse(context.query);

  if (!res.success) {
    console.error("Invalid queries:", res.error);
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const cleanQuery = cleanStaffQuery(res.data);

  const redirect =
    // Redirect if there's a difference between `context.query` and `cleanQuery` (means there's a wrong query)
    // i.e. ?cp=abc will redirect to ?cp=1
    Object.entries(cleanQuery).some((entry) => {
      const [key, value] = entry;
      const queryValue = context.query[key];
      return queryValue !== value.toString();
    }) ||
    // Redirect if there are excessive/irrelevant queries
    // i.e. for this page, we only need `cp`, `sp`,
    // i.e. ?cp=abc&cp=4&random=query will redirect to ?cp=4
    // -1 is for [id] query
    Object.keys(context.query).length - 1 !== Object.keys(cleanQuery).length;

  if (redirect) {
    return {
      redirect: {
        destination:
          `/va/${res.data.id}?` +
          new URLSearchParams(cleanQuery as any as URLSearchParams).toString(),
        permanent: false,
      },
    };
  }

  const queryClient = new QueryClient();
  const queryKey = ["staff", res.data];
  await queryClient.prefetchQuery({
    queryKey,
    queryFn: async () => {
      return await fetchStaff(res.data);
    },
  });

  const error = queryClient.getQueryState(queryKey)?.error;

  if (error) {
    console.error("Fetching error in the getServerSideProps:");
    console.error(error);
    return {
      notFound: true,
    };
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const VoiceActor: NextPage = () => {
  const router = useRouter();
  const queryKey = staffSchema.parse(router.query);

  const {
    data: staff,
    error,
    isError,
    isPreviousData,
  } = useQuery({
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    retry: 1,
    queryKey: ["staff", queryKey],
    queryFn: async () => {
      return fetchStaff(queryKey);
    },
  });

  if (isError) {
    const err = error as ClientError;
    return <GQLError err={err} />;
  }

  if (!staff) {
    return <NoData />;
  }

  return (
    <>
      <Head>
        <meta
          name="description"
          content={
            staff.description || `Voice actor description with ID ${staff.id}`
          }
        />
        <meta
          name="keywords"
          content={`anime list, anime database, nextjs, nextani database${
            ", " + staff.name?.full || ""
          }`}
        />
        <title>{staff.name?.full || "Voice Actor"} | NextAni Database</title>
      </Head>

      <VAHeader staff={staff} />

      <div
        className={`container mx-auto my-10 flex flex-col gap-20 px-5 ${
          isPreviousData && "opacity-50"
        }`}
      >
        {staff.characterMedia && (
          <VACharacters
            characterMedia={staff.characterMedia}
            isPreviousData={isPreviousData}
          />
        )}

        {staff.staffMedia && (
          <VAStaffRoles
            staffRole={staff.staffMedia}
            isPreviousData={isPreviousData}
          />
        )}
      </div>
    </>
  );
};
export default VoiceActor;
