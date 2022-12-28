import { Container, Row, Spinner } from 'react-bootstrap';
import AdSimpleCard from '../../features/ads/AdSimpleCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchAds, getAllAds } from '../../../redux/adsRedux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Search = () => {
  const dispatch = useDispatch();
  const { searchPhrase } = useParams();
  const ads = useSelector((state) => getAllAds(state));
  const [currentAds, setCurrentAds] = useState(ads);
  useEffect(() => dispatch(fetchSearchAds(searchPhrase)), [dispatch]);
  useEffect(() => {
    setCurrentAds(ads);
  }, [ads]);
  return (
    <Container>
      <h2>Matching Ads</h2>
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

export default Search;
