import { useEffect } from "react";

export default function DeleteConfirmation({ onConfirm, onCancel }) {

  /**Another example using useEffect, is to close the modal after x seconds... but be careful beacuse to implement this use effect,`
   *  is necessary use the hook useCallback to avoid an infinite loop*/
  useEffect(() => {
    const timerToCloseModal = setTimeout(()=>{
      console.log("starts")
      onConfirm()
    }, 5000);

    return () => {
      console.log("end")
      clearTimeout(timerToCloseModal);
    };
  }, [onConfirm]);
  
  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
      <progress />
    </div>
  );
}
