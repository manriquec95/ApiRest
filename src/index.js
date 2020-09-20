const express = require('express');
const app = express();

//Settings
app.set('port', process.env.PORT || 3000)

//Middlewares
app.use(express.json());

//Routes
app.use(require('./routes/clientes'));
app.use(require('./routes/empleados'));
app.use(require('./routes/facturas'));
app.use(require('./routes/productos'));
app.use(require('./routes/productosFacturas'));

//Starting Server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
})