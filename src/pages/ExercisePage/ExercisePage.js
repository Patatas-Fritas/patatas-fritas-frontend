import React, {useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import {Container} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import ExerciseCard from "../../components/ExerciseCards/ExerciseCard";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  // darkColor: {
  //   //   color: theme.palette.primary.dark
  //   // },
  title: {
    margin: '5vh'
  }
});


export function ExercisePage() {
  const [exercises, setExercises] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('token');

    async function fetchData() {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/games`, {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          headers: {
            'Content-Type': 'application/json',
            'patatas-fritas-token': token
          }
        })
        const data = await response.json()
        console.log(data)
        setExercises(data)
      } catch(error) {
          console.log(error)
      }
    }
    fetchData()
},[])

const styles = useStyles()

return (
  <div>
    <Typography variant={"h3"} color="primary" className={styles.title}>Feladatok</Typography>
    <Container>
      <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
        {exercises.map(exercise => (
          <Grid item key={exercise.id} xs={12} md={6} lg={6}>
            <ExerciseCard exercise={exercise}/>
          </Grid>
        ))}
      </Grid>
    </Container>
  </div>
);
}
