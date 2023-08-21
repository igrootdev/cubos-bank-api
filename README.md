# cubos-bank-api

Repositório de um projeto didático para compreender como funciona os princípios de uma API Restfull. Proposto pelo Curso de Desenvolvimento Backend da Cubos Academy

Cubos Bank API
Bem-vindo(a) ao repositório da API do Cubos Bank! Este é um projeto de um banco digital desenvolvido como parte do Desafio de Back-end do Módulo 2 na CUBOS.

Descrição
Você foi contratado pela CUBOS para criar uma RESTful API para um Banco Digital. Neste projeto, você implementará funcionalidades como listagem de contas bancárias, criação de contas, atualização de dados de usuário, depósito, saque, transferência entre contas, consulta de saldo e emissão de extrato bancário.

Requisitos Obrigatórios
Sua API segue o padrão REST.
Seu código está organizado, com responsabilidades bem definidas para cada arquivo.
A estrutura mínima inclui index.js, servidor.js, arquivo de rotas e pasta de controladores.
Valores monetários são representados em centavos (Ex.: R$ 10,00 = 1000).
Evite duplicação de código. Considere centralizar partes comuns em funções.
Persistência dos Dados
Os dados são mantidos em memória, no objeto bancodedados no arquivo bancodedados.js.

Endpoints
Listar contas bancárias
GET /contas?senha_banco=123

Este endpoint lista todas as contas bancárias existentes.

Entrada (query params)

Senha do banco
Saída

Lista de contas bancárias existentes ou array vazio se não houver contas.

Criar conta bancária
POST /contas

Este endpoint cria uma nova conta bancária, gerando um número único para identificação.

Entrada

Nome
CPF
Data de Nascimento
Telefone
Email
Senha
Saída

Dados do usuário, número da conta e saldo.

Atualizar usuário da conta bancária
PUT /contas/:numeroConta/usuario

Este endpoint atualiza os dados do usuário de uma conta bancária.

Entrada

Um ou mais campos do usuário (Nome, CPF, Data de Nascimento, Telefone, Email, Senha)
Excluir Conta
DELETE /contas/:numeroConta

Este endpoint exclui uma conta bancária existente.

Depositar
POST /transacoes/depositar

Este endpoint realiza um depósito em uma conta bancária.

Entrada

Número da conta
Valor
Sacar
POST /transacoes/sacar

Este endpoint realiza um saque em uma conta bancária.

Entrada

Número da conta
Valor
Senha
Transferir
POST /transacoes/transferir

Este endpoint permite a transferência de recursos entre contas bancárias.

Entrada

Número da conta de origem
Senha da conta de origem
Valor
Número da conta de destino
Saldo
GET /contas/saldo?numero_conta=123&senha=123

Este endpoint retorna o saldo de uma conta bancária.

Entrada (query params)

Número da conta
Senha
Saída

Saldo da conta.

Extrato
GET /contas/extrato?numero_conta=123&senha=123

Este endpoint lista as transações realizadas de uma conta específica.

Entrada (query params)

Número da conta
Senha
Saída

Relatório das transações (depósitos, saques, transferências enviadas e recebidas).

Status Code
A API pode retornar os seguintes status codes:

200: Requisição bem sucedida
201: Requisição bem sucedida e algo foi criado
400: Erro de requisição inválida
404: Recurso não encontrado
Como Usar
Clone este repositório.
Instale as dependências: npm install
Inicie o servidor: npm start
Atenção
Este é um projeto piloto e mais funcionalidades serão implementadas no futuro. Dados do banco são imutáveis.

Divirta-se codificando e criando a API do Cubos Bank! 🚀
