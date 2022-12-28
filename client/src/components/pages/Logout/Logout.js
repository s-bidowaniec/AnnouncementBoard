import { logOutRequest } from '../../../redux/usersRedux';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Alert, Button, Spinner } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
const Logout = () => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState('');
  useEffect(() => {
    dispatch(logOutRequest(setStatus));
  }, [dispatch]);
  return (
    <div>
      {status === 'success' && (
        <Alert variant="success">
          <Alert.Heading>Success!</Alert.Heading>
          <p>You was successfully logged out! You can return to the homepage</p>
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
          <p>You have to be logged in to log out.</p>
        </Alert>
      )}
      {status === 'loading' && (
        <Spinner animation="border" role="status" className="d-block mx-auto">
          <span className="visually-hidden">Logging out...</span>
        </Spinner>
      )}
    </div>
  );
};

export default Logout;
