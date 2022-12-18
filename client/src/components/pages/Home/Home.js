import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAllAds } from '../../../redux/adsRedux';
import { Container, Spinner } from 'react-bootstrap';
const Home = () => {
  const ads = useSelector((state) => getAllAds(state));
  const [currentAds, setCurrentAds] = useState(ads);
  useEffect(() => {
    setCurrentAds(ads);
  }, [ads]);

  return (
    <Container>
      <h2>All Tables</h2>
      {currentAds.length === 0 && (
        <Spinner animation="border" role="status" className="d-block mx-auto">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {currentAds.length > 0 &&
        currentAds.map((ad) => {
          return <p key={ad.id}>ad.title</p>;
        })}
    </Container>
  );
};

export default Home;
