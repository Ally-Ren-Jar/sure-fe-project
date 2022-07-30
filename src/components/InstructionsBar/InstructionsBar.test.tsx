import InstructionsBar from './InstructionsBar';
import { renderWithProviders } from '../../utils/test';
import { fireEvent, render } from '@testing-library/react';

describe('InstructionsBar', () => {
  const defaultProps = {
    onClick: jest.fn(),
  };
  const buttonText = 'View challenges';

  it('should render a "View challenges" button', () => {
    const { getByText } = renderWithProviders(<InstructionsBar {...defaultProps} />);
    expect(getByText(buttonText)).toBeInTheDocument();
  });

  // TODO: Challenge 3
  it('should call the onClick prop when the button is clicked', () => {
    const { onClick } = defaultProps;
    const { getByText } = render(<InstructionsBar onClick={onClick} />);
    fireEvent.click(getByText(buttonText));
    expect(onClick).toHaveBeenCalled();
  });
});
