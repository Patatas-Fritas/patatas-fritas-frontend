import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PasswordStrengthBar from 'react-password-strength-bar';
import Button from '../../components/Button/Button';
import './Registration.css';
import amigos2 from "../../assets/images/amigos2.png";

function Registration() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const registerUser = async () => {
        console.log('registration request sent')
        let registrationObj = {
            firstName,
            lastName,
            username,
            email,
            password
        }
        const response = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registrationObj)
        })
        console.log(response.status)
        console.log(response.message)


    };

    const onFirstNameChange = (event) => {
        if (errorMessage) {
            setErrorMessage('');
        } setFirstName(event.target.value);
    };
    const onLastNameChange = (event) => {
        if (errorMessage) {
            setErrorMessage('');
        } setLastName(event.target.value);
    };

    const onUsernameChange = (event) => {
        if (errorMessage) {
            setErrorMessage('');
        } setUsername(event.target.value);
    };

    const onEmailChange = (event) => {
        if (errorMessage) {
            setErrorMessage('');
        } setEmail(event.target.value);
    };

    const onPasswordChange = (event) => {
        if (errorMessage) {
            setErrorMessage('');
        } setPassword(event.target.value);
    };

    const registerClick = (event) => {
        event.preventDefault();
        if (!firstName || !lastName || !username || !password || !email) {
            setErrorMessage('All fields are required.');
            return null;
        }

        // const fullNameFormat = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
        // if (!fullNameFormat.test(String(fullName))) {
        //     setErrorMessage('Full name is invalid.');
        //     return null;
        // }

        const usernameFormat = /^[a-z0-9_-]{3,16}$/ig;
        if (!usernameFormat.test(String(username))) {
            setErrorMessage('Username is invalid. Try something else.');
            return null;
        }

        const emailFormat = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        if (!emailFormat.test(String(email).toLowerCase())) {
            setErrorMessage('E-mail should follow this format: example@mail.com.');
            return null;
        }

        if (password.length < 8) {
            setErrorMessage('Password is too short. Minimum 6 characters.');
            return null;
        }

        const weakPasswordFormat = /^[a-z]+$/;
        if (weakPasswordFormat.test(String(password))) {
            setErrorMessage('Password is too weak. Try adding numbers or special characters.');
            return null;
        }
        return registerUser();
    };

    return (
        <form id="registerForm">
            <img src={amigos2} alt="kids"/>
            <h1>Hozd létre Amigos fiókod</h1>
            <div className="errorMessage">
                {errorMessage}
            </div>
            <label htmlFor="lastName">
                Vezetéknév
                <input
                    name="lastName"
                    value={lastName}
                    type="text"
                    placeholder="Vezetéknév"
                    noValidate
                    onChange={onLastNameChange}
                />
            </label>
            <label htmlFor="firstName">
                Keresztnév
                <input
                    name="firstName"
                    value={firstName}
                    type="text"
                    placeholder="Keresztnév"
                    noValidate
                    onChange={onFirstNameChange}
                />
            </label>
            <label htmlFor="username">
                Felhasználónév
                <input
                    name="username"
                    value={username}
                    type="text"
                    placeholder="felhasználónév"
                    noValidate
                    onChange={onUsernameChange}
                />
            </label>
            <label htmlFor="email">
                E-mail
                <input
                    name="email"
                    value={email}
                    type="e-mail"
                    placeholder="példa@mail.com"
                    noValidate
                    onChange={onEmailChange}
                />
            </label>
            <label htmlFor="password">
                Jelszó
                <input
                    name="password"
                    value={password}
                    type="password"
                    placeholder="jelszó"
                    noValidate
                    onChange={onPasswordChange}
                />
                <PasswordStrengthBar
                    minLength={6}
                    password={password}
                />
            </label>
            <Button
                id="regButton"
                buttonText="Regisztrálok"
                handleClick={registerClick}
                buttonClass={errorMessage ? 'disabledButton' : ''}
            />
        </form>
    );
}

export default Registration;
