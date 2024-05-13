import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { coursesReducers } from './reducers/coursesReducer';
import { taReducers } from './reducers/taReducers';
import { bookingsReducer } from './reducers/bookingsReducer';
import userReducer from './reducers/userReducer';

import { currentAssignmentReducers } from './reducers/currentAssignment';

import assignmentReducer from './reducers/assignmentReducer';
import logger from 'redux-logger';
import { taSlotsReducer } from './reducers/taSlotsReducer';

//A store holds the whole state tree of your application. The only way to change the state inside it is to dispatch an action on it.
const reducer = combineReducers({
  courses: coursesReducers,
  ta: taReducers,
  assignment: assignmentReducer,
  user: userReducer,
  taSlots: taSlotsReducer,
  currentAssignmentReducer: currentAssignmentReducers,
  bookings: bookingsReducer
});

//Thunk middleware for Redux. It allows writing functions with logic inside that can interact with a Redux store's dispatch and getState methods.
const middleware = [thunk, logger];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export type RootState = ReturnType<typeof reducer>;

export default store;
