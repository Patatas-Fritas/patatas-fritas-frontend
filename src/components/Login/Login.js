import React, {useEffect, useState} from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import { getUserData } from '../../actions/loginActions';
import Button from '@material-ui/core/Button';
import amigo from '../../assets/images/amigo.png';
import './login.css';
import {loginAction} from "../../actions/login.action";

function Login() {
    const history = useHistory();
    const loginState = useSelector((state) => state.login);

    const dispatch = useDispatch();

    const [usernameInput, setUsernameInput] = useState({
        userValue: null,
        error: '',
    });

    const [passwordInput, setPasswordInput] = useState({
        passwordValue: null,
        error: '',
    });

    function clearState() {
        setUsernameInput('');
        setPasswordInput('');
    }

    useEffect(() => {
        if (loginState.user.username) {
            clearState();
            history.push('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loginState]);

    const [display, setDisplay] = useState({
        color: '#ffffff',
    });

    async function loginClick() {
        setDisplay({
            color: '#f08700',
        });

        if (usernameInput.userValue
            && passwordInput.passwordValue
            && !usernameInput.error
            && !passwordInput.error) {
            const loginObj = {
                username: usernameInput.userValue,
                password: passwordInput.passwordValue,
            };
            const loggedIn = await dispatch(loginAction.login(loginObj));
            // console.log(loggedIn)
            // if (loggedIn === 'success') {
            //     clearState();
            //     history.push('/');
            // }
        }
    }

    const usernameChange = (event) => {
        event.preventDefault();
        const { value } = event.target;

        const regExp = /[^a-z\d]/i;
        let regError = '';
        const regExpTest = regExp.test(value);
        if (regExpTest) { regError = 'Alphanumerical only!'; }

        setUsernameInput({
            userValue: value,
            error: regError,
        });
    };

    const passwordChange = (event) => {
        event.preventDefault();
        const { value } = event.target;
        let { error } = passwordInput;

        error = value.length < 8
            ? 'A jelszónak legalább 4 karakter hosszúnak kell lennie!'
            : '';

        setPasswordInput({
            passwordValue: value,
            error,
        });
    };

    function hitEnter(event) {
        if (event.key === 'Enter') {
            loginClick();
        }
    }

    console.log(loginState.user)

    return (
        <form id="loginForm">
            <img src={amigo} alt="kids"/>
            <h1>Sign in</h1>
            {/*<p className="logError" style={display}>{loginData.errorMessage}</p>*/}
            <label htmlFor="User">
                Felhasználónév
                <input name="User" type="text" onChange={usernameChange} onKeyPress={hitEnter} />
            </label>
            <p className="logError" style={display}>{usernameInput.error}</p>
            <label htmlFor="Password">
                Jelszó
                <input name="Password" type="password" onChange={passwordChange} onKeyPress={hitEnter} />
            </label>
            <p className="logError" style={display}>{passwordInput.error}</p>
            <div className="buttons">
                <Button variant='contained' color='secondary'  onClick={loginClick} buttonClass={!usernameInput.userValue || !passwordInput.passwordValue || usernameInput.error || passwordInput.error ? 'disabledButton' : ''}>BELÉPÉS</Button>
            </div>
        </form>

    );
}

export default (Login);
