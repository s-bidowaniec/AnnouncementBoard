import { render } from '@testing-library/react';
import NotFound from './NotFound';

describe('Component NotFound', () => {
  it('should render without crashing', () => {
    render(<NotFound action={() => {}} />);
  });
});
