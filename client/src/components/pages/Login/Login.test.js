import { render } from '@testing-library/react';
import Login from './Login';

describe('Component Login', () => {
  it('should render without crashing', () => {
    render(<Login action={() => {}} />);
  });
});
