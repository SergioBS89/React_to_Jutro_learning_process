import Header from "./components/Header";
import Results from "./components/Results";
import UserInput from "./components/user-input/UserInput";
import { useState } from "react";

function App() {

  const [userInput, setUserInput] = useState({
    initialInvestment: 1000,
    annualInvestment: 50,
    expectedReturn: 5,
    duration: 12
  })

  const isInputValid = userInput.duration > 0

  function handleChange(inputIdentifier, newValue) {
    setUserInput(prevUserInput => {
      return {
        ...prevUserInput,
        //Adding + symbol, we force to cast newValue as number
        [inputIdentifier]: +newValue
      }
    })
  }

  return (
    <>
      <Header />
      <UserInput handleChange={handleChange} userInput={userInput} />
      {!isInputValid && <p className="center">Please enter a duration greater than 0</p>}
      {isInputValid && <Results userInput={userInput} />}
    </>
  )
}

export default App
