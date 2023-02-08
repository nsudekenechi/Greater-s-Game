import "./assets/Output.css";
import "./assets/Style.css";
import { Intro } from "./Components/Intro";
import { StartGame } from "./Components/StartGame";
import { NewGame } from "./Components/NewGame";
import { Settings } from "./Components/Settings";
import { BestScore } from "./Components/BestScore";
import { Data } from "./Data";
import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Instruction } from "./Components/Instruction";
function App() {
  let description = {
    images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"],
    powers: ["Shenlong", "Fucalong", "Yinglong", "Dilong", "Panlong"],
  };
  let location = useLocation();
  let saved = JSON.parse(localStorage.getItem("greaterGame"));
  const card = (index) => {
    return {
      id: Math.floor(Math.random() * 100000000000) + 1,
      isFlipped: false,
      isVerified: false,
      image: description.images[index],
      power: description.powers[index],
      helper: false,
    };
  };
  const generateCards = () => {
    let newCards = [];

    for (let i = 1; i <= 12; i++) {
      let random = Math.floor(Math.random() * description.images.length);
      newCards.push(card(random));
    }

    return newCards;
  };
  //Handles  cards to display based on user location, if a user is on continue game, display cards from local storage
  const handleSetCards = () => {
    return {
      cards:
        location.pathname == "/continueGame" && saved.cardInfo.cards
          ? saved.cardInfo.cards
          : generateCards(),
      target:
        location.pathname == "/continueGame" && saved.cardInfo.cards
          ? saved.cardInfo.target
          : "",
      description: {
        images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"],
        powers: ["Shenlong", "Fucalong", "Yinglong", "Dilong", "Panlong"],
      },
    };
  };
  const handleSetScoreBoard = () => {
    return {
      score:
        location.pathname == "/continueGame" && saved.scoreBoard.score
          ? saved.scoreBoard.score
          : 0,
      moves:
        location.pathname == "/continueGame" && saved.scoreBoard.score
          ? saved.scoreBoard.moves
          : 0,
      itemsMatched:
        location.pathname == "/continueGame" && saved.scoreBoard.score
          ? saved.scoreBoard
          : [],
      selectedCards:
        location.pathname == "/continueGame" && saved.scoreBoard.score
          ? saved.scoreBoard.selectedCards
          : 0,
      gameWon:
        location.pathname == "/continueGame" && saved.scoreBoard.score
          ? saved.scoreBoard.gameWon
          : false,
      helper:
        location.pathname == "/continueGame" && saved.scoreBoard.score
          ? saved.scoreBoard.helper
          : 3,
      helperCard:
        location.pathname == "/continueGame" && saved.scoreBoard.score
          ? saved.scoreBoard.helperCard
          : "",
    };
  };
  let date = new Date();

  // Handles Playing Music and Adjusting Music Volume
  const handleAudio = (audio, audioVolume) => {
    audio.volume = audioVolume;
    if (location.pathname != "/") {
      audio.play();
    }
  };
  const [cardInfo, setCards] = useState(handleSetCards());
  const [scoreBoard, setScoreBoard] = useState(handleSetScoreBoard());
  const [audio, setAudio] = useState({
    backgroundMusic: new Audio("./Files/Audio/1.mp3"),
    backgroundMusicVolume: saved ? saved.audio.backgroundMusicVolume : 0.1,
    SFX: [new Audio("./Files/Audio/2.wav")],
    sfxVolume: saved ? saved.audio.sfxVolume : 0.1,
  });

  useEffect(() => {
    if (!localStorage.getItem("greaterGame")) {
      let scores = {
        highScores: 0,
        bestMoves: 0,
        bestTime: "00:00:00",
        cardInfo: {},
        scoreBoard: {},
        audio: {
          sfxVolume: audio.sfxVolume,
          backgroundMusicVolume: audio.backgroundMusicVolume,
        },
      };
      localStorage.setItem("greaterGame", JSON.stringify(scores));
    }
  }, []);

  useEffect(() => {
    setCards(handleSetCards());
    setScoreBoard(handleSetScoreBoard());
  }, [location.pathname]);

  useEffect(() => {
    handleAudio(audio.backgroundMusic, audio.backgroundMusicVolume);
    audio.backgroundMusic.loop = true;
  }, [audio.backgroundMusicVolume]);

  useEffect(() => {
    audio.SFX.forEach((item) => {
      handleAudio(item, audio.sfxVolume);
    });
  }, [audio.sfxVolume]);

  return (
    <>
      <Data.Provider
        value={{
          cardInfo,
          setCards,
          card,
          generateCards,
          setScoreBoard,
          scoreBoard,
          setAudio,
          audio,
        }}
      >
        <Routes>
          <Route path="/" element={<Intro />}></Route>
          <Route path="/startGame" element={<StartGame />}></Route>
          <Route path="/newGame" element={<NewGame />}></Route>
          <Route path="/continueGame" element={<NewGame />}></Route>
          <Route path="/settings" element={<Settings />}></Route>
          <Route path="/bestScore" element={<BestScore />}></Route>
          <Route path="/instruction" element={<Instruction />}></Route>
        </Routes>
      </Data.Provider>
    </>
  );
}

export default App;
