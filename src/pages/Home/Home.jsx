import NewList from "./NewList";
import Challenges from "./Challenges";
import Side from "./Side";
import Board from "./Board";

const Home = () => {
  return (
    <>
      <main className="container flex items-start px-5 py-6 mx-auto space-x-6 relative">
        {/* 左侧数据图 */}
        <Side />

        {/* 中间主体内容 */}
        <div className="flex-1 flex flex-col gap-3 w-[300px] h-full">
          <Board />
          <Challenges />
        </div>

        {/* 右侧内容 */}
        <div className="w-[340px] h-[1px]">
          <NewList />
        </div>
      </main>
    </>
  );
};

export default Home;
