import { useEffect } from "react";
import {
  getAllTeams,
  getBoard,
  getSelfChallenge,
  getSelfScore,
  getSolvedlist,
  getSolveList,
} from "../apis/home";
import { Base64Decode } from "../utils/formate";
import useAppStore from "../store";

const refreshNewsList = async () => {
  const { data } = await getSolveList();
  return data;
};

export const useInitApp = () => {
  const {
    setBoard,
    setTime,
    setTitle,
    setProblems,
    setLoading,
    setNews,
    setRestartContainer,
    setUpLoadWp,
    setSolvedList,
    setTeamName,
    setPoints,
    setAllTeams,
  } = useAppStore();

  useEffect(() => {
    (async () => {
      setLoading(true);

      // 基本信息（Board, Title, Time)
      const _board = await getBoard();
      const title = _board.title as string;
      const boardData = Base64Decode(_board.data) as string;
      const time = _board.time as number;
      const restartContainer = _board.restartContainer as boolean;
      const upLoadWp = _board.upLoadWp as boolean;

      setBoard(boardData);
      setTitle(title);
      setTime(time);
      setRestartContainer(restartContainer);
      setUpLoadWp(upLoadWp);

      const res = await getSelfChallenge();
      if (!res) window.location.href = "/login";

      // 所有题目
      const problems = res.data;
      const { data: _solvedList } = await getSolvedlist();
      const solvedList = _solvedList.map((item) => item.challenge_id);

      setSolvedList(solvedList);

      problems.forEach((challenge) => {
        if (solvedList.includes(challenge.id)) {
          challenge.status = true;
        } else {
          challenge.status = false;
        }
      });

      const { data: selfInfo } = await getSelfScore();
      const { name, points } = selfInfo;

      const { data: teams } = await getAllTeams();

      setTeamName(name);
      setPoints(points);
      setProblems(problems);
      setLoading(false);
      setAllTeams(teams);

      const list = await refreshNewsList();
      setNews(list);
    })();
  }, []);
};
