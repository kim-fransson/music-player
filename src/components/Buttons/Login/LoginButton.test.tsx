import { fireEvent, render, screen } from '@testing-library/react';
import LoginButton from './LoginButton';

describe('LoginButton', () => {
    it('should trigger onClick', () => {
        const mockHandleClick = jest.fn();
        render(<LoginButton onClick={mockHandleClick} />);

        fireEvent.click(screen.getByText(/log in with spotify/i));

        expect(mockHandleClick).toBeCalledTimes(1);
    });
});
