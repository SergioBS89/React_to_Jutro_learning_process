import React from 'react'
import TimerBar from './TimerBar'
import Answers from './Answers'

export default function QuestionsSection({
    questionText, listAnswers, onSelect, selectedOne, answerState, onTimeOut}) {
    const timeForAswering = 10000
    return (
        <div id='questions'>
            <h2>{questionText}</h2>
            <Answers
                listAnswers={listAnswers}
                selectedOne={selectedOne}
                answerState={answerState}
                onSelect={onSelect}
            />
            <TimerBar timer={timeForAswering} onTimeOut={onTimeOut} />

        </div>
    )
}
