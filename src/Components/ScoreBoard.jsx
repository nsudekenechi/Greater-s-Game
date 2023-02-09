import { GiThirdEye } from "react-icons/gi";
import { CgCardDiamonds } from "react-icons/cg";
import { RiDragMoveFill } from "react-icons/ri";

export const ScoreBoard = ({ scoreBoard }) => {
  return (
    <div className="absolute h-[5%] w-[100%] bg-white shadow-xl -top-[10%] rounded-2xl rounded-bl-2xl flex  justify-between items-center p-10 z-10">
      <div className="bg-green-500 flex p-1 px-2 md:p-2 rounded-md shadow-lg text-white items-center justify-center gap-5">
        <CgCardDiamonds className="md:text-2xl text-white" />
        <h1 className="md:text-md">{scoreBoard.score}</h1>
      </div>
      <div className="bg-red-500 flex p-1 px-2 md:p-2 rounded-md shadow-lg text-white items-center justify-center gap-5">
        <RiDragMoveFill className="md:text-2xl text-white" />
        <h1 className="md:text-md">{scoreBoard.moves}</h1>
      </div>
      <div
        className="bg-pink-500 flex p-1 px-2 md:p-2 rounded-md shadow-lg text-white items-center justify-center gap-5 cursor-pointer"
        onClick={scoreBoard.handleHelper}
      >
        <GiThirdEye className="md:text-2xl" />
        <h1 className="md:text-md">{scoreBoard.helperIcon}</h1>
      </div>
    </div>
  );
};
