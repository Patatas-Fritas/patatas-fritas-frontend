import React, {useEffect, useState} from "react";
import {makeStyles} from '@material-ui/core/styles';


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
    }, [])



    return (

        <h3>Etesd meg kis pajtásod!</h3>


    );
}
