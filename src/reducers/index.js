import { combineReducers } from 'redux';
import colorReducer from '../reducers/color-reducer';
import scoreReducer from './score-reducer';
import levelReducer from './level-reducer';

const appReducer = combineReducers({
    colors: colorReducer,
    score: scoreReducer,
    level: levelReducer
});

// Combined Reducer
export default appReducer;