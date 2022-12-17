import { render } from '@testing-library/react';
import Logout from './Logout';

describe('Component Logout', () => {
  it('should render without crashing', () => {
    render(<Logout action={() => {}} />);
  });
});
