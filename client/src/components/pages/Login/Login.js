import { Alert, Button, Form, Spinner } from 'react-bootstrap';
import { useState } from 'react';
import { API_URL } from '../../../config';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, logIn } from '../../../redux/usersRedux';
const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => getUser(state));
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(null); // null, 'loading', 'success', 'serverError', 'clientError', 'loggedIn'
  const handleSubmit = (e) => {
    e.preventDefault();
    if (user) {
      setStatus('loggedIn');
      return console.log('Already logged in!');
    }
    console.log('submit');
    const options = {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login, password })
    };
    fetch(`${API_URL}/auth/login`, options)
      .then((res) => {
        if (res.status === 200) {
          setStatus('success');
          dispatch(logIn({ login }));
        } else if (res.status === 400) {
          setStatus('clientError');
        } else {
          setStatus('serverError');
        }
      })
      .catch(() => setStatus('serverError'));
  };
  return (
    <Form className="col-12 col-sm-3 mx-auto" onSubmit={handleSubmit}>
      <h1 className="my-4">Sign in</h1>
      {status === 'loggedIn' && (
        <Alert variant="danger">
          <Alert.Heading>Already logged in.</Alert.Heading>
          <p>Log out first.</p>
        </Alert>
      )}
      {status === 'success' && (
        <Alert variant="success">
          <Alert.Heading>Success!</Alert.Heading>
          <p>You have been successfully loggedin! </p>
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
          <Alert.Heading>Incorrect data</Alert.Heading>
          <p>Login or password are incorrect</p>
        </Alert>
      )}
      {status === 'loading' && (
        <Spinner animation="border" role="status" className="d-block mx-auto">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      <Form.Group className="mb-3" controlId="formLogin">
        <Form.Label>Login</Form.Label>
        <Form.Control
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          placeholder="Enter Login"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Sign in
      </Button>
    </Form>
  );
};

export default Login;
