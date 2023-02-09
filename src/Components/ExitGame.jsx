import { Link } from "react-router-dom";
import { GiCancel, GiCheckMark } from "react-icons/gi";
import { useContext } from "react";
import { Data } from "../Data";
export const ExitGame = ({ handleExitGame }) => {
  const contextData = useContext(Data);
  const startNewGame = () => {
    let storedData = JSON.parse(localStorage.getItem("greaterGame"));
    let newData = {
      ...storedData,
      cardInfo: contextData.cardInfo,
      scoreBoard: contextData.scoreBoard,
    };

    localStorage.setItem("greaterGame", JSON.stringify(newData));
  };
  return (
    <div className="fixed w-[100%] h-[100%]  backdrop-blur-xl  z-10 flex items-center justify-center">
      <div>
        <h1 className="text-3xl font-bold">DO YOU WISH TO EXIT?</h1>
        <div className="mt-10 flex justify-center gap-10">
          <Link to="/startGame" onClick={startNewGame}>
            <button className="text-3xl text-white bg-green-600 rounded-md p-3">
              <GiCheckMark />
            </button>
          </Link>
          <button
            className="text-3xl text-white bg-red-600 rounded-md p-3"
            onClick={handleExitGame}
          >
            <GiCancel />
          </button>
        </div>
      </div>
    </div>
  );
};
