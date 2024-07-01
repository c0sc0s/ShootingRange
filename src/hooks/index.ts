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

let cancel;

const initData = async () => {
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
  } = useAppStore.getState();

  setLoading(true);

  // 轮询 队伍列表，新闻列表
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

  // 基本信息（Board, Title, Time)
  const _board = await getBoard();
  const title = _board.title as string;

  const boardData = Base64Decode(_board.data) as string;
  const time = _board.time as number;
  const restartContainer = _board.restartContainer as boolean;
  const upLoadWp = _board.upLoadWp as boolean;

  // 更新基本数据到仓库，供其他组件使用
  setBoard(boardData);
  setTitle(title);
  setTime(time);
  setRestartContainer(restartContainer);
  setUpLoadWp(upLoadWp);

  // 所有题目
  const res = await getSelfChallenge();
  const problems = res.data;

  // 已解决的题目
  const { data: _solvedList } = await getSolvedlist();

  // 结合所有题目，已解决的题目，更新到仓库
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

  // 更新个人基本信息到仓库
  setTeamName(name);
  setPoints(points);
  setProblems(problems);
  setLoading(false);
};

export const useInitApp = () => {
  useEffect(() => {
    initData();
    return cancel;
  }, []);
};
