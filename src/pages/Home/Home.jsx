import { CssBaseline } from "@mui/material";
import NewList from "./NewList";
import Challenges from "./Challenges";
import Side from "./Side";
import Board from "./Board";

const Home = () => {
  return (
    <>
      <CssBaseline />
      <main className="max-w-screen-xl mx-auto flex items-start  space-x-6 py-6">
        <Side />

        <div className="flex-1 flex flex-col gap-3 w-[300px] h-full overflow-scroll ">
          <Board />
          <Challenges />
        </div>

        <div className="w-[340px] overflow-scroll h-full">
          <NewList />
        </div>
      </main>
    </>
  );
};

export default Home;
