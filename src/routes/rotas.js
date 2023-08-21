const express = require('express');
const { listarContas, criarConta, atualizarConta, deletarConta } = require('../controllers/administracaocontas');
const { validacaoSenhaListagem } = require('../middlewares/autenticacao');
const { formularioCriarConta } = require('../middlewares/formularios');
const { depositar, sacar, transferir, saldo, extrato } = require('../controllers/transacoesbancarias');
const rotas = express.Router();

//************ Administração Geral das Contas Bancárias *****************//

rotas.get('/contas', validacaoSenhaListagem, listarContas);
rotas.post('/contas', formularioCriarConta, criarConta);
rotas.put('/contas/:numeroConta/usuario', atualizarConta);
rotas.delete('/contas/:numeroConta', deletarConta);

//************ Administração das Transações Bancárias ******************//

rotas.post('/transacoes/depositar', depositar);
rotas.post('/transacoes/sacar', sacar);
rotas.post('/transacoes/transferir', transferir);
rotas.get('/contas/saldo', saldo);
rotas.get('/contas/extrato', extrato);


module.exports = rotas;