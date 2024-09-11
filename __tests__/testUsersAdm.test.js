import MockAdapter from 'axios-mock-adapter';
import api from '../src/Services/Api';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import UsersAdm from '../screens/Adm/UsersAdm';
import { NavigationContainer } from '@react-navigation/native';

const mockNavigation = {
    pop: jest.fn(),
    reset: jest.fn(),
    navigate: jest.fn(),
  };

describe('Tela de usuários para o administrador', () => {
    let mock;

    beforeEach(() => {
        mock = new MockAdapter(api);
        jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
        mock.reset();
        console.log.mockRestore();
    });

    it('Deve renderizar dois usuários', async () => {
        mock.onGet('/users').reply(200, [
            { registration: 2021001002 },
            { registration: 2024002003 }
        ]);

        const { getByText } = render(
            <NavigationContainer>
              <UsersAdm navigation={mockNavigation} />
            </NavigationContainer>
        );

        await waitFor(() => {
            expect(getByText('Matrícula: 2021001002')).toBeTruthy();
            expect(getByText('Matrícula: 2024002003')).toBeTruthy();
        });
    });

    it('Deve filtrar para um usuário', async () => {
        mock.onGet('/users/search/2021001002').reply(200, [
            { registration: 2021001002 }
        ]);

        const { getByText, getByPlaceholderText } = render(
            <NavigationContainer>
              <UsersAdm navigation={mockNavigation} />
            </NavigationContainer>
        );

        fireEvent.changeText(getByPlaceholderText('  Digite um nome ou matrícula'), '2021001002');

        await waitFor(() => {
            expect(getByText('Matrícula: 2021001002')).toBeTruthy();
        });
    });

    it('Clicar no usuário deve abrir a tela de informações do usuário', async () => {
        mock.onGet('/users').reply(200, [
            { registration: 2021004000 }
        ]);

        mock.onGet('/users/2021004000').reply(200,{
            registration: 2021004000,
        });

        const { getByText } = render(
            <NavigationContainer>
              <UsersAdm navigation={mockNavigation} />
            </NavigationContainer>
        );

        await waitFor(() => {
            fireEvent.press(getByText('Matrícula: 2021004000'));
            expect(mockNavigation.navigate).toHaveBeenCalledWith('UserInfoAdm');
        });
    });
});