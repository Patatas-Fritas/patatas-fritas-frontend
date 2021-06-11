/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import { logOutAction } from '../../actions/loginActions';
import amigosLogo from '../../assets/images/logos/amigos-logo.png'
import './Header.css';
import Dropdown from '../Dropdown/Dropdown';

function Header() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [width, setWidth] = useState(window.innerWidth);
  const [open, setOpen] = useState(false);
  const loginState = useSelector((state) => state.login);

  const handleResize = () => {
    setWidth([window.innerWidth]);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (width > 600) {
      setOpen(true);
    }
  }, [width]);

  const kidItems = [
    {
      title: 'Tanulás',
      path: '/',
    },
    {
      title: 'Állatka kuckó',
      path: '/',
    },
    {
      title: 'Kijelentkezés',
      path: '/',
      // action: () => {
      //   dispatch(logOutAction());
      //   localStorage.removeItem('token');
      // },
    },
  ];

  const adminItems = [
    {
      title: 'Oktatás',
      path: '/',
    },
    {
      title: 'Statisztika',
      path: '/',
    },
    {
      title: 'Kijelentkezés',
      path: '/',
      // action: () => {
      //   dispatch(logOutAction());
      //   localStorage.removeItem('token');
      // },
    },
  ];

  return (
    <nav className="navbar">
      <div
        className="logo"
        onClick={() => history.push('/')}
      >
        <div className="logo-img-container">
          <img
            className="logo-img"
            src={amigosLogo}
            alt="FoxTicket logo"
          />
        </div>
        {width <= 600
        && (
        <i
          onClick={() => setOpen(!open)}
          className="fas fa-bars bars"
        />
        ) }
      </div>
      <ul
        className="nav-links"
        style={{ display: open ? 'flex' : 'none' }}
      >
        {loginState.username ? (
          <div className="dd-menu">
            <Dropdown
              title={
              loginState.role === 'ROLE_ADMIN' ? `Hello Admin ${loginState.username}`
                : `Hello ${loginState.username}`
            }
              items={
                loginState.userType === 'ROLE_ADMIN' ? adminItems
                : kidItems
            }
            />
          </div>
        ) : (
          <>
            <Link
              to="/login"
              style={{ textDecoration: 'none' }}
            >
              <li
                className="nav-link"
                id="login-link"
              >
                Bejelentkezés
              </li>
            </Link>
            <Link
              to="/register"
              style={{ textDecoration: 'none' }}
            >
              <li
                className="nav-link"
              >
                Regisztrálás
              </li>
            </Link>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Header;
