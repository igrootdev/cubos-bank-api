const dados = require('../database/bancodedados');
const { format } = require('date-fns');
const dataAtual = new Date();
const data = format(dataAtual, 'yyyy-MM-dd HH:mm:ss');


const depositar = async (req, res) => {

    const { valor } = req.body;
    const { numeroConta } = req.body;

    try {

        if (!valor) {
            return res.status(400).json({ mensagem: 'Por favor, informe o valor a ser depositado' });
        }
        if (!numeroConta) {
            return res.status(400).json({ mensagem: 'Por favor, informe o número da conta para deposito' });
        }
        if (valor <= 0) {
            return res.status(400).json({ mensagem: 'Não foi possível concluir o depósito. O valor a ser depositado deve ser maior que zero' });
        }

        const conta = await dados.contas.find(conta => conta.numero === numeroConta);

        if (!conta) {
            return res.status(400).json({ mensagem: 'Não existe conta com o número informado' })
        }

        conta.saldo += valor;

        guardaDeposito = {
            data,
            numeroConta,
            valor
        }

        dados.depositos.push(guardaDeposito);

        return await res.status(200).json({ mensagem: 'Valor depositado com sucesso' });

    } catch (error) {

        return await res.status(400).json({ mensagem: error.message });
    }

}

const sacar = async (req, res) => {

    const { valor } = req.body;
    const { numeroConta } = req.body;
    const { senha } = req.body;

    if (!valor) {
        return res.status(400).json({ mensagem: 'Por favor, informe o valor' });
    }

    if (!numeroConta) {
        return res.status(400).json({ mensagem: 'Por favor, informe o número da conta' });
    }

    if (!senha) {
        return res.status(400).json({ mensagem: 'Por favor, informe sua senha' });
    }

    try {

        const conta = dados.contas.find(conta => conta.numero === numeroConta);

        if (!conta) {
            return res.status(400).json({ mensagem: 'Não existe conta com o número informado' })
        }

        if (!senha) {
            return res.status(400).json({ mensagem: 'Por favor, insira a senha da sua conta' });
        }

        if (senha != conta.usuario.senha) {
            return res.status(400).json({ mensagem: 'Senha incorreta, tente novamente' });
        }

        if (valor > conta.saldo) {
            return res.status(400).json({ mensagem: 'Saldo insuficiente para completar a transação' });
        }

        conta.saldo -= valor;

        guardaSacar = {
            data,
            numeroConta,
            valor
        }

        dados.saques.push(guardaSacar);

        return await res.status(200).json({ mensagem: 'Saque realizado com sucesso!' });

    } catch (error) {

        return res.status(400).json({ mensagem: error.message });
    }
}


const transferir = async (req, res) => {

    const { valor } = req.body;
    const { numeroConta } = req.body;
    const { senha } = req.body;
    const { numeroContaDestino } = req.body;

    if (!valor) {
        return res.status(400).json({ mensagem: 'Por favor, informe o valor' });
    }

    if (!numeroConta) {
        return res.status(400).json({ mensagem: 'Por favor, informe o número da conta' });
    }

    if (!senha) {
        return res.status(400).json({ mensagem: 'Por favor, informe sua senha' });
    }

    if (!numeroContaDestino) {
        return res.status(400).json({ mensagem: 'Por favor, informe o numero da conta de destino' });
    }

    try {

        const conta = dados.contas.find(conta => conta.numero === numeroConta);

        if (!conta) {
            return res.status(400).json({ mensagem: 'Não existe conta origem com o número informado' })
        }

        if (!senha) {
            return res.status(400).json({ mensagem: 'Por favor, insira a senha da sua conta' });
        }

        if (senha != conta.usuario.senha) {
            return res.status(400).json({ mensagem: 'Senha incorreta, tente novamente' });
        }

        if (valor > conta.saldo) {
            return res.status(400).json({ mensagem: 'Saldo insuficiente para completar a transação' });
        }

        const contaDestino = dados.contas.find(conta => conta.numero === numeroContaDestino);

        if (!contaDestino) {
            return res.status(404).json({ mensagem: 'Conta de destino não encontrada.' });
        }

        if (numeroConta == numeroContaDestino) {
            return res.status(400).json({
                mensagem: 'Número da conta inválido, conta origem e destino são iguais'
            });
        }

        conta.saldo -= valor;
        contaDestino.saldo += valor;

        guardaTransferenciaEnviada = {

            data,
            numeroConta,
            numeroContaDestino,
            valor

        }

        dados.transferencias.push(guardaTransferenciaEnviada);

        return await res.status(200).json({ mensagen: 'Transferência realizada com sucesso' });

    } catch (error) {

        return res.status(400).json({ mensagem: error.message });
    }
}

const saldo = async (req, res) => {

    const { senha } = req.query;
    const numeroConta = req.query.numero_conta;

    if (!numeroConta) {
        return res.status(400).json({ mensagem: 'Por favor, informe o número da conta' });
    }

    if (!senha) {
        return res.status(400).json({ mensagem: 'Por favor, informe a senha da conta' });
    }

    try {

        const conta = dados.contas.find(conta => conta.numero === numeroConta);

        if (!conta) {
            return res.status(404).json({ mensagem: 'Não existe conta o número informado' });
        }

        if (senha != conta.usuario.senha) {
            return res.status(400).json({ mensagem: 'Senha incorreta, tente novamente' });
        }

        return await res.status(200).json({ mensagem: `Seu saldo é: ${conta.saldo} ` });

    } catch (error) {

        return res.status(400).json({ mensagem: error.message });
    }

}

const extrato = async (req, res) => {

    const { senha } = req.query;
    const numeroConta = req.query.numero_conta;

    if (!numeroConta) {
        return res.status(400).json({ mensagem: 'Por favor, informe o número da conta' });
    }

    if (!senha) {
        return res.status(400).json({ mensagem: 'Por favor, informe a senha da conta' });
    }

    try {

        const conta = dados.contas.find(conta => conta.numero === numeroConta);

        if (!conta) {
            return res.status(404).json({ mensagem: 'Não existe conta o número informado' });
        }

        if (senha != conta.usuario.senha) {
            return res.status(400).json({ mensagem: 'Senha incorreta, tente novamente' });
        }

        const depositos = dados.depositos.filter(transacao => transacao.numeroConta === numeroConta);
        const saques = dados.saques.filter(transacao => transacao.numeroConta === numeroConta);
        const transferenciaEnviada = dados.transferencias.filter(transacao => transacao.numeroConta === numeroConta);
        const transferenciaRecebida = dados.transferencias.filter(transacao => transacao.numeroContaDestino === numeroConta);

        const extrato = {

            depositos,
            saques,
            transferenciaEnviada,
            transferenciaRecebida

        }

        return await res.status(200).json(extrato);

    } catch (error) {

        return res.status(400).json({ mensagem: error.message });
    }

}

module.exports = {

    depositar,
    sacar,
    transferir,
    saldo,
    extrato
}

