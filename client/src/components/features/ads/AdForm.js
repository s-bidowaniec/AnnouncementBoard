import { useSelector } from 'react-redux';
import ReactQuill from 'react-quill';
import DatePicker from 'react-datepicker';
import { getUser } from '../../../redux/usersRedux';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Alert, Button, Form, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import 'react-quill/dist/quill.snow.css';
import 'react-datepicker/dist/react-datepicker.css';
const AdForm = (props) => {
  const user = useSelector((state) => getUser(state));
  const [title, setTitle] = useState(props.adTitle);
  //const [content, setContent] = useState(props.adContent);
  const [date, setDate] = useState(props.adDate);
  const [photo, setPhoto] = useState(props.adPhoto);
  const [price, setPrice] = useState(props.adPrice);
  const [location, setLocation] = useState(props.adLocation);
  const [seller] = useState(user.login);
  const [status, setStatus] = useState(); // null, 'loading', 'success', 'serverError', 'clientError', 'loginError'
  const {
    register,
    watch,
    setValue,
    handleSubmit: validate,
    formState: { errors }
  } = useForm();
  // Watch post content
  useEffect(() => {
    register('content', { required: true, minLength: 20, maxLength: 1000 });
    setValue('content', props.adContent);
  }, [register]);
  const content = watch('content');
  const setContent = (editorState) => {
    setValue('content', editorState);
  };

  // Submit Form
  const handleSubmit = () => {
    props.action(
      {
        title,
        content: content.replace(/(<([^>]+)>)/gi, ''),
        date,
        photo,
        price,
        location,
        seller
      },
      setStatus
    );
    //dispatch(addAdRequest({ title, content, date, photo, price, location, seller }, setStatus));
  };

  // Form
  return (
    /* Allerts */
    <Form className="col-12 col-sm-6 mx-auto" onSubmit={validate(handleSubmit)}>
      <h1 className="my-4">Create new ad</h1>
      {status === 'success' && (
        <Alert variant="success">
          <Alert.Heading>Success!</Alert.Heading>
          <p>Your ad was successfully added. </p>
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
      {/*Form fields*/}
      <Form.Group className="mb-3" controlId="formTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          {...register('title', { required: true, minLength: 10, maxLength: 50 })}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
        />
        {errors.title && (
          <small className="d-block form-text text-danger mt-2">This field is required</small>
        )}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formContent">
        <Form.Label>content</Form.Label>
        <ReactQuill theme="snow" value={content} onChange={setContent} />
        {errors.content && (
          <small className="d-block form-text text-danger mt-2">
            This field is required, must contain 20 - 1000 characters
          </small>
        )}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formDate">
        <Form.Label>date</Form.Label>
        <DatePicker selected={date} onChange={(date) => setDate(date)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formFile">
        <Form.Label>photo</Form.Label>
        <Form.Control type="file" onChange={(e) => setPhoto(e.target.files[0])} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPrice">
        <Form.Label>price</Form.Label>
        <Form.Control
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formLocation">
        <Form.Label>Location</Form.Label>
        <Form.Control
          type="text"
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

AdForm.propTypes = {
  action: PropTypes.func,
  adTitle: PropTypes.string,
  adContent: PropTypes.string,
  adDate: PropTypes.instanceOf(Date),
  adPhoto: PropTypes.string,
  adPrice: PropTypes.string,
  adLocation: PropTypes.string
};
AdForm.defaultProps = {
  adTitle: '',
  adContent: '',
  adDate: new Date(),
  adPhoto: null,
  adPrice: '',
  adLocation: ''
};

export default AdForm;
