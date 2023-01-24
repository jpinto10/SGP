//declaração das variáveis
let express= require('express');

//arquivo de rotas
const routers = require('./rotas/rotas');
const cors = require('cors');
const path = require('path');

//rotas
const app = express();

//parser
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

app.use('/back/', express.static(path.resolve(__dirname,'public', 'fotos_user' )) )

app.use('/api', routers);

let port = process.env.PORT || 3060;
app.listen(port);
console.log(`Servidor conectado na porta ${port}`);