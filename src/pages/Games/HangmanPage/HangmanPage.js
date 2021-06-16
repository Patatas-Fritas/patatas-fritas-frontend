import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {hangmanAction} from "../../../actions/hangman.action";
import Button from '@material-ui/core/Button';

function HangmanPage() {
    const { wrongGuessCounter, progress, gameState } = useSelector((state) => state.hangman);
    const {exerciseId} = useSelector((state) => state.exercise);

    const dispatch = useDispatch();

    const handleKeyDown = (e) => {
        dispatch(hangmanAction.guessCharacter(e.key))
    }

    useEffect(() => {
        dispatch(hangmanAction.initializeWordToGuess(exerciseId))
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
        <div style={{ display: 'flex', marginTop: '2vh' }}>
            <div style={{ margin: '0 auto', width: "50%"}}>
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
        </div>
    );
}

export default HangmanPage;
