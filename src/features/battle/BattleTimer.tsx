import { useState, useEffect } from "react";
import { getTimer } from "../../lib/getTimer";
import { useAppSelector } from "../../app/hooks";

export default function BattleTimer() {
  const { battleTimeline } = useAppSelector((state) => state.battle);
  const [timer, setTimer] = useState(getTimer(battleTimeline));

  useEffect(() => {
    if (battleTimeline.checkpoints.length > 0) {
      const intervalId = setInterval(() => {
        setTimer(getTimer(battleTimeline));
      }, 500);

      return () => {
        clearInterval(intervalId);
      };
    } else {
      setTimer("0:00:00");
    }
  }, [battleTimeline]);
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>{timer}</h1>
    </div>
  );
}
