import { API_URL } from '../config';
// selectors
export const getAllAds = ({ ads }) => ads;
// actions
const createActionName = (actionName) => `app/ads/${actionName}`;
const UPDATE_ADS = createActionName('UPDATE_ADS');
//action creators
export const updateAds = (payload) => ({ type: UPDATE_ADS, payload });
// thunk actions
export const fetchAds = () => {
  return (dispatch) => {
    fetch(`${API_URL}/api/ads`)
      .then((res) => res.json())
      .then((tables) => dispatch(updateAds([...tables])));
  };
};
//reducer
const adsReducer = (statePart = null, action) => {
  switch (action.type) {
    case UPDATE_ADS:
      return [...action.payload];
    default:
      return statePart;
  }
};
export default adsReducer;
