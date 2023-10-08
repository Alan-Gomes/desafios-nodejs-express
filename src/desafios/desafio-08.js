import bodyParser from "body-parser";
import express from "express";
import { Client } from "pg";

/*
  Publicação com menções:

  Implemente um serviço para cadastro de uma publicação de rede social.
  O serviço deve inserir a publicação na tabela "postagens".
  Além disso, deve buscar no conteúdo da publicação todas as tags (ex: @user1 @user2)
  e inserir cada ocorrência na tabela postagem_mencoes. Utilize a expressão regular: /@[a-z0-9_]+/gi

  Esse exemplo pode ser usado quando for necessário receber o id da postagem inserida:
  https://node-postgres.com/features/transactions

  O serviço deve obedecer o seguinte formato:

  POST /postagens
  Corpo da requsição:
    { "usuarioId": 123,
      "conteudo": "hello @world" }

  O retorno deve ser:
  Status 201
  Sem conteúdo de resposta
*/

/* O export deve ser mantido como está para que os testes sejam executados corretamente */
export async function createApp() {
  const app = express();

  /* Biblioteca adicional usada apenas para permitir a leitura de JSON das requisições */
  app.use(bodyParser.json());

  /* Conecta com o banco de dados */
  const client = new Client();
  await client.connect();

  /* Comando para criar as tabelas */
  await client.query(`CREATE TABLE IF NOT EXISTS usuarios (
    id serial,
    username text not null
  )`);
  await client.query(`CREATE TABLE IF NOT EXISTS postagens (
    id serial,
    usuario_id int not null,
    conteudo text not null
  )`);
  await client.query(`CREATE TABLE IF NOT EXISTS postagem_mencoes (
    postagem_id int not null,
    usuario_id int not null
  )`);

  /* 
    Implemente aqui o serviço
  */

  /* O return deve ser mantido como está para que os testes sejam executados corretamente */
  return app;
}
