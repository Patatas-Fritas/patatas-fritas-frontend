import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import {amber, blue, green, grey, pink, yellow} from "@material-ui/core/colors";
import {Avatar} from "@material-ui/core";

const useStyles = makeStyles({
  subColor: {
    color: grey[500]
  },
  avatar: {
    background: (exercise) => {
      if (exercise.category === 'akasztofa') {
        return amber[400]
      }
      if (exercise.category === 'kepes') {
        return pink
      }
    }
  },
  avatar2: {
    backgroundColor: (exercise) => {
      if (exercise.category == 'akasztofa') {
        return yellow[700]
      }
      if (exercise.category == 'money') {
        return green[500]
      }
      if (exercise.category == 'kepes') {
        return pink[500]
      }
      return amber[300]
    },
  }
});

export default function ExerciseCard({ exercise }) {
  console.log(exercise)
  console.log(exercise.category)
  const styles = useStyles()
  return (
    <div>
      <Card elevation={1}>
        <CardHeader
          avatar={
            <Avatar className={styles.avatar2}>
              {exercise.category[0].toUpperCase()}
            </Avatar>
          }
          title={exercise.title}
          subheader={<Typography className={styles.subColor}>{exercise.category}</Typography>}
        />
      </Card>
    </div>
  )
}
