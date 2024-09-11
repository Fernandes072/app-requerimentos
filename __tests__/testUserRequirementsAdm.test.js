import MockAdapter from 'axios-mock-adapter';
import api from '../src/Services/Api';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import UserRequirementsAdm from '../screens/Adm/UserRequirementsAdm';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';

const mockNavigation = {
    pop: jest.fn(),
    reset: jest.fn(),
    navigate: jest.fn(),
  };

describe('Tela de requerimentos do usuário', () => {
    let mock;

    beforeEach(() => {
        mock = new MockAdapter(api);
        jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
        mock.reset();
        console.log.mockRestore();
    });

    it('Seta deve voltar para a tela de informações do usuário', async () => {
        const { getByTestId } = render(
            <NavigationContainer>
              <UserRequirementsAdm navigation={mockNavigation} />
            </NavigationContainer>
        );

        fireEvent.press(getByTestId('Voltar'));

        await waitFor(() => {
            expect(mockNavigation.pop).toHaveBeenCalled();
        });
    });

    it('Deve renderizar dois requerimentos', async () => {
        await AsyncStorage.setItem('infoUser', JSON.stringify({registration: 2021004000}));

        mock.onGet('/users/2021004000/requirements').reply(200, [
            {
              requirementId: 1,
              registration: {
                registration: 2021004000,
              },
              sendDate: "12/12/2012 12:12:12",
              type: "Justificativa de Falta",
            },
            {
              requirementId: 2,
              registration: {
                registration: 2021004000,
              },
              sendDate: "13/12/2012 13:13:13",
              type: "Solicitação de Documentos",
            }
        ]);

        const { getByText } = render(
            <NavigationContainer>
              <UserRequirementsAdm navigation={mockNavigation} />
            </NavigationContainer>
        );

        await waitFor(() => {
            expect(getByText('N° 1')).toBeTruthy();
            expect(getByText('N° 2')).toBeTruthy();
        });
    });

    it('Clicar no requerimento deve abrir a tela de informações do requerimento', async () => {
        await AsyncStorage.setItem('infoUser', JSON.stringify({registration: 2021004000}));

        mock.onGet('/users/2021004000/requirements').reply(200, [
            {
              requirementId: 1,
              registration: {
                registration: 2021004000,
              },
              sendDate: "12/12/2012 12:12:12",
              type: "Justificativa de Falta",
            }
        ]);

        mock.onGet('/requirements/1').reply(200,{
            requirementId: 1,
            registration: {
                registration: 2021004000,
            },
            sendDate: "12/12/2012 12:12:12",
            type: "Justificativa de Falta",
        });

        const { getByText } = render(
            <NavigationContainer>
              <UserRequirementsAdm navigation={mockNavigation} />
            </NavigationContainer>
        );

        await waitFor(() => {
            fireEvent.press(getByText('N° 1'));
            expect(mockNavigation.navigate).toHaveBeenCalledWith('RequirementInfoAdm');
        });
    });
});