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

      <div className="bg-[rgba(255,255,255,.3)] w-[80%] h-[80%] rounded-md backdrop-blur-sm relative flex  flex-col gap-10 justify-center items-center p-5">
        <h1 className="text-3xl text-white text-center underline underline-offset-8">
          Instruction
        </h1>
        <div className="my-5">
          <p className="text-xl text-blue-500 font-bold">{instruction}</p>
        </div>
        <Link to="/startGame">
          <button className="bg-green-600 px-20 py-2 text-white rounded-md flex items-center gap-2">
            OK
            <GiCheckMark />
          </button>
        </Link>
      </div>
    </div>
  );
};
