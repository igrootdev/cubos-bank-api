const dados = require('../database/bancodedados');

const validacaoSenhaListagem = (req, res, next) => {

    const senha_banco = req.query.senha_banco;
    const senha = dados.banco.senha;

    if (!senha_banco) {
        return res.status(401).json({ mensagem: 'Por favor, informe a senha solicitada' });
    }

    if (senha_banco.length < 8) {
        return res.status(401).json({ mensagem: 'Senha deve conter no mínimo 8 caracteres' });
    }

    if (senha_banco != senha) {
        return res.status(401).json({ mensagem: 'Senha incorreta' });
    }

    next();
}

module.exports = {

    validacaoSenhaListagem
}