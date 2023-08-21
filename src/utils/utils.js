const dados = require('../database/bancodedados');

const validarCpf = (cpf) => {

    const buscarCpf = dados.contas.find(cpf => {
        return cpf.usuario.cpf === req.body.cpf;
    });

    if (buscarCpf) {
        return res.status(409).json({ mensagem: 'CPF já existente' });
    }
}

const validarEmail = () => {
    const buscarEmail = dados.contas.find(email => {
        return email.usuario.email === req.body.email;
    });

    if (buscarEmail) {
        return res.status(409).json({ mensagem: 'Email já existente' });
    }
}


module.exports = {
    validarCpf,
    validarEmail
}