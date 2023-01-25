import "./assets/Output.css";
import "./assets/Style.css";
import { Intro } from "./Components/Intro";
import { StartGame } from "./Components/StartGame";
import { useEffect, useState } from "react";
import { NewGame } from "./Components/NewGame";
import { Data } from "./Data";
function App() {
  const generateCards = () => {
    let newCards = [];
    let description = {
      images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"],
    };
    for (let i = 1; i <= 12; i++) {
      newCards.push({
        id: Math.floor(Math.random() * 100000000000) + 1,
        isFlipped: false,
        isVerified: false,
        image:
          description.images[
            Math.floor(Math.random() * description.images.length)
          ],
      });
    }

    return newCards;
  };

  const [cardInfo, setCards] = useState({
    cards: generateCards(),
    target: "",
  });

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
        <Data.Provider value={{ cardInfo, setCards }}>
          {/* <Intro /> */}
          {/* <StartGame /> */}
          <NewGame />
        </Data.Provider>
      </div>
    </>
  );
}

export default App;
