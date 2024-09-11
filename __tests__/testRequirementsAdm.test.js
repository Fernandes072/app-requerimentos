import MockAdapter from 'axios-mock-adapter';
import api from '../src/Services/Api';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import RequirementsAdm from '../screens/Adm/RequirementsAdm';
import { NavigationContainer } from '@react-navigation/native';

const mockNavigation = {
    pop: jest.fn(),
    reset: jest.fn(),
    navigate: jest.fn(),
  };

describe('Tela de requerimentos para o administrador', () => {
    let mock;

    beforeEach(() => {
        mock = new MockAdapter(api);
        jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
        mock.reset();
        console.log.mockRestore();
    });

    it('Deve renderizar dois requerimentos', async () => {
        mock.onGet('/requirements').reply(200, [
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
              <RequirementsAdm navigation={mockNavigation} />
            </NavigationContainer>
        );

        await waitFor(() => {
            expect(getByText('N° 1')).toBeTruthy();
            expect(getByText('N° 2')).toBeTruthy();
        });
    });

    it('Deve filtrar para dois requerimentos', async () => {
        mock.onGet('/requirements/search/2021001002').reply(200, [
            {
              requirementId: 2,
              registration: {
                registration: 2021001002,
              },
              sendDate: "13/12/2012 13:13:13",
              type: "Solicitação de Documentos",
            },
            {
                requirementId: 3,
                registration: {
                  registration: 2021001002,
                },
                sendDate: "14/12/2012 14:14:14",
                type: "Cancelamento de Matrícula",
            }
        ]);

        const { getByText, getByPlaceholderText } = render(
            <NavigationContainer>
              <RequirementsAdm navigation={mockNavigation} />
            </NavigationContainer>
        );

        fireEvent.changeText(getByPlaceholderText('  Matrícula / Número do requerimento'), '2021001002');

        await waitFor(() => {
            expect(getByText('N° 2')).toBeTruthy();
            expect(getByText('N° 3')).toBeTruthy();
        });
    });

    it('Clicar no requerimento deve abrir a tela de informações do requerimento', async () => {
        mock.onGet('/requirements').reply(200, [
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
              <RequirementsAdm navigation={mockNavigation} />
            </NavigationContainer>
        );

        await waitFor(() => {
            fireEvent.press(getByText('N° 1'));
            expect(mockNavigation.navigate).toHaveBeenCalledWith('RequirementInfoAdm');
        });
    });
});