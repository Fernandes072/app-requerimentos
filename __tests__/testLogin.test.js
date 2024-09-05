import MockAdapter from 'axios-mock-adapter';
import api from '../src/Services/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Login from '../screens/Login';

const mockNavigation = {
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

    it('Renderização de todos os componentes', () => {
        const { getByPlaceholderText, getByText } = render(<Login navigation={mockNavigation} />);
        expect(getByPlaceholderText('Usuário')).toBeTruthy();
        expect(getByPlaceholderText('Senha')).toBeTruthy();
        expect(getByText('Entrar')).toBeTruthy();
        expect(getByText('Registre-se')).toBeTruthy();
    });

    it('Campos válidos e tipo administrador deve ir para o modo administrador', async () => {
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

    it('Campos válidos e tipo usuário deve ir para o modo usuário', async () => {
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

    it('Usuário e senha incorretos deve exibir usuário e senha incorretos', async () => {
        mock.onGet('/users/username/invalido').reply(404);

        const {getByPlaceholderText, getByText} = render(<Login navigation={mockNavigation} />);

        fireEvent.changeText(getByPlaceholderText('Usuário'), 'invalido');
        fireEvent.changeText(getByPlaceholderText('Senha'), 'invalido123');
        fireEvent.press(getByText('Entrar'));

        await waitFor(() => {
            expect(getByText('Usuário ou senha inválidos!')).toBeTruthy();
        });
    });

    it('Senha incorreta deve exibir usuário e senha incorretos', async () => {
        mock.onGet('/users/username/valido').reply(200, {
            username: 'valido',
            password: 'valido123',
            administrator: 'no'
        });

        const {getByPlaceholderText, getByText} = render(<Login navigation={mockNavigation} />);

        fireEvent.changeText(getByPlaceholderText('Usuário'), 'valido');
        fireEvent.changeText(getByPlaceholderText('Senha'), '123');
        fireEvent.press(getByText('Entrar'));

        await waitFor(() => {
            expect(getByText('Usuário ou senha inválidos!')).toBeTruthy();
        });
    });

    it('Campos vazios deve exibir usuário e senha incorretos', async () => {
        mock.onGet('/users/username/').reply(404);

        const {getByPlaceholderText, getByText} = render(<Login navigation={mockNavigation} />);

        fireEvent.changeText(getByPlaceholderText('Usuário'), '');
        fireEvent.changeText(getByPlaceholderText('Senha'), '');
        fireEvent.press(getByText('Entrar'));

        await waitFor(() => {
            expect(getByText('Usuário ou senha inválidos!')).toBeTruthy();
        });
    });

    it('Usuário armazenado deve fazer login automático', async () => {
        AsyncStorage.getItem = jest.fn(() => Promise.resolve(JSON.stringify({ username: 'userTest', administrator: 'no' })));
        render(<Login navigation={mockNavigation}/>);
  
        await waitFor(() => {
            expect(mockNavigation.reset).toHaveBeenCalledWith({ index: 0, routes: [{ name: 'Pages' }] });
        });
    });

    it('Registre-se deve levar para a tela CriarConta', async () => {
        const {getByText} = render(<Login navigation={mockNavigation} />);

        fireEvent.press(getByText('Registre-se'));

        await waitFor(() => {
            expect(mockNavigation.reset).toHaveBeenCalledWith({ index: 1, routes: [{ name: 'Login' }, { name: 'CreateAccount' }] });
        });
    });
});