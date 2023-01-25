import { useState, useContext, useEffect } from "react";
import { Cards } from "./Cards";
import { Data } from "../Data";
export const NewGame = () => {
  const cardsItems = useContext(Data);
  const [failedCards, setFailedCards] = useState(0);
  let audio = new Audio("");
  audio.volume = 0.4;

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
        if (prev.target == "") {
          //   Using Target to keep track of correctly selected tags
          prev.target = item.image;
          item.isVerified = true;
        } else {
          // Verifying Item That Matches
          if (prev.target == item.image) {
            item.isVerified = true;
          } else {
            item.isVerified = false;
            setFailedCards(index);
          }
        }

        item.isFlipped = verifyFlip(
          item,
          item.isVerified ? "flipcard.mp3" : "wrongcard.wav"
        );
      }

      return item;
    });
    cardsItems.setCards(prev);
  };

  // Getting Failed card and removing the flipped, so that its going to rotate and show flip card
  useEffect(() => {
    let prev = {
      cards: [...cardsItems.cardInfo.cards],
      target: cardsItems.cardInfo.target,
    };
    setTimeout(() => {
      //Reseting failed cards so that even if user clicks on the same failed card over and over again, its going to keep removing flip
      setFailedCards("");
      prev.cards[failedCards].isFlipped = false;
      cardsItems.setCards(prev);
    }, 500);
  }, [failedCards]);
  return (
    <div className="bg-white w-[80%] h-[80%] rounded-md shadow-lg grid grid-cols-12 gap-10 p-10">
      {cardsItems.cardInfo.cards.map((item) => (
        <Cards
          flipCard={{
            handleflipCard: () => handleflipCard(item.id),
            animateFlipCard: item.isFlipped,
            image: item.image,
            verified: item.isVerified,
          }}
          key={item.id}
        />
      ))}
    </div>
  );
};
