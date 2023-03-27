import { FragmentType, useFragment } from "../../../lib/gql";
import { MediaListStatus } from "../../../lib/gql/graphql";
import { StatsDistributionFragment } from "../../../lib/query/queryAnime";

interface PropType {
  stats: FragmentType<typeof StatsDistributionFragment>;
}

type Status = MediaListStatus | null | undefined;

const color = (status: Status) => {
  switch (status) {
    case "CURRENT":
      return "dark:text-green-400 text-green-600";
    case "PLANNING":
      return "dark:text-blue-400 text-blue-600";
    case "COMPLETED":
      return "dark:text-purple-400 text-purple-600";
    case "DROPPED":
      return "dark:text-red-400 text-red-600";
    case "PAUSED":
      return "dark:text-orange-400 text-orange-600";
    default:
      return undefined;
  }
};

const bgcolor = (status: Status) => {
  switch (status) {
    case "CURRENT":
      return "bg-green-400";
    case "PLANNING":
      return "bg-blue-400";
    case "COMPLETED":
      return "bg-purple-400";
    case "DROPPED":
      return "bg-red-400";
    case "PAUSED":
      return "bg-orange-400";
    default:
      return undefined;
  }
};

const StatusDistribution = (props: PropType) => {
  const stats = useFragment(StatsDistributionFragment, props.stats);

  if (!stats || !stats.statusDistribution) return null;

  const total = stats.statusDistribution.reduce((acc, current) => {
    return current?.amount ? acc + current.amount : acc;
  }, 0);

  const width = (amount: number) => {
    return `${(amount / total) * 100}%`;
  };

  return (
    <div className="my-2 mb-10 overflow-hidden rounded-md bg-slate-100 shadow-xl dark:bg-slate-900">
      {/* Status and number of users */}
      <ul className="flex flex-wrap justify-around gap-5 p-3">
        {stats.statusDistribution.map((stat) => {
          if (!stat || !stat.status || !stat.amount) return null;
          return (
            <li key={stat.status} className="grid place-content-center">
              <span
                className={`rounded-3xl px-3 py-2 dark:font-semibold ${bgcolor(
                  stat.status
                )}`}
              >
                {stat.status}
              </span>
              <p className={`text-center ${color(stat.status)}`}>
                {stat.amount} Users
              </p>
            </li>
          );
        })}
      </ul>

      {/* Single horizontal bar graph */}
      <ul className="flex">
        {stats.statusDistribution.map((stat) => {
          if (!stat || !stat.status || !stat.amount) return null;
          return (
            <li
              key={stat.status}
              title={stat.status}
              className={`min-h-[15px] ${bgcolor(stat.status)}`}
              style={{ width: width(stat.amount) }}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default StatusDistribution;
