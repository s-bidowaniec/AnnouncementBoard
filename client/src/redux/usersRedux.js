// selectors
import { API_URL } from '../config';

export const getUser = ({ user }) => user;
// actions
const createActionName = (actionName) => `app/users/${actionName}`;
const LOG_IN = createActionName('LOG_IN');
const LOG_OUT = createActionName('LOG_OUT');

//action creators
export const logIn = (payload) => ({
  type: LOG_IN,
  payload
});
//thunk actions
export const fetchUser = () => {
  return (dispatch) => {
    fetch(`${API_URL}/auth/user`)
      .then((res) => res.json())
      .then((user) => dispatch(logIn(user)));
  };
};
export const logOut = () => ({ type: LOG_OUT });
const usersReducer = (statePart = null, action) => {
  switch (action.type) {
    case LOG_IN:
      return action.payload;
    case LOG_OUT:
      return null;
    default:
      return statePart;
  }
};
export default usersReducer;
