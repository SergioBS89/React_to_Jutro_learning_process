import React, { useRef } from 'react'

export default function Answers({ listAnswers, selectedAnswer, answerState, onSelectAnswer }) {

    /**
  * Use ref is to target a object in any moment of the life cicle.
  */
    const mixedAnswers = useRef();

    /**
 * Spread operator [...] create a copy of the array, leaving the original.
 * This is done due to QUESTIONS.Js contains all the anwers as the first one as correct
 * so to display them randomly sorted, we create a copy of the array.
 * 
 * If the mixedAnswers are undefined means there was not mixed yet
 */
    if (!mixedAnswers.current) {
        mixedAnswers.current = [...listAnswers].sort(() => Math.random() - 0.5)
    }

    return (
        <ul id='answers'>
            {mixedAnswers.current.map((answer) => {
                let lastAnswerSelected = selectedAnswer === answer
                let cssStyle = ''

                if (answerState === 'answered' && lastAnswerSelected) {
                    cssStyle = 'selected'
                }

                if ((answerState === 'correct' || answerState === 'wrong') && lastAnswerSelected) {
                    cssStyle = answerState
                }
                return <li key={answer} className='answer'>
                    <button
                        className={cssStyle}
                        onClick={()=> onSelectAnswer(answer)}
                        disabled={answerState !== ''}
                        >{answer}</button>
                </li>
            })}
        </ul>
    )
}
