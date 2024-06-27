import React, { useCallback } from 'react'
import { useState } from 'react'
import QUESTIONS from '../questions.js'
import { useEffect } from 'react';
import imgGameCompleted from '../assets/quiz-complete.png'
import QuestionsSection from './QuestionsSection.jsx';

export default function Quiz() {

    const [answersPicked, setAnswersPicked] = useState([])
    const [answerState, setAnswerState] = useState('')
    const totalQuestions = QUESTIONS.length;

    /**
     * This logic is applied because a quiz object contains (id, question and answers)
     * So it means, the id of the current question is equal to the number of answers to user has picked (one by question)
     */
    const currentQuestionindex = answerState === '' ? answersPicked.length : answersPicked.length - 1;

    const handlePickedAnswer = useCallback(function handlePickedAnswer(selected) {
        setAnswerState('answered')
        setAnswersPicked((prevAnswers) => {
            return [...prevAnswers, selected];
        });

        setTimeout(() => {
            if (selected === QUESTIONS[currentQuestionindex].answers[0]) {
                setAnswerState('correct')
            } else {
                setAnswerState('wrong')
            }

            setTimeout(() => {
                setAnswerState('');
            }, 2000)
        }, 1000)
    }, [currentQuestionindex]);

    /**
     * Use callback is call here to skip the answer once the time of progress bar ends
     */
    const handleSkipAnswer = useCallback(() => handlePickedAnswer(null), [handlePickedAnswer]);

    useEffect(() => {
        console.log(answersPicked)
    }, [answersPicked]);

    //The game ends if the number of questions is equal as current question
    const isQuizCompleted = (currentQuestionindex === totalQuestions);

    if (isQuizCompleted) {
        return (
            <div id='summary'>
                <img src={imgGameCompleted} alt="" />
                <h2>Game completed</h2>
            </div>
        )
    }

    return (
        <div id='quiz'>
            <QuestionsSection
                questionText={QUESTIONS[currentQuestionindex].question}
                listAnswers={QUESTIONS[currentQuestionindex].answers}
                onSelect={handlePickedAnswer}
                selectedOne={answersPicked[answersPicked.length - 1]}
                answerState={answerState}
                onTimeOut={handleSkipAnswer}
                key={currentQuestionindex}
            />
        </div>
    )
}
