import { Container, Row, Spinner } from 'react-bootstrap';
import AdSimpleCard from '../../features/ads/AdSimpleCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchAds } from '../../../redux/searchResRedux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSearchedAds } from '../../../redux/searchResRedux';

const Search = () => {
  const dispatch = useDispatch();
  const { searchPhrase } = useParams();
  const searchResults = useSelector((state) => getSearchedAds(state));
  const [currentAds, setCurrentAds] = useState(searchResults);
  useEffect(() => dispatch(fetchSearchAds(searchPhrase)), [dispatch]);
  useEffect(() => {
    setCurrentAds(searchResults);
  }, [searchResults]);
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
            return <AdSimpleCard key={ad._id} ad={ad} />;
          })}
      </Row>
    </Container>
  );
};

export default Search;
