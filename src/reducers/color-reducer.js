import { FETCH_NEXT_COLOR, FETCH_INITIAL_COLORS } from "../actions/index";

// Reducer to maintain the Colors for the color box and buttons
export default function(state = [], action) {
  switch (action.type) {
    case FETCH_NEXT_COLOR:
      let colors = action.payload;
      let lengthOfColors = state.length;
      if (lengthOfColors === colors.length) {
        return state;
      } else {
        let new_state = [colors[lengthOfColors], ...state];
        return new_state;
      }

    case FETCH_INITIAL_COLORS:
      let initial_colors = action.payload;
      let initial_state = initial_colors.slice(0, 4);
      return initial_state;

    default:
      return state;
  }
}
