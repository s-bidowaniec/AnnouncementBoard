import { render } from '@testing-library/react';
import Ad from './Ad';

describe('Component Login', () => {
  it('should render without crashing', () => {
    render(<Ad action={() => {}} />);
  });
});
