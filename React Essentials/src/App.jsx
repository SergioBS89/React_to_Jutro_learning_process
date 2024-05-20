import { Header } from "./components/Header/Header";
//React Hooks import (useState)
import { Fragment } from 'react';
import { CoreConceptsSection } from "./components/CoreConcepts/CoreConceptsSection";
import { ReactExamplesSection } from "./components/ReactExamples/ReactExamplesSection";


function MainGoal() {
  return (<div>
    <h4 className="myGoal">My main goal: </h4>
    <p className="myGoal">I want to learn React to increase my knowledge as a Front End Developer and be able to develop in... </p>
    <span className="myGoal jutro">Jutro</span>
  </div>)
}

// It's important to know that we can wrap html code inside <Fragment>
function ExampleFragment(){
  return(
    <Fragment>
      <p>Here wrapping code HTML with 'Fragment'</p>
    </Fragment>
  )
}

function App() {
  return (
    <div>
      <Header />
      <main>
        <CoreConceptsSection />
        <ReactExamplesSection/>
        <h2>Time to get started Sergio!</h2>
        <ExampleFragment/>
        <MainGoal />
      </main>
    </div>
  );
}

export default App;
