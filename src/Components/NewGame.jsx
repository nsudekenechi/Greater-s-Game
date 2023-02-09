import { useState, useContext, useEffect } from "react";
import { ExitGame } from "./ExitGame";
import { Cards } from "./Cards";
import { Data } from "../Data";
import { ScoreBoard } from "./ScoreBoard";
import { AiFillStar } from "react-icons/ai";
import { BiRefresh } from "react-icons/bi";
import { GiCancel } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useStopwatch } from "react-timer-hook";

export const NewGame = () => {
  const cardsItems = useContext(Data);
  const [failedCards, setFailedCards] = useState(null);

  const [exitGame, setExitGame] = useState(false);
  let audio = new Audio("");
  audio.volume = cardsItems.audio.sfxVolume;
  const { seconds, minutes, hours } = useStopwatch({ autoStart: true });

  const verifyFlip = (item, src) => {
    // Playing audio only when item have never been flipped
    if (item.isFlipped != true) {
      audio.src = `./Files/Audio/${src}`;
      audio.play();
    }
    return true;
  };
  const handleflipCard = (id) => {
    let prev = {
      cards: [...cardsItems.cardInfo.cards],
      target: cardsItems.cardInfo.target,
    };

    prev.cards.map((item, index) => {
      if (item.id == id) {
        // Getting Number of Moves
        cardsItems.setScoreBoard((prev) => ({
          ...prev,
          moves: !item.isVerified ? prev.moves + 1 : prev.moves,
        }));
        if (prev.target == "") {
          //   Using Target to keep track of correctly selected tags
          prev.target = item.power;
        }
        // Verifying Item That Matches target
        if (prev.target == item.power) {
          // Getting all similar cards, so we know when user selected all cards that are the same
          let similarCards = prev.cards.filter(
            (item) => item.power == prev.target
          );
          if (!item.isVerified) {
            cardsItems.setScoreBoard((prev) => ({
              ...prev,
              score: prev.score + 1,
              itemsMatched: similarCards,
              selectedCards: prev.selectedCards + 1,
            }));
          }
          item.isVerified = true;
        } else {
          item.isVerified = false;
          setFailedCards(index);
        }

        item.isFlipped = verifyFlip(
          item,
          item.isVerified ? "flipcard.mp3" : "wrongcard.wav"
        );
        if (item.id == cardsItems.scoreBoard.helperCard) {
          item.helper = false;
        }
      }

      return item;
    });

    cardsItems.setCards((prevItems) => ({
      ...prevItems,
      cards: prev.cards,
      target: prev.target,
    }));
  };
  const randomizeCards = () => {
    let prevCards = cardsItems.cardInfo.cards.map((item) =>
      item.isFlipped == true
        ? item
        : cardsItems.card(
            Math.floor(
              Math.random() * cardsItems.cardInfo.description.powers.length
            )
          )
    );

    let notTarget = !prevCards
      .filter((item) => !item.isFlipped)
      .some((item) => item.power == cardsItems.cardInfo.target); // Checking if the unflipped doesn't contain any card that have power == target

    if (notTarget) {
      // Replacing any unflipped card with a card that contains target
      let unflipped = prevCards.filter((item) => !item.isFlipped); //Getting all Unflipped Cards
      let removeItem = prevCards.indexOf(
        unflipped[Math.floor(Math.random() * unflipped.length)]
      ); //Getting index of  random Unflipped card we want to swap
      let newCard = cardsItems.card(
        cardsItems.cardInfo.description.powers.indexOf(
          cardsItems.cardInfo.target
        )
      ); //Generating the new card that matches target
      prevCards.splice(removeItem, 1, newCard); //removing one unflipped and inserting new Card
    }

    cardsItems.setCards((prev) => ({
      ...prev,
      cards: prevCards,
    }));
  };
  const handleHelper = () => {
    if (cardsItems.scoreBoard.helper > 0 && cardsItems.cardInfo.target != "") {
      let similarUnflippedCards = [];
      let allCards = [...cardsItems.cardInfo.cards].map((item) => {
        if (!item.isFlipped && item.power == cardsItems.cardInfo.target) {
          similarUnflippedCards.push(item);
        }
        return item;
      });
      let helperCard =
        similarUnflippedCards[
          Math.floor(Math.random() * similarUnflippedCards.length)
        ];
      helperCard.helper = true;
      allCards.splice(allCards.indexOf(helperCard), 1, helperCard);
      cardsItems.setCards((prev) => ({
        ...prev,
        cards: allCards,
      }));

      cardsItems.setScoreBoard((prev) => ({
        ...prev,
        helper: prev.helper - 1,
        helperCard: helperCard.id,
      }));
    }
  };
  const restartGame = () => {
    cardsItems.setResetGame((prev) => !prev);
  };
  const handleExitGame = () => {
    setExitGame((prev) => !prev);
  };
  const editTimer = (time) => {
    return `${time < 10 ? `0${time}` : `${time}`}`;
  };
  // Getting Failed card and removing the flipped, so that its going to keep flipping
  useEffect(() => {
    let prev = {
      cards: [...cardsItems.cardInfo.cards],
      target: cardsItems.cardInfo.target,
      description: cardsItems.cardInfo.description,
    };
    setTimeout(() => {
      if (failedCards != null) {
        prev.cards[failedCards].isFlipped = false;

        //Reseting failed cards so that even if user clicks on the same failed card over and over again, its going to keep keep flip
        setFailedCards(null);
      }
    }, 500);
  }, [failedCards]);

  useEffect(() => {
    // Randomizing cards if every card hasn't been flipped,  flipped cards is greater than 0
    if (
      !cardsItems.cardInfo.cards.every((item) => item.isFlipped) &&
      cardsItems.scoreBoard.selectedCards > 0 &&
      cardsItems.scoreBoard.selectedCards ==
        cardsItems.scoreBoard.itemsMatched.length
    ) {
      randomizeCards();
    }
    // CHecking if every card was successfully flipped, then we want to start a new Game
    if (cardsItems.cardInfo.cards.every((item) => item.isFlipped)) {
      cardsItems.setScoreBoard((prev) => ({ ...prev, gameWon: true }));
    }
  }, [cardsItems.scoreBoard.selectedCards]);

  // Play Success sound when user gains a point
  useEffect(() => {
    if (cardsItems.scoreBoard.score > 0) {
      let successAudio = new Audio("./Files/Audio/Flip.wav");
      successAudio.volume = 0.6;
      successAudio.play();
    }
  }, [Math.floor(cardsItems.scoreBoard.score / 2)]);

  // Storing Highscore in Local Storage
  useEffect(() => {
    if (cardsItems.scoreBoard.gameWon) {
      let scores = {
        highScores: Math.floor(
          (Math.floor(cardsItems.scoreBoard.score / 2) * 100) /
            Math.floor(cardsItems.scoreBoard.moves / 2)
        ),
        bestMoves: Math.floor(cardsItems.scoreBoard.moves / 2),
        bestTime: `${editTimer(hours)}:${editTimer(minutes)}:${editTimer(
          seconds
        )}`,
      };

      let storedScores = JSON.parse(localStorage.getItem("greaterGame"));
      // Assigning new high score if current score is greater than stored score
      let newScores = {
        ...storedScores,
        cardInfo: {},
        scoreBoard: {},
        highScores:
          storedScores.highScores > scores.highScores
            ? storedScores.highScores
            : scores.highScores,
        bestMoves:
          storedScores.bestMoves > 0 &&
          storedScores.bestMoves < scores.bestMoves
            ? storedScores.bestMoves
            : scores.bestMoves,
        // If stored time is less than current time, then best time is stored time, if current time is less than stored time, current time is best time
        bestTime:
          storedScores.bestTime != "00:00:00" &&
          storedScores.bestTime < scores.bestTime
            ? storedScores.bestTime
            : scores.bestTime,
      };
      localStorage.setItem("greaterGame", JSON.stringify(newScores));
    }
  }, [cardsItems.scoreBoard.gameWon]);
  return (
    <div className="flex justify-center items-center w-[100%] h-[100vh]">
      <div className="absolute top-0 left-0 text-white text-3xl p-0 md:p-8">
        <GiCancel className="cursor-pointer" onClick={handleExitGame} />
      </div>
      <div
        className="fixed w-[100%] h-[100%] top-0 left-0 -z-10 animate-pulse"
        id="introCon"
      ></div>
      <div className="bg-white w-[90%] md:w-[80%] h-[80%] rounded-md shadow-lg  relative">
        <ScoreBoard
          scoreBoard={{
            score: Math.floor(cardsItems.scoreBoard.score / 2),
            moves: Math.floor(cardsItems.scoreBoard.moves / 2),
            helperIcon: cardsItems.scoreBoard.helper,
            handleHelper,
          }}
        />

        <div className="grid grid-cols-12 px-5 py-10 gap-5 md:gap-10 md:p-10 h-[90%]  overflow-x-auto">
          {cardsItems.cardInfo.cards.map((item) => (
            <Cards
              flipCard={{
                handleflipCard: () => handleflipCard(item.id),
                animateFlipCard: item.isFlipped,
                image: item.image,
                verified: item.isVerified,
                power: item.power,
                helper: item.helper,
              }}
              key={item.id}
            />
          ))}
        </div>
      </div>

      {cardsItems.scoreBoard.gameWon && (
        <div className="fixed w-[100%] h-[100%] backdrop-blur-sm bg-[rgba(0,0,0,.5)] flex justify-center items-center z-20">
          <div className="flex flex-col gap-2">
            {cardsItems.scoreBoard.moves <= 6 ? (
              <h1 className="flex justify-center items-center gap-5 text-yellow-500  ">
                <AiFillStar className="text-6xl " />
                <AiFillStar className="text-8xl " />
                <AiFillStar className="text-6xl " />
              </h1>
            ) : cardsItems.scoreBoard.moves > 6 &&
              cardsItems.scoreBoard.moves <= 12 ? (
              <h1 className="flex justify-center items-center gap-5 text-yellow-500  ">
                <AiFillStar className="text-6xl " />

                <AiFillStar className="text-6xl " />
              </h1>
            ) : (
              <h1 className="flex justify-center items-center gap-5 text-yellow-500  ">
                <AiFillStar className="text-6xl " />
              </h1>
            )}
            <h1 className="text-5xl font-bold text-white mb-5">You Won!!</h1>
            <h1 className="text-3xl  text-white text-center">
              Moves : {Math.floor(cardsItems.scoreBoard.moves / 2)}
            </h1>
            <h1 className="text-3xl  text-white text-center">
              Score :{" "}
              {Math.floor(
                (Math.floor(cardsItems.scoreBoard.score / 2) * 100) /
                  Math.floor(cardsItems.scoreBoard.moves / 2)
              )}
            </h1>
            <div className="mt-10 flex justify-center gap-10">
              <button
                className="text-5xl text-white bg-green-600 rounded-md p-2"
                onClick={restartGame}
              >
                <BiRefresh />
              </button>
              <Link to="/startGame" onClick={restartGame}>
                <button className="text-5xl text-white bg-red-600 rounded-md p-2">
                  <GiCancel />
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {exitGame && <ExitGame handleExitGame={handleExitGame} />}
    </div>
  );
};
