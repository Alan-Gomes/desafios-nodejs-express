import bodyParser from "body-parser";
import express from "express";
import { Client } from "pg";

/*
  Cadastro de usuários:

  Implemente os serviços de cadastro e consulta de usuário utilizando a conexão com o banco de dados.
  Documentação da biblioteca: https://node-postgres.com/

  O serviço POST deve obedecer o seguinte formato:

  POST /usuarios
  Corpo da requsição:
    { nome: "Usuário Teste",
      email: "teste@example.com", }

  O retorno deve ser:
  Status 201
  Sem conteúdo de resposta

  O serviço GET deve obedecer o seguinte formato:

  GET /usuarios/:id
  O retorno deve ser:
  Status 200
  JSON { id: 123,
        nome: "Usuário Teste",
        email: "teste@example.com", }
*/

/* O export deve ser mantido como está para que os testes sejam executados corretamente */
export async function createApp() {
  const app = express();

  /* Biblioteca adicional usada apenas para permitir a leitura de JSON das requisições */
  app.use(bodyParser.json());

  /* Conecta com o banco de dados */
  const client = new Client();
  await client.connect();

  /* Comando para criar a tabela de usuários */
  await client.query(`CREATE TABLE IF NOT EXISTS usuarios (
    id serial,
    nome varchar(256) not null,
    email varchar(128) not null
  )`);

  /* 
    Implemente aqui os serviços
  */

  /* O return deve ser mantido como está para que os testes sejam executados corretamente */
  return app;
}
