import Form from "./components/Form";
import React from 'react';

 export default function App() {
  const form = React.useRef();
 
  function handleRestart() {
    form.current.clear();
  }
 
  return (
    <div id="app">
      <button onClick={handleRestart}>Restart</button>
      <Form ref={form} />
    </div>
  );
}
