import { FC } from "react";
import { useSelector } from "react-redux";
import getStats from "../../helpers/getStats";
import StatsItem from "../StatsItem/StatsItem";

const StatsList: FC = () => {
  const notes = useSelector(({ notes }) => notes.items);
  const stats = getStats(notes);
  const hasData = stats.filter((stat) => stat.active || stat.archived);

  return (
    <>
      {hasData.length > 0 && (
        <table className=" mt-6 text-sm">
          <thead>
            <tr className="">
              <th className="w-40 border border-gray-50 text-gray-50 bg-slate-600 py-1">
                Category
              </th>
              <th className="w-32 border border-gray-50 text-gray-50 bg-slate-600 py-1">
                Active
              </th>
              <th className="w-32 border border-gray-50 text-gray-50 bg-slate-600 py-1">
                Archived
              </th>
            </tr>
          </thead>
          <tbody>
            {hasData.map((stat) => (
              <tr key={stat.category}>
                <StatsItem stat={stat} />
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
export default StatsList;
