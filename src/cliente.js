const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page =1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT id, nome, cpf, email FROM pessoa LIMIT ${offset}, ${config.listPerPage}`
    );

    const data = helper.emptyOrRows(rows);
    const meta ={page};

    return{
        data,
        meta
    }
}

async function create(cliente){

    const result = await db.query(
        `INSERT INTO pessoa (nome, cpf, email) VALUES ('${cliente.nome}', '${cliente.cpf}', '${cliente.email}')`
    );

    let message = "Erro ao criar um novo cliente";

    if(result.affectedRows){
        message = "Cliente novo criado com sucesso";
    }

     return(message);
}

async function update(id, cliente){
    const result = await db.query(
        `UPDATE pessoa SET nome="${cliente.nome}", cpf="${cliente.cpf}", email="${cliente.email} WHERE id=${id}" `
    )

    let message = "Erro ao atualizar um cliente";

    if(result.affectedRows){
        message = "Cliente alterado com sucesso";
    }

    return {message};
}

async function remove(id){
    const result = await db.query(
        `DELETE FROM pessoa WHERE id=${id}`
    );

    let message = "Erro ao deletar o cliente";

    if(result.affectedRows){
        message = "Cliente deletado com sucesso";
    }

    return {message};
}

module.exports = {
    getMultiple,
    create,
    update,
    remove
} 