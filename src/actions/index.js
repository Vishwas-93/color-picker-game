import {Colors} from '../Colors'
export const FETCH_NEXT_COLOR = "FETCH_NEXT_COLOR";
export const FETCH_INITIAL_COLORS = "FETCH_INITIAL_COLORS";
export const FETCH_NEXT_LEVEL = "FETCH_NEXT_LEVEL";
export const FETCH_SCORE = "FETCH_SCORE";


// Action to get the initial colors on page load
export function getInitialLevelColors(){
    return dispatch =>{
        dispatch({type: FETCH_INITIAL_COLORS, payload: Colors})
    } 
}

// Gets the next color once the user clicks next
export function getNextColor(){
    return dispatch => {
        dispatch({type: FETCH_NEXT_COLOR, payload: Colors})
    }
}


// Goes to Next Level
export function goToNextLevel(){
    return dispatch => {
        dispatch({type: FETCH_NEXT_LEVEL, payload: Colors})
    }
}


// Maintains Game Score
export function incrementGameScore(level){
    return dispatch => {
        dispatch({type: FETCH_SCORE, payload: level})
    }
}