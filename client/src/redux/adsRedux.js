import { API_URL } from '../config';
// selectors
export const getAllAds = ({ ads }) => ads;
export const getAdById = ({ ads }, id) => ads.find((ad) => ad._id === id);
// actions
const createActionName = (actionName) => `app/ads/${actionName}`;
const UPDATE_ADS = createActionName('UPDATE_ADS');
const ADD_AD = createActionName('ADD_AD');
const EDIT_AD = createActionName('EDIT_AD');
const DELETE_AD = createActionName('DELETE_AD');
//action creators
export const updateAds = (payload) => ({ type: UPDATE_ADS, payload });
export const addAd = (payload) => ({ type: ADD_AD, payload });
export const editAd = (payload) => ({ type: EDIT_AD, payload });
export const deleteAd = (payload) => ({ type: DELETE_AD, payload });
// thunk actions
export const fetchAds = () => {
  return (dispatch) => {
    fetch(`${API_URL}/api/ads`)
      .then((res) => res.json())
      .then((ads) => dispatch(updateAds([...ads])));
  };
};
export const addAdRequest = (ad, setStatus) => {
  return (dispatch) => {
    const fd = new FormData();
    fd.append('title', ad.title);
    fd.append('content', ad.content);
    fd.append('date', ad.date);
    fd.append('photo', ad.photo);
    fd.append('price', ad.price);
    fd.append('location', ad.location);
    fd.append('seller', ad.seller);
    const options = {
      method: 'POST',
      credentials: 'include',
      body: fd
    };
    setStatus('loading');
    fetch(`${API_URL}/api/ads`, options)
      .then((res) => {
        if (res.status === 200) {
          setStatus('success');
          res
            .json()
            .then((data) =>
              dispatch(addAd({ ...ad, photo: data.photo, _id: data.id, date: ad.date.toString() }))
            );
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
export const editAdRequest = (ad, setStatus) => {
  return (dispatch) => {
    const fd = new FormData();
    fd.append('title', ad.title);
    fd.append('content', ad.content);
    fd.append('date', ad.date);
    fd.append('photo', ad.photo);
    fd.append('price', ad.price);
    fd.append('location', ad.location);
    fd.append('seller', ad.seller);
    const options = {
      method: 'PUT',
      credentials: 'include',
      body: fd
    };
    setStatus('loading');
    fetch(`${API_URL}/api/ads/${ad._id}`, options)
      .then((res) => {
        if (res.status === 200) {
          setStatus('success');
          res
            .json()
            .then((data) =>
              dispatch(addAd({ ...ad, photo: data.photo, date: ad.date.toString() }))
            );
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
export const deleteAdRequest = (ad, setStatus) => {
  return (dispatch) => {
    const options = {
      method: 'DELETE',
      credentials: 'include'
    };
    setStatus('loading');
    fetch(`${API_URL}/api/ads/${ad._id}`, options)
      .then((res) => {
        if (res.status === 200) {
          setStatus('success');
          dispatch(deleteAd(ad));
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
//reducer
const adsReducer = (statePart = null, action) => {
  switch (action.type) {
    case UPDATE_ADS:
      return [...action.payload];
    case ADD_AD:
      console.log(action.payload.id);
      return [...statePart, action.payload];
    case EDIT_AD:
      return statePart.map((ad) => {
        return ad._id === action.payload._id ? { ...action.payload } : ad;
      });
    case DELETE_AD:
      return statePart.filter((ad) => ad._id !== action.payload._id);
    default:
      return statePart;
  }
};
export default adsReducer;
