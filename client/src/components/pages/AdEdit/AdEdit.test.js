import { render } from '@testing-library/react';
import AdEdit from './AdEdit';

describe('Component AdEdit', () => {
  it('should render without crashing', () => {
    render(<AdEdit action={() => {}} />);
  });
});
