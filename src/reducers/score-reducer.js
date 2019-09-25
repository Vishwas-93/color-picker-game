import { FETCH_SCORE } from "../actions/index";

// Reducer to return the Score glabally
export default function(state = { score: 0 }, action) {
  switch (action.type) {
    case FETCH_SCORE:
      let level = action.payload;
      let new_score = state.score + level * 10;
      console.log(new_score);
      return Object.assign({}, state, { score: new_score });
    default:
      return state;
  }
}
