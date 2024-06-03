import { useState } from 'react';
import Toast from './components/Toast';

function App() {
  const [toastVisible, setToastVisible] = useState(false);
 
  function handleEnrol() {
    setToastVisible(true);
 
    setTimeout(() => {
      setToastVisible(false);
    }, 3000);
  }
 
  return (
    <div id="app">
      {toastVisible && <Toast message="Enrolled successfully!" />}
      <article>
        <h2>React Course</h2>
        <p>
          A course that teaches you React from the ground up and in great depth!
        </p>
        <button onClick={handleEnrol}>Enrol</button>
      </article>
    </div>
  );
}
 
export default App;

