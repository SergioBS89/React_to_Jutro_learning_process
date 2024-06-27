
import React, { useEffect, useState } from 'react'

export default function TimerBar({ timer, onTimeOut }) {

    const [remainingTime, setRemainingTime] = useState(timer)

    useEffect(() => {
        const timeOut = setTimeout(onTimeOut, timer);
        //If one of those dependecies changes, it will be executed

        return () => {
            clearTimeout(timeOut);
        }
    }, [onTimeOut, timer]);

    useEffect(() => {
        console.log('Interval');
        const interval = setInterval(() => {
            setRemainingTime((prevTime) => prevTime - 100)
        }, 100)

        //it clean this interval
        return () => {
            clearInterval(interval)
        };
    }, []);

    return (
        <div id='question'>
            <progress className='progress' value={remainingTime} max={timer}></progress>
        </div>
    )
}