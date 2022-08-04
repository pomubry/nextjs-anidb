import { Box, Chip, Paper, Tooltip, Typography } from "@mui/material";
import { Stats } from "../../lib/interface/IQueryId";

const StatusDistribution: React.FC<{ stats: Stats }> = ({ stats }) => {
  const total = stats.statusDistribution.reduce((acc, current) => {
    return acc + current.amount;
  }, 0);

  const color = (status: string) => {
    switch (status) {
      case "CURRENT":
        return "success";
      case "PLANNING":
        return "primary";
      case "COMPLETED":
        return "secondary";
      case "DROPPED":
        return "error";
      case "PAUSED":
        return "warning";
      default:
        return undefined;
    }
  };

  const width = (amount: number) => {
    return `${(amount / total) * 100}%`;
  };

  return (
    <Paper elevation={3} sx={{ borderRadius: 3, overflow: "hidden", my: 2 }}>
      {/* Status and number of users */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          gap: 2,
          p: 2,
        }}
      >
        {stats.statusDistribution.map((stat, index) => (
          <Box
            key={index}
            sx={{
              display: "grid",
              placeContent: "center",
            }}
          >
            <Chip label={stat.status} color={color(stat.status)} />
            <Typography
              sx={{ color: `${color(stat.status)}.main`, textAlign: "center" }}
            >
              {stat.amount} Users
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Single horizontal bar graph */}
      <Box display="flex">
        {stats.statusDistribution.map((stat, index) => (
          <Tooltip title={stat.status} key={index}>
            <Box
              sx={{
                minHeight: 15,
                width: width(stat.amount),
                backgroundColor: `${color(stat.status)}.main`,
              }}
            />
          </Tooltip>
        ))}
      </Box>
    </Paper>
  );
};

export default StatusDistribution;
