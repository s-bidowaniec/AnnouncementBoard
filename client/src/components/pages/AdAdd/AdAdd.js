import { useDispatch } from 'react-redux';
import { addAdRequest } from '../../../redux/adsRedux';
import AdForm from '../../features/ads/AdForm';
const AdAdd = () => {
  const dispatch = useDispatch();

  const addNewAd = (newAd, setStatus) => {
    dispatch(addAdRequest({ ...newAd }, setStatus));
  };
  return <AdForm action={addNewAd}></AdForm>;
};

export default AdAdd;
