import { NavLink, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAdById } from '../../../redux/adsRedux';
import { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { IMGS_URL } from '../../../config';
const Ad = () => {
  const { id } = useParams();
  const ad = useSelector((state) => getAdById(state, id));
  const [currentAd, setCurrentAd] = useState(ad);
  useEffect(() => {
    setCurrentAd(ad);
  }, [ad]);
  return (
    <Card>
      <Card.Img variant="top" src={IMGS_URL + currentAd.photo} alt="photo" />
      <Card.Body>
        <Card.Title>{currentAd.title}</Card.Title>
        <Card.Text>{currentAd.content}</Card.Text>
        <Button variant="primary" as={NavLink} to={'/ad/edit/' + id}>
          Edit
        </Button>
        <Button variant="primary" as={NavLink} to={'/ad/remove/' + id}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Ad;
