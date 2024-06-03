/**
 * If we can send by parameter a Ref property, we need to use this structure
 * */
import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from 'react-dom';

const ResultModal = forwardRef(function ResultModal({ targetTime, timeLeft, onReset }, ref) {
  const dialog = useRef();

  const userHasLost = timeLeft <= 0;
  const formattedtimeLeft = (timeLeft / 1000).toFixed(2);
  const score = Math.round((1 - timeLeft / (targetTime * 1000)) * 100);

  useImperativeHandle(ref, () => {
    return {
      openModal() {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog ref={dialog} className="result-modal">
      {userHasLost && <h2>You lost</h2>}
      {!userHasLost && <h2>Your Score: {score}</h2>}
      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopped the timer with{' '}
        <strong>{formattedtimeLeft} seconds left.</strong>
      </p>
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById('modal')
  );
});

export default ResultModal;