import React, {useState} from "react";
import {makeStyles} from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import pet_dinosaur from "../../assets/images/pets/1.jpg";
import pet_cat from "../../assets/images/pets/2.jpg";
import pet_dog from "../../assets/images/pets/3.jpg";
import pet_fox from "../../assets/images/pets/4.jpg";
import pet_mink from "../../assets/images/pets/5.jpg";
import Typography from "@material-ui/core/Typography";
import Button from "../../components/Button/Button";


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(10),
      height: theme.spacing(16),
    },
  },
  media: {
    maxHeight: 500,
    margin: '0 auto'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function PetChooser() {
  const [petName, setPetName] = useState('');
  const [petId, setPetId] = useState('');
  const token = localStorage.getItem('token');

  const [errorMessage, setErrorMessage] = useState('');
  const classes = useStyles();
  const history = useHistory();

  const savePet = async () => {
    console.log('petchooser request sent')
    let petObj = {
      petId,
      petName
    }
    console.log(token);
    const response = await fetch(`${process.env.REACT_APP_API_URL}/petchooser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'patatas-fritas-token': token
      },
      body: JSON.stringify(petObj)
    })
    console.log(response.status)
    console.log(response)
    history.push('/petfeeder')
  };

  const onPetNameChange = (event) => {
    if (errorMessage) {
      setErrorMessage('');
    }
    setPetName(event.target.value);
  };

  const getPetId = (event) => {
    if (errorMessage) {
      setErrorMessage('');
    }
    console.dir(event.target)
    setPetId(event.target.id);
  };

  const savePetClick = (event) => {
    event.preventDefault();
    if (!petId || !petName) {
      setErrorMessage('V??lassz pajt??st ??s nevezd el!');
      return null;
    }
    return savePet();
  };

    const styles = useStyles();

  return (
    <form id="petChooserForm">
        <Grid container alignContent="center" justify="center"style={{marginTop: "5vh"}}>
      <Grid container alignContent="center" justify="center" style={{marginTop: "3vh", maxWidth: "50%"}}>
        <Typography variant={"h5"}>??dv??zl??nk a Kalandorok k??z??tt!</Typography>
        <Typography variant={"h5"}>K??rlek v??lassz egy kis bar??tot, aki a t??rsad lesz a kalandoz??said
          sor??n!</Typography>
        <Typography variant={"h5"}>Nincs m??s dolgod, csak kattints egy k??pre!</Typography>
      </Grid>
      <Grid container direction="row" spacing={2} md={8} alignItems="center" justify="center" style={{margin: "4vh"}}>
        <Grid item xs={8} md={4} lg={4}>
          <Card className={classes.root}>
            <CardMedia
              className={styles.media}
              component="img"
              alt="pr??ba"
              image={pet_dinosaur}
              title="Dino"
              id={1}
              alignItems="center" justify="center"
              onClick={getPetId}
            />
          </Card>
        </Grid>
          <Grid item xs={8} md={4} lg={4}>
          <Card className={classes.root}>
            <CardMedia
              className={styles.media}
              component="img"
              alt="pr??ba"
              image={pet_cat}
              title="Cat"
              id={2}
              onClick={getPetId}
            />
          </Card>
        </Grid>
          <Grid item xs={8} md={4} lg={4}>
          <Card className={classes.root}>
            <CardMedia
              className={styles.media}
              component="img"
              alt="pr??ba"
              image={pet_dog}
              title="Dog"
              id={3}
              onClick={getPetId}
            />
          </Card>
        </Grid>
          <Grid item xs={8} md={4} lg={4}>
          <Card className={classes.root}>
            <CardMedia
              className={styles.media}
              component="img"
              alt="pr??ba"
              image={pet_fox}
              title="Fox"
              id={4}
              onClick={getPetId}
            />
          </Card>
        </Grid>
          <Grid item xs={8} md={4} lg={4}>
          <Card className={classes.root}>
            <CardMedia
              className={styles.media}
              component="img"
              alt="pr??ba"
              image={pet_mink}
              title="Fox"
              id={5}
              onClick={getPetId}
            />
          </Card>
        </Grid>
      </Grid>
      <Grid container direction="column" justify="center" alignItems="center" spacing={3} style={{ margin: "3vh" }}>
        <Typography variant={"h5"}>
          <label htmlFor="petName">Nevezd el ??j pajt??sod:
            <Grid>
              <input
                name="petName"
                value={petName}
                type="text"
                placeholder="Pajt??sod neve"
                onChange={onPetNameChange}
              />
            </Grid>
          </label>
          <Grid>
            <Button
              id="savButton"
              buttonText="Ment??s"
              handleClick={savePetClick}
              buttonClass={errorMessage ? 'disabledButton' : ''}
            />
          </Grid>
        </Typography>
      </Grid>
        </Grid>
    </form>
  );
}

export default PetChooser;
