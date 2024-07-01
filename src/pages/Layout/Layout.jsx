import { Outlet } from "react-router-dom";
import bg from "./bg.jpg";
import { useInitApp } from "../../hooks";
import useAppStore from "../../store";
import MyLoading from "../Loading";
import Header from "./Header";
import ParticlesBg from "particles-bg";
import { Toaster } from "sonner";
import { CssBaseline } from "@mui/material";

const DynamicBg = () => (
  <>
    <ParticlesBg
      type="cobweb"
      color="#17803D"
      num={60}
      bg={{
        position: "absolute",
        top: 100,
        left: 0,
        zIndex: 0,
        color: "#fff",
        width: "30%",
        height: "100vh",
      }}
    />
    <ParticlesBg
      type="cobweb"
      color="#17803D"
      num={60}
      bg={{
        position: "absolute",
        top: 100,
        right: 0,
        zIndex: 0,
        color: "#fff",
        width: "30%",
        height: "100vh",
      }}
    />
  </>
);

function ResponsiveAppBar() {
  useInitApp();
  const { loading } = useAppStore();

  return (
    <>
      <CssBaseline />
      {loading ? (
        <MyLoading />
      ) : (
        <div
          className="bg-[#0A102C] relative overflow-x-hidden w-screen h-screen bg-cover"
          style={{ backgroundImage: `url(${bg})` }}
        >
          <Toaster position="top-center" />
          <DynamicBg />
          <Header />
          <div className="z-10 mt-10">
            <Outlet></Outlet>
          </div>
        </div>
      )}
    </>
  );
}
export default ResponsiveAppBar;
