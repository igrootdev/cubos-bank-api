const formularioCriarConta = async (req, res, next) => {

    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;


    if (nome.trim() === "") {
        return res.status(400).json({ mensagem: 'Por favor, informe o nome' });
    }
    if (!cpf) {
        return res.status(400).json({ mensagem: 'Por favor, informe o CPF' });
    }
    if (cpf.length < 11) {
        return res.status(400).json({ mensagem: 'CPF inválido, ele contém 11 caracteres' });
    }
    if (isNaN(cpf)) {
        return res.status(400).json({ mensagem: 'CPF pode conter apenas números' });
    }
    if (!data_nascimento) {
        return res.status(400).json({ mensagem: 'Por favor, informe a data de nascimento' });
    }
    if (!telefone) {
        return res.status(400).json({ mensagem: 'Por favor, informe o telefone' });
    }
    if (!email) {
        return res.status(400).json({ mensagem: 'Por favor, informe o email' });
    }
    if (!senha) {
        return res.status(400).json({ mensagem: 'Por favor, informe a senha' });
    }

    next();

}

const validarCpf = (req, res) => {

    const buscarCpf = dados.contas.find(cpf => {
        return cpf.usuario.cpf === req.body.cpf;
    });

    if (buscarCpf) {
        return res.status(409).json({ mensagem: 'CPF já existente' });
    }
}

const validarEmail = (req, res) => {

    const buscarEmail = dados.contas.find(email => {
        return email.usuario.email === req.body.email;
    });

    if (buscarEmail) {
        return res.status(409).json({ mensagem: 'Email já existente' });
    }
}



module.exports = {
    formularioCriarConta,
    validarCpf,
    validarEmail
}