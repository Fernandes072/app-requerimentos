import MockAdapter from 'axios-mock-adapter';
import api from '../src/Services/Api';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Profile from '../screens/Profile';

const mockNavigation = {
    navigate: jest.fn(),
    reset: jest.fn(),
  };

describe('Tela de login', () => {
    let mock;

    beforeEach(() => {
        mock = new MockAdapter(api);
        jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
        mock.reset();
        console.log.mockRestore();
    });

    it('Sair deve voltar para a tela de login', async () => {
        const { getByTestId } = render(<Profile navigation={mockNavigation} />);

        fireEvent.press(getByTestId('Sair'));

        await waitFor(() => {
            expect(mockNavigation.reset).toHaveBeenCalledWith({ index: 0, routes: [{ name: 'Login' }] });
        });
    });

    it('Meus requerimentos deve ir para a tela de meus requerimentos', async () => {
        const { getByText } = render(<Profile navigation={mockNavigation} />);

        fireEvent.press(getByText('Meus requerimentos'));

        await waitFor(() => {
            expect(mockNavigation.navigate).toHaveBeenCalledWith('MyRequirements');
        });
    });
});