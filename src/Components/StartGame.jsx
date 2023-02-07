import { Link } from "react-router-dom";
import { useEffect, useContext } from "react";
import { Data } from "../Data";

export const StartGame = () => {
  const cardsItems = useContext(Data);

  function playSound() {
    let audio = new Audio("./Files/Audio/2.wav");
    audio.volume = cardsItems.audio.sfxVolume;
    audio.play();
  }

  return (
    <div className="flex justify-center items-center w-[100%] h-[100vh]">
      <div
        className="fixed w-[100%] h-[100%] top-0 left-0 -z-10 "
        id="introCon2"
      ></div>
      <div
        className=" flex flex-col  text-white lg:text-5xl lg:gap-10 md:text-3xl md:gap-5"
        id="startGame"
      >
        <Link to="/newGame" onMouseOver={playSound}>
          New Game
        </Link>
        <Link to="/continueGame" onMouseOver={playSound}>
          Continue
        </Link>
        <Link to="/settings" onMouseOver={playSound}>
          Settings
        </Link>
        <Link to="/bestScore" onMouseOver={playSound}>
          Best Score
        </Link>
      </div>
    </div>
  );
};
