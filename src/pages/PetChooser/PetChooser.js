import React, {useState} from "react";
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';
import pet_dinosaur from "../../assets/images/chooser/chooser_1.jpg";
import pet_cat from "../../assets/images/chooser/chooser_2.jpg";
import pet_dog from "../../assets/images/chooser/chooser_3.jpg";
import pet_fox from "../../assets/images/chooser/chooser_4.jpg";
import pet_mink from "../../assets/images/chooser/chooser_5.jpg";
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
        setPetId(event.target.id);
    };

    const savePetClick = (event) => {
        event.preventDefault();
        if (!petId || !petName) {
            setErrorMessage('Válassz pajtást és nevezd el!');
            return null;
        }
        return savePet();
    };

    const styles = useStyles();

    return (
        <form id="petChooserForm">
            <div style={{margin: '0 auto'}}>
                <Typography variant={"h5"}>Üdvözlünk a Kalandorok között!</Typography>
                <Typography variant={"h5"}>Kérlek válassz egy kis barátot, aki a társad lesz a kalandozásaid
                    során!</Typography>
                <Typography variant={"h5"}>Nincs más dolgod, csak kattints egy képre!</Typography>
            </div>
            <Grid container direction="row" spacing={2} md={12} alignItems="center" justify="center">
                <Grid item xs={4} md={4} lg={4} style={{maxWidth: "20%"}}>
                    <Card className={classes.root}>
                        <CardMedia
                            className={styles.media}
                            component="img"
                            alt="próba"
                            image={pet_dinosaur}
                            title="Dino"
                            id={1}
                            alignItems="center" justify="center"
                            onClick={getPetId}
                        />
                    </Card>
                </Grid>
                <Grid item xs={4} md={4} lg={6} style={{maxWidth: "20%"}}>
                    <Card className={classes.root}>
                        <CardMedia
                            className={styles.media}
                            component="img"
                            alt="próba"
                            image={pet_cat}
                            title="Cat"
                            id={2}
                            onClick={getPetId}
                        />
                    </Card>
                </Grid>
                <Grid item xs={4} md={4} lg={6} style={{maxWidth: "20%"}}>
                    <Card className={classes.root}>
                        <CardMedia
                            className={styles.media}
                            component="img"
                            alt="próba"
                            image={pet_dog}
                            title="Dog"
                            id={3}
                            onClick={getPetId}
                        />
                    </Card>
                </Grid>
                <Grid item xs={4} md={6} style={{maxWidth: "20%"}}>
                    <Card className={classes.root}>
                        <CardMedia
                            className={styles.media}
                            component="img"
                            alt="próba"
                            image={pet_fox}
                            title="Fox"
                            id={4}
                            onClick={getPetId}
                        />
                    </Card>
                </Grid>
                <Grid item xs={4} md={6} style={{maxWidth: "20%"}}>
                    <Card className={classes.root}>
                        <CardMedia
                            className={styles.media}
                            component="img"
                            alt="próba"
                            image={pet_mink}
                            title="Fox"
                            id={5}
                            onClick={getPetId}
                        />
                    </Card>
                </Grid>
            </Grid>
            <div>
                <Typography variant={"h5"}><label htmlFor="petName">Nevezd el új pajtásod:
                    <input
                        name="petName"
                        value={petName}
                        type="text"
                        placeholder="Pajtásod neve"
                        onChange={onPetNameChange}
                    /></label>
                    <Button
                        id="savButton"
                        buttonText="Mentés"
                        handleClick={savePetClick}
                        buttonClass={errorMessage ? 'disabledButton' : ''}
                    />

                </Typography>
            </div>
        </form>
    );
}

export default PetChooser;

