import { FC } from "react";
import { Stats } from "../../types";

interface StatsItemProps {
  stat: Stats;
}

const StatsItem: FC<StatsItemProps> = ({ stat }) => {
  const { category, active, archived } = stat;

  return (
    <>
      <td>{category}</td>
      <td className="text-center py-1">{active}</td>
      <td className="text-center py-1">{archived}</td>
    </>
  );
};
export default StatsItem;
