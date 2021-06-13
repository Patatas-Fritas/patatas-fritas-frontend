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
        setExercises(data)
      } catch(error) {
          console.log(error)
      }
    }
    fetchData()
    // const exerciseArray = [
    //   {
    //     id: 1,
    //     title: 'gyumik',
    //     details: 'asd asd asd nyam',
    //     category: 'akasztofa'
    //   },
    //   {
    //     id: 2,
    //     title: 'allatok',
    //     details: 'asd asd asd vau',
    //     category: 'kepes'
    //   },
    //   {
    //     id: 3,
    //     title: 'Meszaros lolo $$',
    //     details: 'asd asd asd $$$',
    //     category: 'akasztofa'
    //   },
    //   {
    //     id: 4,
    //     title: 'alvas',
    //     details: 'asd asd asd',
    //     category: 'kepes'
    //   }
    // ]
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
