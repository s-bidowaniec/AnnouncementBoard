import { Alert, Button, Spinner } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteAdRequest } from '../../../redux/adsRedux';
import { NavLink, useParams } from 'react-router-dom';

const AdRemove = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [status, setStatus] = useState('');
  useEffect(() => {
    dispatch(deleteAdRequest({ _id: id }, setStatus));
  }, [dispatch]);
  return (
    <div>
      {status === 'success' && (
        <Alert variant="success">
          <Alert.Heading>Success!</Alert.Heading>
          <p>Ad was successfully deleted, you can go back to home page </p>
          <Button as={NavLink} to="/">
            Ok
          </Button>
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
          <Alert.Heading>Client error</Alert.Heading>
          <p>Unvalid request</p>
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
    </div>
  );
};

export default AdRemove;
