import bodyParser from "body-parser";
import express from "express";

/* O export deve ser mantido como está para que os testes sejam executados corretamente */
export const app = express();

/* Biblioteca adicional usada apenas para permitir a leitura de JSON das requisições */
app.use(bodyParser.json());

/*
  Adicionar Novo Produto:


  Implemente um serviço que permita adicionar um novo produto à lista.
  Os dados do produto serão enviados no corpo da requisição POST.
  Todos os campos são obrigatórios.
  O serviço deve obedecer o seguinte formato:

  POST /produtos
  O retorno deve ser:
  Status 201
  Sem conteúdo de resposta

  Caso algum dos campos esteja faltando, deve retornar:
  Status 400
  JSON { "message": "Todos os campos são obrigatórios" }

  Caso já exista um produto com o mesmo id, deve retornar:
  Status 400
  JSON { "message": "Já existe um produto com o id informado" }

*/
