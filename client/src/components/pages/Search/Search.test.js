import { render } from '@testing-library/react';
import Search from './Search';

describe('Component Search', () => {
  it('should render without crashing', () => {
    render(<Search action={() => {}} />);
  });
});
