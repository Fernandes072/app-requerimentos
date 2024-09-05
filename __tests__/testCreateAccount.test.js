import MockAdapter from 'axios-mock-adapter';
import api from '../src/Services/Api';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import CreateAccount from '../screens/CreateAccount';

const mockNavigation = {
    reset: jest.fn(),
  };

describe('Tela de criar conta', () => {
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
        const { getByPlaceholderText, getByText } = render(<CreateAccount navigation={mockNavigation} />);

        expect(getByPlaceholderText('Nome')).toBeTruthy();
        expect(getByPlaceholderText('Sobrenome')).toBeTruthy();
        expect(getByPlaceholderText('Telefone')).toBeTruthy();
        expect(getByPlaceholderText('Email')).toBeTruthy();
        expect(getByPlaceholderText('Matrícula')).toBeTruthy();
        expect(getByPlaceholderText('Usuário')).toBeTruthy();
        expect(getByPlaceholderText('Senha')).toBeTruthy();
        expect(getByPlaceholderText('Confirmar senha')).toBeTruthy();
        expect(getByText('Criar conta')).toBeTruthy();
        expect(getByText('Login')).toBeTruthy();
    });

    it('Seta deve voltar para a tela de login', async () => {
        const { getByTestId } = render(<CreateAccount navigation={mockNavigation} />);

        fireEvent.press(getByTestId('Voltar'));

        await waitFor(() => {
            expect(mockNavigation.reset).toHaveBeenCalledWith({ index: 0, routes: [{ name: 'Login' }] });
        });
    });

    it('Texto login deve voltar para a tela de login', async () => {
        const { getByText } = render(<CreateAccount navigation={mockNavigation} />);

        fireEvent.press(getByText('Login'));

        await waitFor(() => {
            expect(mockNavigation.reset).toHaveBeenCalledWith({ index: 0, routes: [{ name: 'Login' }] });
        });
    });

    it('Campos válidos devem criar de conta com sucesso', async () => {
        mock.onPost('/users').reply(201);

        const {getByPlaceholderText, getByText, getByTestId} = render(<CreateAccount navigation={mockNavigation} />);

        fireEvent.changeText(getByPlaceholderText('Nome'), 'jose');
        fireEvent.changeText(getByPlaceholderText('Sobrenome'), 'silva');   
        fireEvent.changeText(getByPlaceholderText('Telefone'), '82885857441');  
        fireEvent.changeText(getByPlaceholderText('Email'), 'joses@gmail.com');
        fireEvent.changeText(getByPlaceholderText('Matrícula'), '2020321145');
        fireEvent.changeText(getByPlaceholderText('Usuário'), 'josesilva');
        fireEvent.changeText(getByPlaceholderText('Senha'), '1234567');
        fireEvent.changeText(getByPlaceholderText('Confirmar senha'), '1234567');
        fireEvent(getByTestId('course'), 'valueChange', 'Ciência da Computação');
        fireEvent.press(getByText('Criar conta'));

        await waitFor(() => {
            expect(mockNavigation.reset).toHaveBeenCalledWith({ index: 0, routes: [{ name: 'Login' }] });
        });
    });

    it('Nome vazio deve exibir nome inválido', async () => {
        const {getByPlaceholderText, getByText} = render(<CreateAccount navigation={mockNavigation} />);

        fireEvent.changeText(getByPlaceholderText('Nome'), null);
        fireEvent.press(getByText('Criar conta'));

        await waitFor(() => {
            expect(getByText('Nome inválido!')).toBeTruthy();
        });
    });

    it('Sobrenome vazio deve exibir sobrenome inválido', async () => {
        const {getByPlaceholderText, getByText} = render(<CreateAccount navigation={mockNavigation} />);

        fireEvent.changeText(getByPlaceholderText('Sobrenome'), null);
        fireEvent.press(getByText('Criar conta'));

        await waitFor(() => {
            expect(getByText('Sobrenome inválido!')).toBeTruthy();
        });
    });

    it('Telefone vazio deve exibir número inválido', async () => {
        const {getByPlaceholderText, getByText} = render(<CreateAccount navigation={mockNavigation} />);

        fireEvent.changeText(getByPlaceholderText('Telefone'), null);
        fireEvent.press(getByText('Criar conta'));

        await waitFor(() => {
            expect(getByText('Número inválido!')).toBeTruthy();
        });
    });

    it('Telefone abaixo de 11 dígitos deve exibir número inválido', async () => {
        const {getByPlaceholderText, getByText} = render(<CreateAccount navigation={mockNavigation} />);

        fireEvent.changeText(getByPlaceholderText('Telefone'), '123');
        fireEvent.press(getByText('Criar conta'));

        await waitFor(() => {
            expect(getByText('Número inválido!')).toBeTruthy();
        });
    });

    it('Telefone que já existe deve exibir número inválido', async () => {
        mock.onGet('/users/phoneNumber/79996968574').reply(200);

        const {getByPlaceholderText, getByText} = render(<CreateAccount navigation={mockNavigation} />);

        fireEvent.changeText(getByPlaceholderText('Telefone'), '79996968574');
        fireEvent.press(getByText('Criar conta'));

        await waitFor(() => {
            expect(getByText('Número inválido!')).toBeTruthy();
        });
    });

    it('Email vazio deve exibir email inválido', async () => {
        const {getByPlaceholderText, getByText} = render(<CreateAccount navigation={mockNavigation} />);

        fireEvent.changeText(getByPlaceholderText('Email'), null);
        fireEvent.press(getByText('Criar conta'));

        await waitFor(() => {
            expect(getByText('Email inválido!')).toBeTruthy();
        });
    });

    it('Email fora do padrão deve exibir email inválido', async () => {
        const {getByPlaceholderText, getByText} = render(<CreateAccount navigation={mockNavigation} />);

        fireEvent.changeText(getByPlaceholderText('Email'), 'a');
        fireEvent.press(getByText('Criar conta'));

        await waitFor(() => {
            expect(getByText('Email inválido!')).toBeTruthy();
        });
    });

    it('Email que já existe deve exibir email inválido', async () => {
        mock.onGet('/users/email/joses@gmail.com').reply(200);

        const {getByPlaceholderText, getByText} = render(<CreateAccount navigation={mockNavigation} />);

        fireEvent.changeText(getByPlaceholderText('Email'), 'joses@gmail.com');
        fireEvent.press(getByText('Criar conta'));

        await waitFor(() => {
            expect(getByText('Número inválido!')).toBeTruthy();
        });
    });

    it('Matrícula vazia deve exibir matrícula inválida', async () => {
        const {getByPlaceholderText, getByText} = render(<CreateAccount navigation={mockNavigation} />);

        fireEvent.changeText(getByPlaceholderText('Matrícula'), null);
        fireEvent.press(getByText('Criar conta'));

        await waitFor(() => {
            expect(getByText('Matrícula inválida!')).toBeTruthy();
        });
    });

    it('Matrícula abaixo de 10 dígitos deve exibir matrícula inválida', async () => {
        const {getByPlaceholderText, getByText} = render(<CreateAccount navigation={mockNavigation} />);

        fireEvent.changeText(getByPlaceholderText('Matrícula'), '1');
        fireEvent.press(getByText('Criar conta'));

        await waitFor(() => {
            expect(getByText('Matrícula inválida!')).toBeTruthy();
        });
    });

    it('Matrícula que já existe deve exibir matrícula inválida', async () => {
        mock.onGet('/users/2022005258').reply(200);

        const {getByPlaceholderText, getByText} = render(<CreateAccount navigation={mockNavigation} />);

        fireEvent.changeText(getByPlaceholderText('Matrícula'), '2022005258');
        fireEvent.press(getByText('Criar conta'));

        await waitFor(() => {
            expect(getByText('Matrícula inválida!')).toBeTruthy();
        });
    });

    it('Curso vazio deve exibir curso inválido', async () => {
        const {getByText} = render(<CreateAccount navigation={mockNavigation} />);

        fireEvent.press(getByText('Criar conta'));

        await waitFor(() => {
            expect(getByText('Curso inválido!')).toBeTruthy();
        });
    });

    it('Usuário vazio deve exibir usuário inválido', async () => {
        const {getByPlaceholderText, getByText} = render(<CreateAccount navigation={mockNavigation} />);

        fireEvent.changeText(getByPlaceholderText('Usuário'), null);
        fireEvent.press(getByText('Criar conta'));

        await waitFor(() => {
            expect(getByText('Usuário inválido!')).toBeTruthy();
        });
    });

    it('Usuário abaixo de 5 dígitos deve exibir usuário inválido', async () => {
        const {getByPlaceholderText, getByText} = render(<CreateAccount navigation={mockNavigation} />);

        fireEvent.changeText(getByPlaceholderText('Usuário'), 'ab');
        fireEvent.press(getByText('Criar conta'));

        await waitFor(() => {
            expect(getByText('Usuário inválido!')).toBeTruthy();
        });
    });

    it('Usuário que já existe deve exibir usuário inválido', async () => {
        mock.onGet('/users/username/joses').reply(200);

        const {getByPlaceholderText, getByText} = render(<CreateAccount navigation={mockNavigation} />);

        fireEvent.changeText(getByPlaceholderText('Usuário'), 'joses');
        fireEvent.press(getByText('Criar conta'));

        await waitFor(() => {
            expect(getByText('Usuário inválido!')).toBeTruthy();
        });
    });

    it('Senha vazia deve exibir senha inválida', async () => {
        const {getByPlaceholderText, getByText} = render(<CreateAccount navigation={mockNavigation} />);

        fireEvent.changeText(getByPlaceholderText('Senha'), null);
        fireEvent.press(getByText('Criar conta'));

        await waitFor(() => {
            expect(getByText('Senha inválida!')).toBeTruthy();
        });
    });

    it('Senha abaixo de 6 dígitos deve exibir senha inválida', async () => {
        const {getByPlaceholderText, getByText} = render(<CreateAccount navigation={mockNavigation} />);

        fireEvent.changeText(getByPlaceholderText('Senha'), '12345');
        fireEvent.press(getByText('Criar conta'));

        await waitFor(() => {
            expect(getByText('Senha inválida!')).toBeTruthy();
        });
    });

    it('Senha de 6 dígitos deve ser válida', async () => {
        const {getByPlaceholderText, getByText, queryByText} = render(<CreateAccount navigation={mockNavigation} />);

        fireEvent.changeText(getByPlaceholderText('Senha'), '123456');
        fireEvent.press(getByText('Criar conta'));

        await waitFor(() => {
            expect(queryByText('Senha inválida!')).not.toBeTruthy();
        });
    });

    it('Senha e Confirmar senha diferentes deve exibir senhas não conferem', async () => {
        const {getByPlaceholderText, getByText} = render(<CreateAccount navigation={mockNavigation} />);

        fireEvent.changeText(getByPlaceholderText('Senha'), '123456');
        fireEvent.changeText(getByPlaceholderText('Confirmar senha'), '1234567');
        fireEvent.press(getByText('Criar conta'));

        await waitFor(() => {
            expect(getByText('Senhas não conferem!')).toBeTruthy();
        });
    });

});