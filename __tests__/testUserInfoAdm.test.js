import MockAdapter from 'axios-mock-adapter';
import api from '../src/Services/Api';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import UserInfoAdm from '../screens/Adm/UserInfoAdm';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';

const mockNavigation = {
    pop: jest.fn(),
    reset: jest.fn(),
    navigate: jest.fn(),
  };

describe('Tela de informações do usuário', () => {
    let mock;

    beforeEach(() => {
        mock = new MockAdapter(api);
        jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
        mock.reset();
        console.log.mockRestore();
    });

    it('Seta deve voltar para a tela de usuários', async () => {
        const { getByTestId } = render(
            <NavigationContainer>
              <UserInfoAdm navigation={mockNavigation} />
            </NavigationContainer>
        );

        fireEvent.press(getByTestId('Voltar'));

        await waitFor(() => {
            expect(mockNavigation.pop).toHaveBeenCalled();
        });
    });

    it('Deve exibir as informações do usuário', async () => {
        await AsyncStorage.setItem('infoUser', JSON.stringify({
            course: "Ciência da Computação",
            email: "ana@email.com",
            firstName: "Ana Beatriz",
            lastName: "Pereira",
            phoneNumber: "79123451234",
            registration: 2021004000,
        }));
        
        const { getByText } = render(
            <NavigationContainer>
              <UserInfoAdm navigation={mockNavigation} />
            </NavigationContainer>
        );

        await waitFor(() => {
            expect(getByText('2021004000')).toBeTruthy();
            expect(getByText('Nome: Ana Beatriz Pereira')).toBeTruthy();
            expect(getByText('Email: ana@email.com')).toBeTruthy();
            expect(getByText('Telefone: 79123451234')).toBeTruthy();
            expect(getByText('Curso: Ciência da Computação')).toBeTruthy();
        });
    });

    it('Requerimentos deve levar para a tela de requerimentos do usuário', async () => {
        const { getByText } = render(
            <NavigationContainer>
              <UserInfoAdm navigation={mockNavigation} />
            </NavigationContainer>
        );

        fireEvent.press(getByText('Requerimentos'));

        await waitFor(() => {
            expect(mockNavigation.navigate).toHaveBeenCalledWith('UserRequirementsAdm');
        });
    });

    it('Excluir Usuário deve levar para a tela de usuários', async () => {
        const { getByText } = render(
            <NavigationContainer>
              <UserInfoAdm navigation={mockNavigation} />
            </NavigationContainer>
        );

        fireEvent.press(getByText('Excluir Usuário'));

        await waitFor(() => {
            expect(mockNavigation.pop).toHaveBeenCalled();
        });
    });
});