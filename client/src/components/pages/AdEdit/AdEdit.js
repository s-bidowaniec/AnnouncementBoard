import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../../redux/usersRedux';
import { Alert, Button, Form, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { editAdRequest, getAdById } from '../../../redux/adsRedux';

const AdEdit = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = useSelector((state) => getUser(state));
  const ad = useSelector((state) => getAdById(state, id));
  const [title, setTitle] = useState(ad.title);
  const [content, setContent] = useState(ad.content);
  const [date, setDate] = useState(ad.date);
  const [photo, setPhoto] = useState(ad.photo);
  const [price, setPrice] = useState(ad.price);
  const [location, setLocation] = useState(ad.location);
  const [seller] = useState(user.login);
  const [status, setStatus] = useState(ad.status); // null, 'loading', 'success', 'serverError', 'clientError', 'loginError'
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      editAdRequest({ title, content, date, photo, price, location, seller, _id: id }, setStatus)
    );
  };
  return (
    <Form className="col-12 col-sm-3 mx-auto" onSubmit={handleSubmit}>
      <h1 className="my-4">Create new ad</h1>
      {status === 'success' && (
        <Alert variant="success">
          <Alert.Heading>Success!</Alert.Heading>
          <p>You have been successfully registered! You can now log in... </p>
        </Alert>
      )}
      {status === 'serverError' && (
        <Alert variant="danger">
          <Alert.Heading>Something went wrong...</Alert.Heading>
          <p>Unexpected error... Try again!</p>
        </Alert>
      )}
      {status === 'clientError' && (
        <Alert variant="danger">
          <Alert.Heading>Not enough data</Alert.Heading>
          <p>You have to fill all the fields.</p>
        </Alert>
      )}
      {status === 'loginError' && (
        <Alert variant="warning">
          <Alert.Heading>Not authorized</Alert.Heading>
          <p>You have to be logged in.</p>
        </Alert>
      )}
      {status === 'loading' && (
        <Spinner animation="border" role="status" className="d-block mx-auto">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      <Form.Group className="mb-3" controlId="formTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formContent">
        <Form.Label>content</Form.Label>
        <Form.Control
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Ad content"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formDate">
        <Form.Label>date</Form.Label>
        <Form.Control
          type="tel"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="Phone number"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formFile">
        <Form.Label>photo</Form.Label>
        <Form.Control type="file" onChange={(e) => setPhoto(e.target.files[0])} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPrice">
        <Form.Label>price</Form.Label>
        <Form.Control
          type="tel"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formLocation">
        <Form.Label>Location</Form.Label>
        <Form.Control
          type="tel"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default AdEdit;
