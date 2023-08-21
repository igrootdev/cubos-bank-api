const dados = require('../database/bancodedados');
const { validarCpf, validarEmail } = require('../utils/utils');

const listarContas = async (req, res) => {
    try {

        if (dados.contas.length === 0) {
            return res.status(404).json({ mensagem: 'Não existe contas a serem listadas' })
        }

        return await res.json(dados.contas);

    } catch (error) {
        return res.status(400).json({ mensagem: error.message });
    }
}

const criarConta = async (req, res) => {

    try {

        const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

        const novaConta = {

            numero: JSON.stringify(dados.contas.length + 1),
            saldo: 0,

            usuario: {
                nome,
                cpf,
                data_nascimento,
                telefone,
                email,
                senha
            }
        }

        dados.contas.push(novaConta);
        return await res.status(201).json({ mensagem: 'Conta criada com sucesso' });

    } catch (error) {

        return res.status(400).json({ mensagem: error.message });
    }

}

const atualizarConta = async (req, res) => {

    const numeroConta = Number(req.params.numeroConta);
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    try {

        if (isNaN(numeroConta)) {
            return res.status(400).json({ mensagem: 'Por favor, informe um número da conta válido' });
        }

        if (nome.length === 0 && cpf.length === 0 && data_nascimento.length === 0 &&
            telefone.length === 0 && email.length === 0 && senha.length === 0) {

            return res.status(400).json({ mensagem: 'Por favor, informe ao menos um campo para atualização' });
        }

        const buscarCpf = dados.contas.find(cpf => {
            return cpf.usuario.cpf === req.body.cpf;
        });

        if (buscarCpf) {
            return res.status(409).json({ mensagem: 'CPF já existente' });
        }

        const buscarEmail = dados.contas.find(email => {
            return email.usuario.email === req.body.email;
        });

        if (buscarEmail) {
            return res.status(409).json({ mensagem: 'Email já existente' });
        }

        const contaExistente = dados.contas.find(numero => {
            return numero.numero === JSON.stringify(numeroConta);
        });

        if (!contaExistente) {
            return res.status(404).json({ mensagem: 'Não existe conta com o número informado' });
        }

        if (nome.trim().length != 0) {
            contaExistente.usuario.nome = nome;
        }

        if (cpf) {
            contaExistente.usuario.cpf = cpf;
        }
        if (data_nascimento) {
            contaExistente.usuario.data_nascimento = data_nascimento;
        }
        if (telefone) {
            contaExistente.usuario.telefone = telefone;
        }
        if (email) {
            contaExistente.usuario.email == email;
        }
        if (senha) {
            contaExistente.usuario.senha = senha;
        }

        return await res.json({ mensagem: 'Conta atualizada com sucesso' });

    } catch (error) {
        return res.status(400).json({ mensagem: error.message });
    }
}

const deletarConta = async (req, res) => {

    try {

        const numeroConta = Number(req.params.numeroConta);

        if (isNaN(numeroConta)) {
            return res.status(400).json({ mensagem: 'Por favor, informe um número da conta válido' });
        }

        const contaExistente = dados.contas.find(numero => {
            return numero.numero === JSON.stringify(numeroConta);
        });

        if (!contaExistente) {
            return res.status(404).json({ mensagem: 'Não existe conta com o numero informado' });
        }

        const saldoConta = contaExistente.saldo;

        if (saldoConta !== 0) {
            return res.status(400).json({ mensagem: 'Não é possível excluir a conta, cliente ainda tem saldo' });
        }

        const indiceConta = dados.contas.indexOf(contaExistente);
        dados.contas.splice(indiceConta, 1);

        return await res.status(200).json({ mensagem: 'Conta excluida com sucesso' });

    } catch (error) {
        return res.status(400).json({ mensagem: error.message });
    }

}

module.exports = {
    listarContas,
    criarConta,
    atualizarConta,
    deletarConta
}