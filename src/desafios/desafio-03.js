import express from "express";

/* O export deve ser mantido como está para que os testes sejam executados corretamente */
export const app = express();

/*
  Filtragem por Categoria:
  
  Crie um serviço que permita filtrar os produtos com base na categoria.
  O cliente pode enviar a categoria como parâmetro na URL.
  O serviço deve obedecer o seguinte formato:

  GET /produtos?categoria=Roupas

  Caso hajam produtos nessa categoria, o retorno deve ser:
  Status 200
  JSON { "id": ..., "nome": ..., ...}

  Caso não hajam produtos na categoria, deve-se assumir que a categoria não existe e retornar:
  Status 400
  JSON { "message": "Categoria não existe" }
*/
