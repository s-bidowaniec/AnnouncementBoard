import { render } from '@testing-library/react';
import AdRemove from './AdRemove';

describe('Component AdRemove', () => {
  it('should render without crashing', () => {
    render(<AdRemove action={() => {}} />);
  });
});
