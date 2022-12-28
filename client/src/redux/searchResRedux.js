import { API_URL } from '../config';
// selectors
export const getSearchedAds = ({ searchRes }) => searchRes;
// actions
const createActionName = (actionName) => `app/searchRes/${actionName}`;
const UPDATE_SEARCH_RES = createActionName('UPDATE_SEARCH_RES');
//action creators
export const updateSearchRes = (payload) => ({ type: UPDATE_SEARCH_RES, payload });
// thunk actions
export const fetchSearchAds = (search) => {
  return (dispatch) => {
    fetch(`${API_URL}/api/ads/search/${search}`)
      .then((res) => res.json())
      .then((searchRes) => dispatch(updateSearchRes([...searchRes])));
  };
};
//reducer
const searchResReducer = (statePart = null, action) => {
  switch (action.type) {
    case UPDATE_SEARCH_RES:
      return [...action.payload];
    default:
      return statePart;
  }
};
export default searchResReducer;
