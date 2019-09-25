import {  FETCH_NEXT_LEVEL} from "../actions/index";

// Reducer to maintain the Level
export default function(state = { level: 1 }, action) {
  switch (action.type) {
    case FETCH_NEXT_LEVEL:
      let colors = action.payload;
      let lengthOfColors = state.length;
      if (state.level + 4 === colors.length) {
        return state;
      } else {
        let next_level = state.level + 1;
        return Object.assign({}, state, { level: next_level });
      }

    default:
      return state;
  }
}
