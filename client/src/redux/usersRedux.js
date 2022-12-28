import { API_URL } from '../config';
// selectors
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
  const options = {
    method: 'GET',
    credentials: 'include'
  };
  return (dispatch) => {
    fetch(`${API_URL}/auth/user`, options)
      .then((res) => res.json())
      .then((res) => {
        if (res.status === '200') dispatch(logIn(res));
        else console.log('Not Logged');
      });
  };
};
export const logOutRequest = (setStatus) => {
  return (dispatch) => {
    const options = {
      method: 'GET',
      credentials: 'include'
    };
    setStatus('loading');
    fetch(`${API_URL}/auth/logout`, options)
      .then((res) => {
        if (res.status === 200) {
          setStatus('success');
          dispatch(logOut());
        } else if (res.status === 400) {
          setStatus('clientError');
        } else if (res.status === 409) {
          setStatus('loginError');
        } else {
          setStatus('serverError');
        }
      })
      .catch(() => setStatus('serverError'));
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
