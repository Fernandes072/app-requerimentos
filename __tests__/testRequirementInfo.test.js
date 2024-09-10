import MockAdapter from 'axios-mock-adapter';
import api from '../src/Services/Api';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import RequirementInfo from '../screens/User/RequirementInfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';

const mockNavigation = {
    pop: jest.fn(),
    reset: jest.fn(),
    navigate: jest.fn(),
  };

describe('Tela de informações do requerimento', () => {
    let mock;

    beforeEach(() => {
        mock = new MockAdapter(api);
        jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
        mock.reset();
        console.log.mockRestore();
    });

    it('Seta deve voltar para a tela de requerimentos', async () => {
        const { getByTestId } = render(
            <NavigationContainer>
              <RequirementInfo navigation={mockNavigation} />
            </NavigationContainer>
        );

        fireEvent.press(getByTestId('Voltar'));

        await waitFor(() => {
            expect(mockNavigation.pop).toHaveBeenCalled();
        });
    });

    it('Deve exibir as informações do requerimento', async () => {
        await AsyncStorage.setItem('infoRequirement', JSON.stringify({
            reason: "Atestado médico para justificar falta do dia 25/12",
            registration: {
              course: "Ciência da Computação",
              email: "ana@email.com",
              firstName: "Ana Beatriz",
              lastName: "Pereira",
              phoneNumber: "79123451234",
              registration: 2021004000,
            },
            requirementId: 1,
            specification: "Aconteceu um imprevisto",
            type: "Outros",
        }));
        
        const { getByText } = render(
            <NavigationContainer>
              <RequirementInfo navigation={mockNavigation} />
            </NavigationContainer>
        );

        await waitFor(() => {
            expect(getByText('Requerimento N° 1')).toBeTruthy();
            expect(getByText('Matrícula: 2021004000')).toBeTruthy();
            expect(getByText('Nome: Ana Beatriz Pereira')).toBeTruthy();
            expect(getByText('Email: ana@email.com')).toBeTruthy();
            expect(getByText('Telefone: 79123451234')).toBeTruthy();
            expect(getByText('Curso: Ciência da Computação')).toBeTruthy();
            expect(getByText('Tipo: Outros')).toBeTruthy();
            expect(getByText('Justificativa: Aconteceu um imprevisto')).toBeTruthy();
            expect(getByText('Motivos: Atestado médico para justificar falta do dia 25/12')).toBeTruthy();
        });
    });
});