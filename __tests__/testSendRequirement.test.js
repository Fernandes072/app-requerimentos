import MockAdapter from 'axios-mock-adapter';
import api from '../src/Services/Api';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SendRequirement from '../screens/User/SendRequirement';
import { NavigationContainer } from '@react-navigation/native';

const mockNavigation = {
    pop: jest.fn(),
    reset: jest.fn(),
    navigate: jest.fn(),
  };

describe('Tela de enviar um requerimento', () => {
    let mock;

    beforeEach(() => {
        mock = new MockAdapter(api);
        jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
        mock.reset();
        console.log.mockRestore();
    });

    it('Tipo vazio deve exibir tipo inválido', async () => {
        const { getByText } = render(
            <NavigationContainer>
              <SendRequirement navigation={mockNavigation} />
            </NavigationContainer>
        );

        fireEvent.press(getByText('Enviar Requerimento'));

        await waitFor(() => {
            expect(getByText('Tipo inválido!')).toBeTruthy();
        });
    });

    it('Selecionar outros deve exibir o campo Especifição/Justificativa', async () => {
        const { getByPlaceholderText, getByTestId } = render(
            <NavigationContainer>
              <SendRequirement navigation={mockNavigation} />
            </NavigationContainer>
        );

        fireEvent(getByTestId('tipo'), 'valueChange', 'Outros');

        await waitFor(() => {
            expect(getByPlaceholderText('Especifição/Justificativa')).toBeTruthy();
        });
    });

    it('Especifição/Justificativa vazia deve exibir Especifição/Justificativa inválida', async () => {
        const { getByText, getByTestId } = render(
            <NavigationContainer>
              <SendRequirement navigation={mockNavigation} />
            </NavigationContainer>
        );

        fireEvent(getByTestId('tipo'), 'valueChange', 'Outros');
        fireEvent.press(getByText('Enviar Requerimento'));

        await waitFor(() => {
            expect(getByText('Especifição/Justificativa inválida!')).toBeTruthy();
        });
    });

    it('Campos válidos devem enviar requerimento com sucesso', async () => {
        mock.onPost('/requirements').reply(201);

        const { getByText, getByTestId, getByPlaceholderText, queryByText } = render(
            <NavigationContainer>
              <SendRequirement navigation={mockNavigation} />
            </NavigationContainer>
        );

        fireEvent(getByTestId('tipo'), 'valueChange', 'Outros');
        fireEvent.changeText(getByPlaceholderText('Especifição/Justificativa'), 'teste');
        fireEvent.changeText(getByPlaceholderText('Exposição de Motivos'), 'teste');
        fireEvent.press(getByText('Enviar Requerimento'));

        await waitFor(() => {
            expect(queryByText('Especifição/Justificativa')).not.toBeTruthy();
        });
    });
});