import express from "express";

/* O export deve ser mantido como está para que os testes sejam executados corretamente */
export const app = express();

/*
  Detalhes do Produto:
  
  Implemente um serviço que, dado o ID de um produto, retorne os detalhes desse produto.
  O serviço deve obedecer o seguinte formato:

  GET /produtos/:id

  Caso o produto seja encontrado, o retorno deve ser:
  Status 200
  JSON { "id": ..., "nome": ..., ...}

  Caso o produto não seja encontrado, o retorno deve ser:
  Status 404
  JSON { "message": "Produto não encontrado" }
*/
