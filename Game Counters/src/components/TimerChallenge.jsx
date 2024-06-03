import { useRef, useState } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
  const timer = useRef();
  const modal = useRef();

  const initialTargetTime = targetTime * 1000

  const [timeLeft, setTimeRemaining] = useState(initialTargetTime);

  const timerIsActive = timeLeft > 0 && timeLeft < initialTargetTime;

  if (timeLeft <= 0) {
    clearInterval(timer.current);
    modal.current.open();
  }

  function handleReset() {
    setTimeRemaining(initialTargetTime);
  }

  function handleStart() {
    timer.current = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
    }, 10);
  }

  function handleStop() {
    modal.current.openModal();
    clearInterval(timer.current);
  }

  return (
    <>
      <ResultModal
        ref={modal}
        targetTime={targetTime}
        timeLeft={timeLeft}
        onReset={handleReset}
      />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? 's' : ''}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? 'Stop' : 'Start'} Chrono
          </button>
        </p>
        <p className={timerIsActive ? 'active' : undefined}>
          {timerIsActive ? 'Time is running...' : 'Timer inactive'}
        </p>
      </section>
    </>
  );
}