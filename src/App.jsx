import "./assets/Output.css";
import "./assets/Style.css";
import { Intro } from "./Components/Intro";
import { StartGame } from "./Components/StartGame";

import { useEffect } from "react";
function App() {
  useEffect(() => {
    // Background Music
    let audio = new Audio("./Files/Audio/1.mp3");
    audio.volume = 0.1;
    audio.loop = true;
    setTimeout(() => {
      audio.play();
    }, 2000);
  }, []);
  return (
    <>
      <div
        className="fixed w-[100%] h-[100%] flex justify-center items-center"
        id="introCon"
      >
        {/* <Intro /> */}
        <StartGame />
      </div>
    </>
  );
}

export default App;
