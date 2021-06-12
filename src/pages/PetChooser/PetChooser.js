import React, {useState} from "react";
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import pet_dinosaur from "../../assets/images/pet_dinosaur.jpg";
import pet_princess from "../../assets/images/pet_princess.jpg";
import pet_happy_cat from "../../assets/images/pet_happy_cat.png";
import Button from "../../components/Button/Button";


const useStyles = makeStyles((theme) => ({
    root: {
//        maxWidth: 345,
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
        console.log(response.message)
    };

    const onPetNameChange = (event) => {
        if (errorMessage) {
            setErrorMessage('');
        }
        setPetName(event.target.value);
        console.log(petName);
        console.log("ez meg itt a petname");
    };

    const getPetId = (event) => {
        if (errorMessage) {
            setErrorMessage('');
        }
        setPetId(event.target.id);
        console.log(petId);
        console.log("ez a petid");
    };

    const savePetClick = (event) => {
        event.preventDefault();
        if (!petId || !petName) {
            setErrorMessage('Válassz pajtást és nevezd el!');
            return null;
        }
        console.log(savePet);
        return savePet();
    };


    return (
        <form id="petChooserForm">
            <h3>Üdvözlünk a Kalandorok között!</h3>
            <h3>Kérlek válassz egy kis barátot, aki a társad lesz a kalandozásaid során!</h3>
            <h3>Nincs más dolgod, csak kattints egy képre!</h3>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <Card className={classes.root}>
                        <CardMedia
                            component="img"
                            alt="próba"
                            image={pet_dinosaur}
                            title="Dinó"
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
                            image={pet_princess}
                            title="Princess"
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
                            image={pet_happy_cat}
                            title="Cat"
                            id={3}
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