import PropTypes from 'prop-types';
import { Col, Card, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { IMGS_URL } from '../../../config';
const AdSimpleCard = (props) => {
  const { title, content, photo, _id } = props.ad;
  return (
    <Col xs={12} md={6} lg={4}>
      <Card>
        <Card.Img variant="top" src={IMGS_URL + photo} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{content.slice(25)}...</Card.Text>
          <Button variant="primary" as={NavLink} to={'/ad/' + _id}>
            Read more
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

AdSimpleCard.propTypes = {
  ad: PropTypes.object
};
export default AdSimpleCard;
