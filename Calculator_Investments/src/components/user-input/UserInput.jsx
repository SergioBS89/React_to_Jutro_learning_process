import InputLabels from "./imputLabels";
import { useEffect } from "react";

export default function UserInput({handleChange, userInput}) {

    useEffect(() => {
        console.log(userInput);
      }, [userInput]);

    return (
        <section id="user-input">
          <InputLabels
            title="Initial Investment"
            initialValue={userInput.initialInvestment}
            onChange={(event) => handleChange('initialInvestment', event.target.value)}
          />
          <InputLabels
            title="Annual Investment"
            initialValue={userInput.annualInvestment}
            onChange={(event) => handleChange('annualInvestment', event.target.value)}
          />
          <InputLabels
            title="Expected Return"
            initialValue={userInput.expectedReturn}
            onChange={(event) => handleChange('expectedReturn', event.target.value)}
          />
          <InputLabels
            title="Duration"
            initialValue={userInput.duration}
            onChange={(event) => handleChange('duration', event.target.value)}
          />
        </section>
      );
}