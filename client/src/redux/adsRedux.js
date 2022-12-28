import { API_URL } from '../config';
// selectors
export const getAllAds = ({ ads }) => ads;
export const getAdById = ({ ads }, id) => ads.find((ad) => ad._id === id);
// actions
const createActionName = (actionName) => `app/ads/${actionName}`;
const UPDATE_ADS = createActionName('UPDATE_ADS');
//action creators
export const updateAds = (payload) => ({ type: UPDATE_ADS, payload });
// thunk actions
export const fetchAds = () => {
  console.log(API_URL);
  return (dispatch) => {
    fetch(`${API_URL}/api/ads`)
      .then((res) => res.json())
      .then((ads) => dispatch(updateAds([...ads])));
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
