import { Link } from "react-router-dom";
import { GiCheckMark, GiCancel } from "react-icons/gi";
import { useState, useEffect } from "react";

export const Instruction = () => {
  let text =
    "Click any card in other to flip it, the first card flipped, should be the target of other cards.";
  let [instruction, setInstruction] = useState("");
  let text2 = "";
  let index = 0;
  useEffect(() => {
    let id = setInterval(() => {
      if (index >= text.length) {
        clearInterval(id);
      } else {
        text2 += text[index];
        setInstruction(text2);
        index++;
      }
    }, 100);
  }, []);
  return (
    <div className="flex justify-center items-center w-[100%] h-[100vh]">
      <div
        className="fixed w-[100%] h-[100%] top-0 left-0 -z-10 "
        id="introCon2"
      ></div>

      <div className="bg-[rgba(255,255,255,.3)] rounded-md backdrop-blur-sm relative flex  flex-col justify-center items-center px-5 gap-5 h-[80%] w-[80%]  md:px-20 md:gap-10  md:text-3xl lg:text-xl">
        <h1 className="text-3xl text-white text-center underline underline-offset-8">
          Instruction
        </h1>
        <div className="my-5 md:my-0">
          <p className=" text-blue-500 font-bold text-2xl">{instruction}</p>
        </div>
        <Link to="/startGame">
          <button className="text-lg bg-green-600 px-20 py-2 text-white rounded-md flex items-center gap-2">
            OK
            <GiCheckMark />
          </button>
        </Link>
      </div>
    </div>
  );
};
