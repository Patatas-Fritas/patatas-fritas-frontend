/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, {useEffect, useState} from 'react';
import {Link as RouterLink, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';
import amigosLogo from '../../assets/images/logos/amigos-logo.png'
import jwt_decode from "jwt-decode";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
// import './Header.css';
// import Dropdown from '../Dropdown/Dropdown';

const useStyles = makeStyles({
  header: {
    background: 'linear-gradient(0deg, rgba(178,199,163,1.00) 0%, rgba(92,145,41,1.00) 100%);',
  },

  headerFont: {
    fontFamily: 'Amatic SC'
  },

  image: {
    maxWidth: '100px',
    minWidth: '100px'
  },
  valami: {
    flex: '0 1 auto',
  },
  asd: {
    flex: '1'
  }
});

function Header() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [width, setWidth] = useState(window.innerWidth);
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState(null);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
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

  useEffect(() => {
    if (isLoggedOut) {
      // history.push('/login')
      // setIsLoggedOut(false)
    }

  }, [isLoggedOut === true]);

  const isLoggedIn = () => {
    return localStorage.getItem('token') != null
  }

  const getToken = () => {
    const rawToken = localStorage.getItem('token')
    return jwt_decode(rawToken)
  }

  if (isLoggedIn()) {
    console.log(getToken())
  }

  const styles = useStyles()
  return (
    <AppBar position="static" className={styles.header}>
      <Toolbar>
        <Grid container direction="row" alignItems="center" justify="flex-end">
          <Grid item xs={2}>
            <Link component={RouterLink} to="/">
              <img className={styles.image} src={amigosLogo} alt="Amigos logo"/>
            </Link>
          </Grid>
          <Grid item container direction="row" justify="flex-end" alignItems="center" wrap="nowrap" spacing={2} xs={10}>
            {!isLoggedIn() &&
            <>
              <Grid item className={styles.asd}>
                <Link component={RouterLink} to="/login">
                  <Typography className={styles.headerFont} variant="h4"
                              color='textSecondary'>Bejelentkezes</Typography>
                </Link>
              </Grid>

              <Grid item className={styles.asd}>
                <Link component={RouterLink} to="/register">
                  <Typography className={styles.headerFont} variant="h4" color='textSecondary'>Regisztracio</Typography>
                </Link>
              </Grid>
            </>
            }
            {isLoggedIn() && getToken().role === 'ROLE_ADMIN' &&
            <>
              <Grid item container direction="row" justify="flex-end" alignItems="center" wrap="nowrap" spacing={3}
                    className={styles.asd}>
                <Grid item>
                  <Link component={RouterLink} to="/">
                    <Typography className={styles.headerFont} variant="h4" color='textSecondary'>Oktatas</Typography>
                  </Link>
                </Grid>

                <Grid item>
                  <Link component={RouterLink} to="/register">
                    <Typography className={styles.headerFont} variant="h4"
                                color='textSecondary'>Statisztika</Typography>
                  </Link>
                </Grid>
              </Grid>
            </>
            }
            {isLoggedIn() && getToken().role === 'ROLE_USER' &&
            <>
              <Grid item container direction="row" justify="flex-end" alignItems="center" wrap="nowrap" spacing={3}
                    className={styles.asd}>
                <Grid item>
                  <Link component={RouterLink} to="/exercise">
                    <Typography className={styles.headerFont} variant="h4" color='textSecondary'>Tanulas</Typography>
                  </Link>
                </Grid>

                <Grid item>
                  <Link component={RouterLink} to="/">
                    <Typography className={styles.headerFont} variant="h4" color='textSecondary'>Allatka
                      kucko</Typography>
                  </Link>
                </Grid>
              </Grid>


            </>
            }
            {isLoggedIn() &&
            <>
              <Grid item className={styles.valami}>

                <Typography className={styles.headerFont} variant="h5"
                            color='textSecondary'>Szia {getToken().sub}</Typography>

              </Grid>
              <Grid item>
                <Tooltip title="Kijelentkezes">

                  <IconButton onClick={() => {
                    localStorage.removeItem('token')
                    setIsLoggedOut(true)
                  }} component={RouterLink} to="/login">
                    <MeetingRoomIcon/>
                  </IconButton>

                  {/*<IconButton onClick={() => {*/}
                  {/*  localStorage.removeItem('token')*/}
                  {/*  setIsLoggedOut(true)*/}
                  {/*  history.push('/login')*/}
                  {/*}}>*/}
                  {/*  < MeetingRoomIcon/>*/}
                  {/*</IconButton>*/}
                </Tooltip>
              </Grid>
            </>
            }
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Header;