const app = require('./config/servidor');
const rotas = require('./routes/rotas');

app.use(rotas);

app.listen(3000);