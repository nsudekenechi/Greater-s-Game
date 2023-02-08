import { Link } from "react-router-dom";
import { GiCheckMark, GiCancel } from "react-icons/gi";

export const BestScore = () => {
  return (
    <div className="flex justify-center items-center w-[100%] h-[100vh]">
      <div
        className="fixed w-[100%] h-[100%] top-0 left-0 -z-10 "
        id="introCon2"
      ></div>

      <div className="bg-[rgba(255,255,255,.3)] w-[80%] h-[80%] rounded-md   relative flex  flex-col gap-10 justify-center items-center backdrop-blur-sm">
        <div className="flex flex-col items-center gap-3 w-[50%]">
          <div className="flex gap-5 text-white items-center">
            <span className="text-2xl">Best Score: </span>
            <span className="text-xl text-blue-500 font-bold">
              {JSON.parse(localStorage.getItem("greaterGame")).highScores}
            </span>
          </div>

          <div className="flex gap-5 text-white items-center">
            <span className="text-2xl">Best Move: </span>
            <span className="text-xl text-blue-500 font-bold">
              {JSON.parse(localStorage.getItem("greaterGame")).bestMoves}
            </span>
          </div>

          <div className="flex gap-5 text-white items-center">
            <span className="text-2xl">Best Time: </span>
            <span className="text-xl text-blue-500 font-bold">
              {JSON.parse(localStorage.getItem("greaterGame")).bestTime}
            </span>
          </div>

          <Link to="/startGame" className="mt-5">
            <button className="bg-green-600 px-20 py-2 text-white rounded-md flex items-center gap-2">
              OK
              <GiCheckMark />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
