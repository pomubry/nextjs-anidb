import SectionHeader from "./SectionHeader";
import RoleCard from "./RoleCard";
import { FragmentType, useFragment } from "../../lib/gql";
import { VAStaffRolesFragment } from "../../lib/query/queryVoiceActor";

interface PropType {
  staffRole: FragmentType<typeof VAStaffRolesFragment>;
}

const VAStaffRoles = (props: PropType) => {
  const staffRoles = useFragment(VAStaffRolesFragment, props.staffRole);

  const roles =
    staffRoles.edges?.reduce((acc, cur) => {
      if (!cur) return acc;
      const year = cur?.node?.startDate?.year || 9999;
      const arr = acc[year];
      return { ...acc, [year]: arr ? [...arr, cur] : [cur] };
    }, {} as { [key: number]: typeof staffRoles.edges }) || {};
  const rolesKeys = Object.keys(roles).sort((a, b) => +b - +a);

  if (rolesKeys.length < 1) return null;
  if (!staffRoles.pageInfo) return null;

  return (
    <section>
      <SectionHeader
        currentPage={staffRoles.pageInfo.currentPage}
        hasNextPage={staffRoles.pageInfo.hasNextPage}
        total={staffRoles.pageInfo.total}
        heading="Anime Staff Roles"
        query="sp"
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
};
export default VAStaffRoles;
