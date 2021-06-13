import React, { useEffect, useState } from 'react';
import Grid from "@material-ui/core/Grid";
import { Container } from "@material-ui/core";

export function ExercisePage() {
  const [exercises, setExercises] = useState([])

  useEffect(() => {
    const exerciseArray = [
      {
        id: 1,
        title: 'gyumik',
        details: 'asd asd asd nyam',
        category: 'akasztofa'
      },
      {
        id: 2,
        title: 'allatok',
        details: 'asd asd asd vau',
        category: 'kepes'
      },
      {
        id: 3,
        title: 'Meszaros lolo $$',
        details: 'asd asd asd $$$',
        category: 'akasztofa'
      },
      {
        id: 4,
        title: 'alvas',
        details: 'asd asd asd',
        category: 'kepes'
      }
    ]
    setExercises(exerciseArray)
  })

  return (
    <Container>
      <Grid container>
        {exercises.map(exercise => (
          <Grid item key={exercise.id} xs={12} md={6} lg={4}>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
