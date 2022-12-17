import { render } from '@testing-library/react';
import Register from './Register';

describe('Component Register', () => {
  it('should render without crashing', () => {
    render(<Register action={() => {}} />);
  });
});
