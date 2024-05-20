import SectionTabButton from "./SectionTabButton";
import { TabButton } from "./TabButton"
import { useState } from 'react';
import Tabs from "./Tabs";
import ExamplesCode from "./ExamplesCode";

// We can declare varibles in here
let chooseTopic = 'Please select a Topic clicking the button above'
let topicComponents = 'components'
let topicJsx = 'jsx'
let topicProps = 'props'
let topicState = 'state'

export function ReactExamplesSection(){
    //This is the way to work with states (React hooks and call this component many times)
  let [selectedtopic, setSelectedTopic] = useState()

  function handleSelectedButton(selectedButton) {
    setSelectedTopic(selectedButton)
    console.log(selectedButton);
  }
    return (
        <SectionTabButton id="examples">
          {/* We can pass as a parameter a whole block of code as below*/}
          <Tabs 
          //We can create a custom label as menu, div, etc
          CustomLabel={"menu"} 
          buttons = {
            <>
             {/* isSelected returns true or false in order if the state selectedTopic is equal to its value*/}
             <TabButton isSelected={selectedtopic === topicComponents} onClick={() => handleSelectedButton(topicComponents)}>Components</TabButton>
            <TabButton isSelected={selectedtopic === topicJsx} onClick={() => handleSelectedButton(topicJsx)}>JSX</TabButton>
            <TabButton isSelected={selectedtopic === topicProps} onClick={() => handleSelectedButton(topicProps)}>Props</TabButton>
            <TabButton isSelected={selectedtopic === topicState} onClick={() => handleSelectedButton(topicState)}>State</TabButton>
            </>
          }/>
    
          {/* If there is no tab button selected (State hooks), show the message, otherwise, the examples below are displayed */}
          {!selectedtopic ? <p>{chooseTopic}</p> :
            <ExamplesCode selectedtopic={selectedtopic}/>}
        </SectionTabButton>
    )
}