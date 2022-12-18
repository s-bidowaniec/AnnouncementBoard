import { API_URL } from '../../../config';
import { logOut } from '../../../redux/usersRedux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
const Logout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const options = { method: 'DELETE' };
    fetch(`${API_URL}/auth/logout`, options).then(() => {
      dispatch(logOut());
    });
    return (
      <div>
        <h1>Logout</h1>
      </div>
    );
  }, [dispatch]);
};

export default Logout;
