import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {hangmanAction} from "../../../actions/hangman.action";
import Button from '@material-ui/core/Button';

function HangmanPage() {
    const { wrongGuessCounter, progress, gameState } = useSelector((state) => state.hangman);

    const dispatch = useDispatch();

    const handleKeyDown = (e) => {
        dispatch(hangmanAction.guessCharacter(e.key))
    }

    useEffect(() => {
        const gameId = '3'
        dispatch(hangmanAction.initializeWordToGuess(gameId))
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
                    <Button variant='contained' color='secondary' onClick={nextClick}>Következő</Button>
                </div>
            )}
            {gameState === 'lose' && (
                <p>Vesztettel</p>
            )}
        </div>
    );
}

export default HangmanPage;
