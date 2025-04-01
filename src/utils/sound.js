import { Howl } from "howler";

const swapSound = new Howl({
  src: ["/sounds/swap.mp3"],
  volume: 0.5,
});

export const playSwapSound = () => {
  swapSound.play();
};
