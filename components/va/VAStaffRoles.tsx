import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

import SectionHeader from "@/components/generic/SectionHeader";
import RoleCard from "./RoleCard";

import { useFragment, type FragmentType } from "@/lib/gql";
import { VAStaffRolesFragment } from "@/lib/query/queryVoiceActor";
import { cleanStaffQuery, objToUrlSearchParams } from "@/lib/utils";
import { staffSchema } from "@/lib/validation";

interface PropType {
  staffRole: FragmentType<typeof VAStaffRolesFragment>;
  isPlaceholderData: boolean;
}

export default function VAStaffRoles(props: PropType) {
  const router = useRouter();
  const pathname = usePathname();
  const staffRoles = useFragment(VAStaffRolesFragment, props.staffRole);

  const roles =
    staffRoles.edges?.reduce(
      (acc, cur) => {
        if (!cur) return acc;
        const year = cur?.node?.startDate?.year || 9999;
        const arr = acc[year];
        return { ...acc, [year]: arr ? [...arr, cur] : [cur] };
      },
      {} as { [key: number]: typeof staffRoles.edges },
    ) || {};

  const rolesKeys = Object.keys(roles).sort((a, b) => +b - +a);

  if (rolesKeys.length < 1) return null;
  if (!staffRoles.pageInfo) return null;

  function forwardHandler() {
    const staff = staffSchema.parse(router.query);
    staff.sp++;

    const cleanQuery = cleanStaffQuery(staff);
    const href = pathname + objToUrlSearchParams(cleanQuery);

    router.push(href, undefined, { shallow: true, scroll: false });
  }

  function previousHandler() {
    const staff = staffSchema.parse(router.query);
    staff.sp--;

    const cleanQuery = cleanStaffQuery(staff);
    const href = pathname + objToUrlSearchParams(cleanQuery);

    router.push(href, undefined, { shallow: true, scroll: false });
  }

  return (
    <section>
      <SectionHeader
        title="Anime Staff Roles"
        currentPage={staffRoles.pageInfo.currentPage}
        hasNextPage={staffRoles.pageInfo.hasNextPage}
        total={staffRoles.pageInfo.total}
        isPlaceholderData={props.isPlaceholderData}
        forwardHandler={forwardHandler}
        previousHandler={previousHandler}
      />

      {rolesKeys.map((yr) => {
        const year = +yr;
        return (
          <div key={year} className="mb-10">
            <p className="text-right text-2xl">
              {year === 9999 ? "To Be Announced" : year}
            </p>
            <ul className="my-2 flex gap-2 overflow-scroll md:flex-wrap md:gap-5 md:overflow-visible">
              {roles[year].map((role) => {
                if (!role) return null;
                const key = role.id || JSON.stringify(role);
                return <RoleCard role={role} key={key} />;
              })}
            </ul>
          </div>
        );
      })}
    </section>
  );
}
