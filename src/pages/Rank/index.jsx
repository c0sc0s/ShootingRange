import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
} from "@mui/material";
import { useEffect } from "react";
import { getChallenges, getRankList } from "../../apis/rank";
import { useState } from "react";
import _ from "lodash";
import { useMemo } from "react";
import { Check } from "lucide-react";
import { useRef } from "react";
import { Medal } from "lucide-react";

const Rank = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    size: 10,
    total: 0,
  });
  const [allChallenges, setChallenges] = useState(new Map());
  const [rankData, setRankData] = useState([]);

  const _challenges = useRef();

  const getAllChallenges = async () => {
    const { data: challengesData } = await getChallenges();
    const challengesMap = new Map();
    challengesData.forEach((i) => {
      const key = i.category;
      const mapArr = challengesMap.get(key);

      if (mapArr) {
        mapArr.push(i);
      } else {
        challengesMap.set(key, [i]);
      }
    });

    _challenges.current = challengesMap;
    setChallenges(challengesMap);
    return challengesMap;
  };

  const updateRankData = async (page, size, challenges) => {
    const { data: _rankData } = await getRankList({
      page: String(page || "1"),
      size: String(size || "10"),
    });

    challenges = challenges || allChallenges;
    const flatten = _.flattenDeep(Array.from(challenges?.values()));

    _rankData.forEach((rankItem, index) => {
      const solvedList = rankItem.SolveRecords;
      const solvedSituation = [];

      flatten.forEach((item) => {
        if (solvedList.find((i) => i.ChallengeId === item.id)) {
          solvedSituation.push({
            ...item,
            solved: true,
            firstBlood: item.first_blood === rankItem.id,
          });
        } else {
          solvedSituation.push({
            ...item,
            solved: false,
          });
        }
      });

      const last =
        index === 0 ? 0 : rankItem.points - _rankData[index - 1].points;

      rankItem.solvedSituation = solvedSituation;
      rankItem.last = -last;
    });

    setRankData(_rankData);
    if (_rankData.count !== pageInfo.total) {
      setPageInfo((pre) => ({
        ...pre,
        total: rankData.count,
      }));
    }
  };

  useEffect(() => {
    (async () => {
      const res = await getAllChallenges();
      updateRankData(1, 10, res);
    })();
  }, []);

  const headerRows = useMemo(() => {
    const _res = [];
    allChallenges.values().forEach((i) => {
      i.forEach((j) => {
        _res.push(
          <TableCell className="border-[#515151] border h-[10px]" key={j.id}>
            <span className="flex text-nowrap flex-nowrap text-[#90afff]">
              {j.name}
            </span>
          </TableCell>
        );
      });
    });
    return _res;
  }, [allChallenges]);

  const bodyRows = useMemo(() => {
    return rankData.map((row, index) => {
      return (
        <TableRow key={row.name} hover>
          <TableCell align="center" component="th" scope="row">
            {index + 1}
          </TableCell>
          <TableCell align="center" component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell align="center" component="th" scope="row">
            {row.points}
          </TableCell>
          <TableCell align="center" component="th" scope="row">
            {row.last || 0}
          </TableCell>
          {row.solvedSituation?.map((i) => (
            <TableCell
              align="center"
              className="text-center"
              component="th"
              scope="row"
            >
              <div className="flex justify-center">
                {i.solved ? (
                  i.firstBlood ? (
                    <Medal color="gold" />
                  ) : (
                    <Check color="green" />
                  )
                ) : (
                  "-"
                )}
              </div>
            </TableCell>
          ))}
        </TableRow>
      );
    });
  }, [rankData]);

  const category = ["web", "re", "misc", "Crypto", "pwn"];
  const categoryRows = useMemo(
    () =>
      category?.map((i) => (
        <TableCell
          className="border border-[#515151] "
          align="center"
          colSpan={allChallenges.get(i)?.length || 0}
        >
          <span className="uppercase font-custom bold">{i}</span>
        </TableCell>
      )),

    [category]
  );

  return (
    <div className="rounded-lg border border-[#515151] overflow-x-scroll m-10 bg-[#121C34]">
      <TableContainer
        sx={{
          bgcolor: "#061029",
        }}
        component={Paper}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead
            sx={{
              bgcolor: "#05153A",
            }}
            className="h-[10px]"
          >
            <TableRow
              sx={{
                height: "20px",
              }}
            >
              <TableCell
                className="border-x border-[#515151] text-nowrap"
                height={"10px"}
                rowSpan={2}
              >
                排名
              </TableCell>
              <TableCell
                align="center"
                className="text-center border-x border-[#515151] text-nowrap"
                rowSpan={2}
              >
                队伍名称
              </TableCell>
              <TableCell
                className="border-x border-[#515151]"
                text-nowrap
                rowSpan={2}
                align="center"
              >
                总分
              </TableCell>
              <TableCell
                align="center"
                className="border-x border-[#515151] text-nowrap text-center"
                rowSpan={2}
              >
                与前一名差分
              </TableCell>
              {categoryRows}
            </TableRow>
            <TableRow>{headerRows}</TableRow>
          </TableHead>
          <TableBody>{bodyRows}</TableBody>
        </Table>
      </TableContainer>
      <div className="w-full flex my-4 justify-center">
        <Pagination
          onChange={(e, d) => {
            setPageInfo((pre) => ({
              ...pre,
              page: d,
            }));
            updateRankData(d);
          }}
          size={String(pageInfo.size)}
          count={pageInfo.count}
        />
      </div>
    </div>
  );
};

export default Rank;