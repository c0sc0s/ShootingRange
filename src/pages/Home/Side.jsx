import {
  BorderBox12,
  Decoration9,
  ScrollRankingBoard,
} from "@jiaminghi/data-view-react";
import TimeDown from "./Timedown";
import useAppStore from "../../store";
import { useMemo } from "react";
import { getDotNumber } from "../../utils/formate";

const TeamPoints = ({ teamName, solvedLength, problemLength, points }) => {
  return (
    <div className="w-[300px] h-[300px]">
      <Decoration9 style={{ width: "300px", height: "300px" }}>
        <div className="flex flex-col gap-1 text-center">
          <div className="text-[1rem] font-custom">{teamName}</div>
          <div className="text-[.8rem] ">
            完成
            <span className="ml-2 text-blue-500">
              {solvedLength}/{problemLength}
            </span>
            <span className="ml-2 text-white">{points}分</span>
          </div>
          <div className="font-custom text-[1.6rem] text-green-500">
            {getDotNumber((solvedLength / problemLength) * 100)}%
          </div>
        </div>
      </Decoration9>
    </div>
  );
};

const Side = () => {
  const { solvedList, problems, teamName, points, allTeams } = useAppStore();
  const solvedLength = solvedList.length;
  const problemLength = problems.length;

  // 保留小数点两位

  // 排名数据计算
  const listData = useMemo(() => {
    return {
      data: allTeams.map((item) => {
        return {
          name: item.team_name,
          value: item.points,
        };
      }),
    };
  }, [allTeams]);

  return (
    <div className="w-[340px] flex flex-col gap-8">
      {/* 倒计时 */}
      <TimeDown />

      {/* 个人积分信息 */}
      <TeamPoints
        points={points}
        problemLength={problemLength}
        solvedLength={solvedLength}
        teamName={teamName}
        key={teamName}
      />

      {/* 排名 */}
      <BorderBox12>
        <div className="px-4 py-8">
          <ScrollRankingBoard
            config={listData}
            style={{ width: "280px", height: "300px" }}
          />
        </div>
      </BorderBox12>
    </div>
  );
};
export default Side;
