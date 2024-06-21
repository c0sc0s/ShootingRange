import request from "./base";
// s11gQn6T6cF3
export async function login({ username, password }) {
  return request({
    path: "/user/login",
    method: "POST",
    body: {
      uname: username,
      passwd: password,
      recaptcha: "0",
    },
  });
}

export async function logout() {
  return request({
    path: "/user/logout",
    method: "GET",
  });
}
