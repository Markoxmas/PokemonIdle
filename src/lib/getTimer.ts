import { BattleTimeline } from "../features/battle/battleSlice";

//This needs to cover more scenarios
export const getTimer = (battleTimeline: BattleTimeline) => {
  if (battleTimeline.checkpoints.length === 0) {
    return formatTimer(0);
  } else {
    const timeElapsed = Date.now() - battleTimeline.startTime;
    return formatTimer(timeElapsed);
  }
};

function formatTimer(time: number) {
  // Time is in ms. Convert to format H:MM:SS
  let seconds = Math.floor(time / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  seconds = seconds % 60;
  minutes = minutes % 60;
  const formattedTime = `${hours}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  return formattedTime;
}
