const express = require("express");
const cliente = require('./routes/cliente')

const app = express(); //instanciando o express
const porta = 3000; //porta principal

app.use(express. json());
app.use(express.urlencoded ({extends: true, }));

app.get("/", (req, res) => {
    res.json({mensagem: "ok"});
});

app.use("/cliente", cliente);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
  });

app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
})