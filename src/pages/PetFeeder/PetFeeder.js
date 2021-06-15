import React, {useEffect, useState} from "react";
import {makeStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import {Container} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';



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
        color: theme.palette.text.primary,
    },
    title: {
        margin: '5vh'
    }
}));

export function PetFeeder() {
    const [petStatus, setPetStatus] = useState([])

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
                console.log(petStatus)
            } catch (error) {
                console.log(error)
            }
        }

        fetchData()
        console.log(fetchData());
    }, [])

    const feed = (event) => {

        console.log('Kaki');
    };


    return (
        <div>
            {petStatus.isHungry &&
            <h3>Etesd meg kis pajtásod!</h3>}
            {!petStatus.isHungry &&
            <h3>Kis parjtásod már megetetted!</h3>
            }
            <div>
                <Container>
                    <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
                        <Grid item key={petStatus.petId} xs={8} md={12} lg={6}>
                            <CardContent>
                            <Typography variant="body2" color="textPrimary" component="p">
                                {petStatus.petName} 15 ponttal rendelkezik.
                            </Typography>
                            </CardContent>
                            <Card elevation={1}>
                                <Button onClick={() => {
                                    feed(petStatus.petId)
                                }}>Megetetem</Button>

                            </Card>
                        </Grid>

                    </Grid>
                </Container>
            </div>
        </div>
    );
}
