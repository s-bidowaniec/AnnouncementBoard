import { render } from '@testing-library/react';
import AdAdd from './AdAdd';

describe('Component AdAdd', () => {
  it('should render without crashing', () => {
    render(<AdAdd action={() => {}} />);
  });
});
