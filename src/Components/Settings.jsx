import { GiCheckMark, GiCancel } from "react-icons/gi";
import { Data } from "../Data";
import { useContext } from "react";
import { Link } from "react-router-dom";
export const Settings = () => {
  const cardsItems = useContext(Data);
  const handleChange = (e) => {
    cardsItems.setAudio((prev) => ({
      ...prev,
      [e.target.name]: parseInt(e.target.value) / 100,
    }));
  };

  const saveChanges = () => {
    let saveData = JSON.parse(localStorage.getItem("greaterGame"));
    let newData = {
      ...saveData,
      audio: {
        sfxVolume: cardsItems.audio.sfxVolume,
        backgroundMusicVolume: cardsItems.audio.backgroundMusicVolume,
      },
    };
    localStorage.setItem("greaterGame", JSON.stringify(newData));
  };

  const cancelChanges = () => {
    let saveData = JSON.parse(localStorage.getItem("greaterGame"));
    cardsItems.setAudio((prev) => ({
      ...prev,
      backgroundMusicVolume: saveData.audio.backgroundMusicVolume,
      sfxVolume: saveData.audio.backgroundMusicVolume,
    }));
  };
  return (
    <div className="flex justify-center items-center w-[100%] h-[100vh]">
      <div
        className="fixed w-[100%] h-[100%] top-0 left-0 -z-10 "
        id="introCon2"
      ></div>

      <div className="bg-[rgba(255,255,255,.3)] w-[80%] h-[80%] rounded-md   relative flex  flex-col gap-10 justify-center items-center backdrop-blur-sm">
        <div className="flex flex-col  items-center gap-3 w-[100%] md:w-[50%]">
          <span className="px-5 py-2 rounded-md bg-blue-900 text-white   text-md border border-blue-500">
            Music
          </span>
          <input
            type="range"
            name="backgroundMusicVolume"
            value={cardsItems.audio.backgroundMusicVolume * 100}
            className="w-[80%] md:w-[50%]"
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col items-center gap-3  w-[100%] md:w-[50%]">
          <span className="px-5 py-2 rounded-md bg-blue-900 text-white   text-md border border-blue-500">
            SFX
          </span>
          <input
            type="range"
            name="sfxVolume"
            value={cardsItems.audio.sfxVolume * 100}
            className="w-[80%] md:w-[50%]"
            onChange={handleChange}
          />
        </div>

        <div className=" flex flex-col md:flex-row gap-5 md:gap-20 mt-20">
          <Link to="/startGame" onClick={saveChanges}>
            <button className=" bg-green-600 px-20 py-2 text-white rounded-md flex items-center justify-center gap-2 w-[100%]">
              OK
              <GiCheckMark />
            </button>
          </Link>
          <Link to="/startGame" onClick={cancelChanges}>
            <button className="bg-red-600 px-20 py-2 text-white rounded-md flex items-center justify-center gap-2 w-[100%]">
              Cancel
              <GiCancel />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
