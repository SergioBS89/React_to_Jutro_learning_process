import React, { useState } from 'react'
import TimerBar from './TimerBar'
import Answers from './Answers'
import QUESTIONS from '../questions.js'

export default function QuestionsSection({questionIndex, onSelectAnswer, onTimeOut }) {
    const timeForAswering = 15000

    const [answer, setAnswer] = useState({
        selectedAnswer: '',
        isCorrect: null
    })

    function handleSelectedAnswer(answer) {
        setAnswer({
            selectedAnswer: answer,
            isCorrect: null
        })

        /**
         * Those time out are used to know if the answer picked is true, and it will change the styles 
         */
        setTimeout(() => {
            setAnswer({
                selectedAnswer: answer,
                //we know the first element of each group of answers is the correct
                isCorrect: QUESTIONS[questionIndex].answers[0] === answer
            })

            setTimeout(() => {
            //call the function handlePickedAnswer()
              onSelectAnswer(answer);
            }, 2000)
        }, 1000)

        console.log({answer})
    }

    /**^
     * it changes the styles depending if the answer picked is true or false 
     */
    let answerState = ''
    if(answer.selectedAnswer && answer.isCorrect != null){
        answerState = answer.isCorrect ? 'correct' : 'wrong'
    }
    else if (answer.selectedAnswer){
        answerState = 'answered'
    }

    return (
        <div id='questions'>
            <h2>{QUESTIONS[questionIndex].question}</h2>
            <Answers
                listAnswers={QUESTIONS[questionIndex].answers}
                selectedAnswer={answer.selectedAnswer}
                answerState={answerState}
                onSelectAnswer={handleSelectedAnswer}
            />
            <TimerBar timer={timeForAswering} onTimeOut={onTimeOut} />
        </div>
    )
}
