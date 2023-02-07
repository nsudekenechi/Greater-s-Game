import { GiThirdEye } from "react-icons/gi";
import { CgCardDiamonds } from "react-icons/cg";
import { RiDragMoveFill } from "react-icons/ri";

export const ScoreBoard = ({ scoreBoard }) => {
  return (
    <div className="absolute h-[10%] w-[100%] bg-white shadow-xl -top-[10%] rounded-2xl rounded-bl-2xl flex  justify-between items-center p-10 an">
      <div className="bg-green-500 flex p-2 rounded-md shadow-lg text-white items-center justify-center gap-5">
        <CgCardDiamonds className="text-2xl text-white" />
        <h1 className="text-md">{scoreBoard.score}</h1>
      </div>
      <div className="bg-red-500 flex p-2 rounded-md shadow-lg text-white items-center justify-center gap-5">
        <RiDragMoveFill className="text-2xl text-white" />
        <h1 className="text-md">{scoreBoard.moves}</h1>
      </div>
      <div
        className="bg-pink-500 flex p-2 rounded-md shadow-lg text-white items-center justify-center gap-5 cursor-pointer"
        onClick={scoreBoard.handleHelper}
      >
        <GiThirdEye className="text-2xl" />
        <h1 className="text-md">{scoreBoard.helperIcon}</h1>
      </div>
    </div>
  );
};
