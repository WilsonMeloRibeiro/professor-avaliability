const express = require('express');
const app = express();
const router = require('./api/routes/routes.js');
const cors = require('cors');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use(router);
app.listen(3333, () => console.log('rodando na porta 3333'));