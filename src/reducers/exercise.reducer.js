import { exerciseConstant } from "../constants";

const initialState = {
    exerciseId: null
}

export const exerciseReducer = (state = initialState, action) => {
    switch (action.type) {
        case exerciseConstant.SET_CURRENT_EXERCISE_ID:
            return {...state,
                exerciseId: action.payload.id
            }
    }

    return state
}
