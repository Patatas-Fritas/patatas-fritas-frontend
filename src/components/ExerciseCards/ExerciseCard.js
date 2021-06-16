import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';
import {useHistory} from 'react-router-dom';
import Typography from "@material-ui/core/Typography";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import {amber, blue, green, grey, pink, yellow} from "@material-ui/core/colors";
import {Avatar} from "@material-ui/core";
import { exerciseAction } from "../../actions/exercise.action";
import {chuckNorrisApiAction} from "../../actions/chuckNorrisApi.action";

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
      console.log(exercise.type)
      if (exercise.type === 'Hotspot') {
        return yellow[700]
      }
      if (exercise.type == 'Hangman') {
        return pink[500]
      }
      return green[300]
    },
  }
});


export default function ExerciseCard({ exercise }) {
  const dispatch = useDispatch();
  const styles = useStyles(exercise)
  const history = useHistory();

  console.log(exercise)

  function handleClick(e) {
    dispatch(exerciseAction.setCurrentExerciseId(exercise.id))
    if (exercise.type === 'Hotspot') {
      history.push('/hotspot')
    }
    if (exercise.type === 'Hangman') {
      history.push('/hangman')
    }
  }

  return (
    <div onClick={handleClick}>
      <Card elevation={1}>
        <CardHeader
          avatar={
            <Avatar className={styles.avatar2}>
              {exercise.type[0].toUpperCase()}
            </Avatar>
          }
          title={exercise.title}
          subheader={<Typography className={styles.subColor}>{exercise.type}</Typography>}
        />
      </Card>
    </div>
  )
}
