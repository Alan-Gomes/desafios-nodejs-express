import express from "express";
// import { produtos } from "../produtos.js";

/* O export deve ser mantido como está para que os testes sejam executados corretamente */
export const app = express();

/*
  Listagem de Produtos:
  
  Crie um serviço que retorne a lista completa de produtos em formato JSON.
  O serviço deve obedecer o seguinte formato:

  GET /produtos

  Status 200
  JSON [{ id: ..., nome: ..., ...}, ...]
*/
