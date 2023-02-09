import { StartGame } from "./StartGame";
import { Link } from "react-router-dom";
export const Intro = () => {
  return (
    <>
      <div className="flex justify-center items-center w-[100%] h-[100vh]">
        <div
          className="fixed w-[100%] h-[100%] top-0 left-0 -z-10 animate-pulse"
          id="introCon"
        ></div>
        <div className="flex flex-col justify-center items-center gap-10">
          <h1 className="text-white text-6xl font-[Satisfy] text-center md:text-left">
            The Greater's Game
          </h1>

          <Link to={"/startGame"} className="w-[100%] flex justify-center">
            <button className="bg-blue-500 p-3 w-[50%] rounded-md text-white shadow-md shadow-blue-600">
              Continue
            </button>
          </Link>
        </div>
        <p className="text-white absolute bottom-5 right-5 font-[Solitreo]">
          Created by Alabah
        </p>
      </div>
    </>
  );
};
