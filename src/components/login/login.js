import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import { getUserData } from '../../actions/loginActions';
import Button from '../Button/Button';
import amigo from '../../assets/images/amigo.png';
import './login.css';

function Login() {
    // const history = useHistory();
    // const loginData = useSelector((state) => state.login);
    //
    // const dispatch = useDispatch();

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
            const loginObject = {
                username: usernameInput.userValue,
                password: passwordInput.passwordValue,
            };
            // const loggedIn = await dispatch(getUserData(loginObject));
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
            ? 'Password must be at least 8 characters long!'
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

    return (
        <form id="loginForm">
            <img src={amigo} alt="kids"/>
            <h1>Sign in</h1>
            {/*<p className="logError" style={display}>{loginData.errorMessage}</p>*/}
            <label htmlFor="User">
                Username
                <input name="User" type="text" onChange={usernameChange} onKeyPress={hitEnter} />
            </label>
            <p className="logError" style={display}>{usernameInput.error}</p>
            <label htmlFor="Password">
                Password
                <input name="Password" type="password" onChange={passwordChange} onKeyPress={hitEnter} />
            </label>
            <p className="logError" style={display}>{passwordInput.error}</p>
            <div className="buttons">
                <Link to="/register"><Button buttonText="REGISTER" buttonClass="emptyButton" /></Link>
                <Button buttonText="LOGIN" handleClick={loginClick} buttonClass={!usernameInput.userValue || !passwordInput.passwordValue || usernameInput.error || passwordInput.error ? 'disabledButton' : ''} />
            </div>
        </form>

    );
}

export default (Login);
