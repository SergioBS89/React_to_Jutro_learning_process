import React from 'react'
import logo from '../assets/quiz-logo.png';

export default function Header() {
    return (
        <header>
            <img src={logo} alt="Logo" />
            <h1>React Quiz Game</h1>
        </header>
    )
}
