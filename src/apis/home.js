import request from "./base";

const getBoard = () => {
  return request({
    path: "/info/getBoard",
    method: "GET",
  });
};

const getSelfChallenge = () => {
  const loginStatus = localStorage.getItem("login");
  if (loginStatus === "true") {
    return request({
      path: "/challenge/showall",
      method: "GET",
    });
  } else {
    document.href = "/";
  }
};

const submitFlag = ({ flag, name }) => {
  return request({
    path: "/solve/check",
    method: "POST",
    body: {
      flag,
      challenge_id: "" + name,
    },
  });
};

const getSolvedlist = () => {
  return request({
    path: "/solve/teamsolvesid",
    method: "GET",
  });
};

const getSolveList = () => {
  return request({
    path: "/solve/getsolvelist",
    method: "GET",
  });
};

const getChallengeByName = (name) => {
  return request({
    path: `/getChallengeByName?name=${name}`,
    method: "GET",
  });
};

const changePwd = (psw) => {
  return request({
    path: "/user/changepasswd",
    method: "POST",
    body: {
      passwd: psw,
    },
  });
};

const restart = () => {
  return request({
    path: `/challenge/restart`,
    method: "GET",
  });
};

const uploadWp = (file) => {
  return request({
    path: "/team/uploadwp",
    method: "POST",
    body: {
      file: file,
    },
  });
};

const getSelfScore = () => {
  return request({
    path: "/team/getme",
    method: "GET",
  });
};

const getAllTeams = () => {
  return request({
    path: "/team/showall",
    method: "GET",
  });
};

export {
  getSelfChallenge,
  submitFlag,
  getSolveList,
  getChallengeByName,
  getSolvedlist,
  getBoard,
  changePwd,
  restart,
  uploadWp,
  getSelfScore,
  getAllTeams,
};
