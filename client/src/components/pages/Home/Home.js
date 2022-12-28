import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAds, getAllAds } from '../../../redux/adsRedux';
import { Container, Spinner, Row } from 'react-bootstrap';
import AdSimpleCard from '../../features/ads/AdSimpleCard';
const Home = () => {
  const dispatch = useDispatch();
  const ads = useSelector((state) => getAllAds(state));
  const [currentAds, setCurrentAds] = useState(ads);
  useEffect(() => dispatch(fetchAds()), [dispatch]);
  useEffect(() => {
    setCurrentAds(ads);
  }, [ads]);

  return (
    <Container>
      <h2>All Ads</h2>
      {currentAds.length === 0 && (
        <Spinner animation="border" role="status" className="d-block mx-auto">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      <Row>
        {currentAds.length > 0 &&
          currentAds.map((ad) => {
            return <AdSimpleCard key={ad.id} ad={ad} />;
          })}
      </Row>
    </Container>
  );
};

export default Home;
