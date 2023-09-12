// userReducer.js
const initialState = {
    name: '',
    age: '',
    timeslot: null,
    bot:false,
    complete:false,
  };
  
  const SET_NAME = 'user/SET_NAME';
  const SET_AGE = 'user/SET_AGE';
  const SET_TIMESLOT = 'user/SET_TIMESLOT';
  const SET_BOT = 'user/SET_BOT';
  const SET_COMPLETE = 'user/SET_COMPLETE'
  
  export const setName = (name) => ({
    type: SET_NAME,
    payload: name,
  });
  
  export const setAge = (age) => ({
    type: SET_AGE,
    payload: age,
  });
  
  export const setTimeslot = (timeslot) => ({
    type: SET_TIMESLOT,
    payload: timeslot,
  });

  export const setBot = (bot) =>({
    type: SET_BOT,
    payload:bot,
  })
  export const setComplete = (complete) =>({
    type: SET_COMPLETE,
    payload:complete,
  })
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_NAME:
        return { ...state, name: action.payload };
      case SET_AGE:
        return { ...state, age: action.payload };
      case SET_TIMESLOT:
        return { ...state, timeslot: action.payload };
      case SET_BOT:
        return {...state, bot:action.payload};
      case SET_COMPLETE:
        return{...state , complete:action.payload};
      default:
        return state;
    }
  };
  
  export default userReducer;
  