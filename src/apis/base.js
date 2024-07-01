import { BASE_URL } from "../config/URL";

export default async function request({ path, method, body }) {
  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    const code = Number(data?.code);

    if (code !== 0 && code !== 200) {
      if (path !== "/solve/check") {
        alert(data?.msg);
      }
      if (data?.msg === "请先登录!") {
        window.location.href = "/login";
      }
      return Promise.reject(data);
    }
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
}
