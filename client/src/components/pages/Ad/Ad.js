import { NavLink, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAdById } from '../../../redux/adsRedux';
import { useState, useEffect } from 'react';
import { Card, Button, Row, Col, ListGroup } from 'react-bootstrap';
import { IMGS_URL } from '../../../config';
import { getUser } from '../../../redux/usersRedux';
const Ad = () => {
  const { id } = useParams();
  const user = useSelector((state) => getUser(state));
  const ad = useSelector((state) => getAdById(state, id));
  console.log(ad);
  const [currentAd, setCurrentAd] = useState(ad);
  const owner = user && user.login === ad.seller;
  console.log(owner);
  useEffect(() => {
    setCurrentAd(ad);
  }, [ad]);
  return (
    <Row>
      <Col xs="6" lg="6">
        <Card>
          <Card.Header>Selected ad:</Card.Header>
          <Card.Img variant="top" src={IMGS_URL + currentAd.photo} alt="photo" />
          <Card.Body>
            <Card.Title>{currentAd.title}</Card.Title>
            <Card.Text>{currentAd.content}</Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>Price: {ad.price}</ListGroup.Item>
            <ListGroup.Item>Location: {ad.location}</ListGroup.Item>
            <ListGroup.Item>Seller: {ad.seller}</ListGroup.Item>
            <ListGroup.Item>Date: {ad.date}</ListGroup.Item>
          </ListGroup>
          {owner && (
            <Card.Body>
              <Button variant="primary" as={NavLink} to={'/ad/edit/' + id} className="mx-1">
                Edit
              </Button>
              <Button variant="danger" as={NavLink} to={'/ad/remove/' + id} className="mx-1">
                Delete
              </Button>
            </Card.Body>
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default Ad;
