import MockAdapter from 'axios-mock-adapter';
import api from '../src/Services/Api';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Login from '../screens/Login';

const mockNavigation = {
    reset: jest.fn(),
  };

describe('Teste tela de login', () => {
    let mock;

    beforeEach(() => {
        mock = new MockAdapter(api);
    });

    afterEach(() => {
        mock.reset();
    });

    it('Renderização de todos os componentes', () => {
        const { getByPlaceholderText, getByText } = render(<Login />);
        expect(getByPlaceholderText('Usuário')).toBeTruthy();
        expect(getByPlaceholderText('Senha')).toBeTruthy();
        expect(getByText('Entrar')).toBeTruthy();
        expect(getByText('Registre-se')).toBeTruthy();
    });

    it('Login com sucesso para administrador', async () => {
        mock.onGet('/users/username/valido').reply(200, {
            username: 'valido',
            password: 'valido123',
            administrator: 'yes'
        });

        const {getByPlaceholderText, getByText} = render(<Login navigation={mockNavigation} />);

        fireEvent.changeText(getByPlaceholderText('Usuário'), 'valido');
        fireEvent.changeText(getByPlaceholderText('Senha'), 'valido123');
        fireEvent.press(getByText('Entrar'));

        await waitFor(() => {
            expect(mockNavigation.reset).toHaveBeenCalledWith({ index: 0, routes: [{ name: 'PagesAdm' }] });
        });
    });

    it('Login com sucesso para usuário comum', async () => {
        mock.onGet('/users/username/valido').reply(200, {
            username: 'valido',
            password: 'valido123',
            administrator: 'no'
        });

        const {getByPlaceholderText, getByText} = render(<Login navigation={mockNavigation} />);

        fireEvent.changeText(getByPlaceholderText('Usuário'), 'valido');
        fireEvent.changeText(getByPlaceholderText('Senha'), 'valido123');
        fireEvent.press(getByText('Entrar'));

        await waitFor(() => {
            expect(mockNavigation.reset).toHaveBeenCalledWith({ index: 0, routes: [{ name: 'Pages' }] });
        });
    });

    it('Login sem sucesso', async () => {
        mock.onGet('/users/username/invalido').reply(404);

        const {getByPlaceholderText, getByText} = render(<Login navigation={mockNavigation} />);

        fireEvent.changeText(getByPlaceholderText('Usuário'), 'invalido');
        fireEvent.changeText(getByPlaceholderText('Senha'), 'invalido123');
        fireEvent.press(getByText('Entrar'));

        await waitFor(() => {
            expect(getByText('Usuário ou senha inválidos!')).toBeTruthy();
        });
    });
});