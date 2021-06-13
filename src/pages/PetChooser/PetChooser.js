import React, {useState} from "react";
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import pet_dinosaur from "../../assets/images/chooser/1.jpg";
import pet_cat from "../../assets/images/chooser/2.jpg";
import pet_dog from "../../assets/images/chooser/3.jpg";
import pet_fox from "../../assets/images/chooser/4.jpg";
import pet_mink from "../../assets/images/chooser/5.jpg";
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


    return (
        <form id="petChooserForm">
            <h3>Üdvözlünk a Kalandorok között!</h3>
            <h3>Kérlek válassz egy kis barátot, aki a társad lesz a kalandozásaid során!</h3>
            <h3>Nincs más dolgod, csak kattints egy képre!</h3>
            <Grid container spacing={5}>
                <Grid item xs={4}>
                    <Card className={classes.root}>
                        <CardMedia
                            component="img"
                            alt="próba"
                            image={pet_dinosaur}
                            title="Dino"
                            id={1}
                            onClick={getPetId}
                        />
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card className={classes.root}>
                        <CardMedia
                            component="img"
                            alt="próba"
                            image={pet_cat}
                            title="Cat"
                            id={2}
                            onClick={getPetId}
                        />
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card className={classes.root}>
                        <CardMedia
                            component="img"
                            alt="próba"
                            image={pet_dog}
                            title="Dog"
                            id={3}
                            onClick={getPetId}
                        />
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card className={classes.root}>
                        <CardMedia
                            component="img"
                            alt="próba"
                            image={pet_fox}
                            title="Fox"
                            id={4}
                            onClick={getPetId}
                        />
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card className={classes.root}>
                        <CardMedia
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
            <label htmlFor="petName">Nevezd el új pajtásod:
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
        </form>
    );
}

export default PetChooser;