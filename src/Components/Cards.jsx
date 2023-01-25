import { BsPatchQuestion } from "react-icons/bs";
export const Cards = ({ flipCard }) => {
  return (
    <div className=" col-span-2  flip-card" onClick={flipCard.handleflipCard}>
      <div
        className={`hover:cursor-pointer flip-card-inner shadow-2xl rounded-2xl ${
          flipCard.animateFlipCard
            ? `rotate ${flipCard.verified ? "valid" : "invalid"}`
            : ""
        }`}
      >
        <div className="flip-card-front  flex flex-col items-center justify-center gap-5">
          <BsPatchQuestion className="text-3xl" />
          <h1 className="">Flip Card</h1>
        </div>

        <div className="flip-card-back flex flex-col items-center justify-center gap-5">
          <div className="w-[100px] h-[100px] border-2 rounded-full overflow-hidden ">
            <img
              src={`./Files/Images/${flipCard.image}`}
              className="w-[100%] h-[100%]"
            />
          </div>
          <h1 className="">Hello Card</h1>
        </div>
      </div>
    </div>
  );
};
