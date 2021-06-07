import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {hangmanAction} from "../../../actions/hangman.action";

function HangmanPage() {
    const { wrongGuessCounter, progress, gameState } = useSelector((state) => state.hangman);

    const dispatch = useDispatch();

    const handleKeyDown = (e) => {
        dispatch(hangmanAction.guessCharacter(e.key))
    }

    useEffect(() => {
        dispatch(hangmanAction.initializeWordToGuess())
        document.addEventListener("keydown", handleKeyDown, false)

        return () => {
            document.removeEventListener('keydown', () => {})
        }
    }, []);

    console.log(progress)
    const progressWithSpaces = progress ? progress.split('').map(c =>  c + ' ').join('') : ''

    const nextClick = (e) => {
        dispatch(hangmanAction.nextWord())
    }

    return (
        <div>
            <p>Wrong Guess: {wrongGuessCounter}</p>
            <p>{progressWithSpaces}</p>
            {gameState === 'win' && (
                <div>
                    <p>Nyertel</p>
                    <button onClick={nextClick}>Kovetkezo</button>
                </div>
            )}
            {gameState === 'lose' && (
                <p>Vesztettel</p>
            )}
        </div>
    );
}

export default HangmanPage;
