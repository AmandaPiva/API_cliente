const express = require("express");
const router = express.Router();
const cliente = require("../src/cliente");

router.get('/', async function(req, res, next){
    try{
        res.json(await cliente.getMultiple(req.query.page));
    }catch(err){
        console.error('Erro ao selecionar os clientes', err.message);
        next(err)
    }
});

router.post('/', async function(req, res, next){
    try{
        res.json(await cliente.create(req.body));
    }catch(err){
        console.error("Erro ao criar o novo cliente", err.message);
        next(err)
    }
});

router.put('/:id', async function(req, res, next){
    try{
        res.json(await cliente.update(req.params.id, req.body));
    }catch(err){
        console.error("Erro ao atualizar um cliente", err.message);
        next(err)
    }
})

router.delete('/:id', async function (req, res, next){
    try{
        res.json(await cliente.remove(req.params.id, req.body));
    }catch(err){
        console.error("Erro ao deletar um cliente", err.message);
        next(err)
    }
})

module.exports = router;