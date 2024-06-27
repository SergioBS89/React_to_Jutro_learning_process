import React, { useEffect, useState } from 'react'

export default function ProgressBar({timer}) {

    const [remainingTime, setRemainingTime] = useState(timer)

    useEffect(()=>{
        const interval = setInterval(()=>{
            console.log('Interval');
            setRemainingTime((prevTime) => prevTime - 10)
        }, 10)

        return ()=> {
            clearInterval(interval)
        };
    }, []); //Important to keep in mint, when the dependency is an empty array means it will be only executed one time

  return (
    <progress value={remainingTime} max={timer}></progress>
  )
}
