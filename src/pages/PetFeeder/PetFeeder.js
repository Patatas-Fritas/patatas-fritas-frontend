import React, {useEffect, useState} from "react";
import {makeStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import {Container} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import sad_3 from "../../assets/images/pets/sad_3.jpg";
import happy_3 from "../../assets/images/pets/happy_3.jpg";


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
        color: theme.palette.text.primary,
    },
    title: {
        margin: '5vh'
    }
}));

export function PetFeeder() {
    const [petStatus, setPetStatus] = useState([])
    const [errorMessage, setErrorMessage] = useState('');
    const token = localStorage.getItem('token');


    useEffect(() => {
        const token = localStorage.getItem('token');

        async function fetchData() {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/petfeeder`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'patatas-fritas-token': token
                    }
                })
                const data = await response.json()
                setPetStatus(data)
                console.log(petStatus.petId)
            } catch (error) {
                console.log(error)
            }
        }

        fetchData()
        console.log(fetchData());
    }, [])

    const feed = (event) => {
        event.preventDefault();
        if (petStatus.petScore < 5) {
            setErrorMessage('Sajnos nincs elég pontod, hogy megetes, játsz egyet hogy megtehesd!')
        }
        feedPet();
    }

    const feedPet = async () => {
        console.log('petchooser request sent')
        console.log(token);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/petfeeder`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'patatas-fritas-token': token
                },
            })
            const data = await response.json()
            setPetStatus(data)
        } catch (error) {
            console.log(error)
        }
        console.log(petStatus)
        console.log('kész');
    };


    /*    function getImageName(id, isHungry) {
            if (isHungry) {
                console.log("éhes");
                return "sad_".concat(id);
            } else {
                return "happy_" + id;
            }
        }*/

    const styles = useStyles();


    return (
        <div>
            <Typography align={"center"} variant={"h4"}>Kisállat etető</Typography>
            {!petStatus.isHungry
                ? <Typography align={"center"} variant={"h6"}>Ma már megetettél! Játsz velem holnap is hogy
                    lakomázhassak!</Typography>
                : <Typography align={"center"} variant={"h6"}>Már nagyon éhes vagyok! Alig várom, hogy
                    megetess!</Typography>
            }
            <div>
                <Container>
                    <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
                        <Grid item key={petStatus.petId} xs={8} md={12} lg={6}>
                            <CardContent>
                                <Typography align={"center"} variant={"h6"} color="textPrimary" component="p">
                                    {petStatus.petName} {petStatus.petScore} ponttal rendelkezik.
                                </Typography>
                                {petStatus.isHungry &&
                                <img style={{margin: '0 auto', display: "flex", maxWidth: "50%"}} className={styles.media} src={sad_3} alt='image'/>}
                                {!petStatus.isHungry &&
                                <img style={{margin: '0 auto', display: "flex", maxWidth: "50%"}} className={styles.media} src={happy_3} alt='image'/>
                                }

                            </CardContent>
                            <Card elevation={1}>
                                <Button  style={{margin: '0 auto', display: "flex", maxWidth: "20%"}} onClick={feed}><Typography align={"center"}
                                                                   variant={"h6"}> Megetetem</Typography></Button>

                            </Card>
                        </Grid>

                    </Grid>
                </Container>
            </div>
        </div>
    );
}
