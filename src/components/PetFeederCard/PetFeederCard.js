import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import {amber, green, grey, pink, yellow} from "@material-ui/core/colors";

const useStyles = makeStyles({
    subColor: {
        color: grey[500]
    }
});

export default function PetFeederCard({ petStatus, feed }) {
    console.log(petStatus)
    console.log(petStatus.category)
    const styles = useStyles()
    return (
        <div>
            <Card elevation={1}>
                action={
                // eslint-disable-next-line react/jsx-no-undef
                <Button onClick={() => { feed(petStatus.petId) }}>Megetetem</Button>
            }
                title={petStatus.title}
                subheader={petStatus.category}
                />
            </Card>
        </div>
    )
}