import {exerciseConstant, hangmanConstant} from "../constants";

export const exerciseAction = {
  setCurrentExerciseId,
}

function setCurrentExerciseId (id) {
  return dispatch => {
    dispatch({type: exerciseConstant.SET_CURRENT_EXERCISE_ID, payload: {id}})
  }
}
