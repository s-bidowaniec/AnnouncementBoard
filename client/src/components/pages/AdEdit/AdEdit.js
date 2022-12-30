import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { editAdRequest, getAdById } from '../../../redux/adsRedux';
import AdForm from '../../features/ads/AdForm';

const AdEdit = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const ad = useSelector((state) => getAdById(state, id));
  const [title] = useState(ad.title);
  const [content] = useState(ad.content);
  const [date] = useState(ad.date);
  const [photo] = useState(ad.photo);
  const [price] = useState(ad.price);
  const [location] = useState(ad.location);

  const editCurrentAd = (currentAd, setStatus) => {
    dispatch(editAdRequest({ ...currentAd, id }, setStatus));
  };
  return (
    <AdForm
      action={editCurrentAd}
      adTitle={title}
      adContent={content}
      adDate={date}
      adPhoto={photo}
      adLocation={location}
      adPrice={price}
    />
  );
};

export default AdEdit;
