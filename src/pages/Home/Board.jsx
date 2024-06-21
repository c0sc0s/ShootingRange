import { BorderBox11 } from "@jiaminghi/data-view-react";
import useAppStore from "../../store";
import ReactMarkdown from "react-markdown";

const Board = () => {
  const { board } = useAppStore();

  return (
    board && (
      <BorderBox11 title="公告">
        <div className="p-11 pt-20 font-custom text-gray-300">
          <ReactMarkdown>{board}</ReactMarkdown>
        </div>
      </BorderBox11>
    )
  );
};

export default Board;
