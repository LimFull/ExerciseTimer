import {createStore} from 'redux';
import {createAction} from 'redux-actions';

const initialSettings = {
  firstTime: 90000,
  secondTime: 180000,
  thirdTime: 300000,
};

const SET_TIMES = 'SET_TIMES';

export const setTimes = createAction(SET_TIMES);

function settings(state = initialSettings, action) {
  switch (action.type) {
    case SET_TIMES:
      const payload = action.payload;
      const newState = {...state, ...payload};
      return newState;
    default:
      return state;
  }
}

const store = createStore(settings);

export default store;
