import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAllAds } from '../../../redux/adsRedux';
import { Container, Spinner, Row } from 'react-bootstrap';
import AdSimpleCard from '../../features/ads/AdSimpleCard';
const Home = () => {
  const ads = useSelector((state) => getAllAds(state));
  const [currentAds, setCurrentAds] = useState(ads);
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
            return <AdSimpleCard key={ad._id} ad={ad} />;
          })}
      </Row>
    </Container>
  );
};

export default Home;
