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

function pollData(callback, interval = 10000) {
  // 启动轮询
  callback();
  let pollInterval = setInterval(callback, interval);

  return () => {
    // 停止轮询
    clearInterval(pollInterval);
  };
}

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
    let cancel;

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

      setTeamName(name);
      setPoints(points);
      setProblems(problems);
      setLoading(false);

      const cancelPollTeams = pollData(async () => {
        const { data: teams } = await getAllTeams();
        //保留 teams 前十个
        teams.splice(10);

        setAllTeams(teams);
      });

      const cancelPollNews = pollData(async () => {
        const list = await refreshNewsList();
        setNews(list);
      });

      cancel = () => {
        cancelPollTeams();
        cancelPollNews();
      };
    })();

    return cancel;
  }, []);
};
