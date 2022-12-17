import { render } from '@testing-library/react';
import Header from './Header';

describe('Component Header', () => {
  it('should render without crashing', () => {
    render(<Header action={() => {}} />);
  });
});
