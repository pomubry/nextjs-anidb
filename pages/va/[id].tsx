import Head from "next/head";
import { useRouter } from "next/router";
import {
  dehydrate,
  QueryClient,
  useQuery,
  type DehydratedState,
} from "@tanstack/react-query";
import type { GetServerSideProps } from "next";
import type { ClientError } from "graphql-request";

import MainLayout from "@/layouts/MainLayout";
import VAHeader from "@/components/va/VAHeader";
import VACharacters from "@/components/va/VACharacters";
import VAStaffRoles from "@/components/va/VAStaffRoles";
import GQLError from "@/components/generic/GQLError";
import NoData from "@/components/generic/NoData";

import { fetchStaff } from "@/lib/query/queryVoiceActor";
import { cleanStaffQuery, objToUrlSearchParams } from "@/lib/utils";
import { staffSchema } from "@/lib/validation";
import type { NextPageWithLayout } from "@/lib/types";

interface GSSP {
  dehydratedState: DehydratedState;
}

export const getServerSideProps = (async (context) => {
  const staff = staffSchema.safeParse(context.query);

  if (!staff.success) {
    console.error("Invalid queries:", staff.error);
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const searchParams = cleanStaffQuery(staff.data);

  // Redirect if the number of keys in `searchParams` and `context.query` are not equal
  // That means some search params were cleaned up! Redirect to a cleaner url
  const redirect =
    Object.keys(context.query).length - 1 !== Object.keys(searchParams).length; // -1 is for [id] query

  if (redirect) {
    const destination =
      `/va/${staff.data.id}` +
      objToUrlSearchParams(searchParams as unknown as URLSearchParams);

    return {
      redirect: {
        destination,
        permanent: false,
      },
    };
  }

  const queryClient = new QueryClient();
  const queryKey = ["staff", staff.data];
  await queryClient.prefetchQuery({
    queryKey,
    queryFn: async () => {
      return await fetchStaff(staff.data);
    },
  });

  const error = queryClient.getQueryState(queryKey)?.error;

  if (error) {
    console.error("Fetching error in the getServerSideProps:", error);
    return {
      notFound: true,
    };
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}) satisfies GetServerSideProps<GSSP>;

const VoiceActor: NextPageWithLayout = () => {
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

  const title = staff.name?.full ? `${staff.name.full} | NextAni` : "NextAni";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content={
            staff.description || `Voice actor description with ID ${staff.id}`
          }
        />
        <meta
          name="keywords"
          content={`nextani database, ${staff.name?.full || ""}`}
        />
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

VoiceActor.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export default VoiceActor;
