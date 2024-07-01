import request from "./base";
// s11gQn6T6cF3
export async function getRankList({ page, size }) {
  return request({
    path: "/rank/getRank",
    method: "POST",
    body: {
      page,
      size,
    },
  });
}

export async function getChallenges() {
  return request({
    path: "/rank/getChallenges",
    method: "GET",
  });
}
