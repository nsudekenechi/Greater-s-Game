export const StartGame = () => {
  function playSound() {
    let audio = new Audio("./Files/Audio/2.wav");
    audio.volume = 0.2;
    audio.play();
  }
  return (
    <div
      className=" flex flex-col  text-white lg:text-5xl lg:gap-10 md:text-3xl md:gap-5"
      id="startGame"
    >
      <a href="" onMouseOver={playSound}>
        New Game
      </a>
      <a href="" onMouseOver={playSound}>
        Continue
      </a>
      <a href="" onMouseOver={playSound}>
        Settings
      </a>
      <a href="" onMouseOver={playSound}>
        Best Score
      </a>
    </div>
  );
};
